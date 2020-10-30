const model     = require('../models');
const Op        = require('sequelize').Op;

module.exports = {
    new: (data) => {
        return new Promise(resolve => {
            db.masjid.create({
                ...data,
                createby: data.username
            }).then(async (result) => {
                const map_masjid = await module.exports.mapMasjid({
                    masjid_uid: result.get('masjid_uid'),
                    ...data
                });
                resolve({
                    status: true,
                    data: {
                        new: result,
                        map: map_masjid
                    }
                });
            }).catch(error => {
                resolve({
                    status : false,
                    msg : error
                });
            });
        });
    },
    getAll: (data) => {
        let where = {
            statusid : 1
        };

        if (data.name) {
            where.name = {
                [Op.iLike] : `%${data.name}%`
            }
        }

        if (data.city) {
            where.city = {
                [Op.iLike] : `%${data.city}%`
            }
        }

        if (data.province) {
            where.province = {
                [Op.iLike] : `%${data.province}%`
            }
        }

        return new Promise(resolve => {
            db.masjid.findAll({
                attributes: ['masjid_uid', 'name', 'address', 
                            'city', 'province'],
                where : where,
                include: [
                    {
                        model       : db.masjid_image,
                        required    : false
                    }
                ],
                limit : 20
            }).then(result => {
                resolve({
                    status: true,
                    data: result
                });
            }).catch(error => {
                console.log(error);
                resolve({
                    status : false,
                    msg : error
                });
            });
        });
    },
    getDetail: (data) => {
        return new Promise(resolve => {
            db.masjid.findOne({
                where : {
                    statusid: 1,
                    masjid_uid: data.masjid_uid
                }
            }).then(result => {
                resolve({
                    status: true,
                    data: result
                });
            }).catch(error => {
                resolve({
                    status : false,
                    msg : error
                });
            });
        });
    },
    update: (data) => {
        return new Promise( async (resolve) => {
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.masjid.update({
                    ...data,
                    updateby: data.username
                }, {
                    where : {
                        masjid_uid: data.masjid_uid,
                        statusid: 1
                    }
                }).then(result => {
                    resolve({
                        status: true,
                        data: result
                    });
                }).catch(error => {
                    resolve({
                        status : false,
                        msg : error
                    });
                });
            } else {
                resolve({
                    status : false,
                    msg : 'Unauthorized user'
                });
            }
        });
    },
    remove: (data) => {
        return new Promise( async (resolve) => {
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.masjid.update({
                    statusid: 0,
                    updateby: data.username
                }, {
                    where : {
                        masjid_uid: data.masjid_uid,
                        statusid: 1
                    }
                }).then(result => {
                    resolve({
                        status: true,
                        data: result
                    });
                }).catch(error => {
                    resolve({
                        status : false,
                        msg : error
                    });
                });
            } else {
                resolve({
                    status : false,
                    msg : 'Unauthorized user'
                });
            }
        });
    },
    checkOwner: (data) => {
        return new Promise(resolve => {
            db.masjid_map.findAll({
                where: {
                    statusid: 1,
                    masjid_uid: data.masjid_uid,
                    user_uid: data.user_uid
                },
                raw: true
            }).then(result => {
                if (result.length) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch( error => {
                console.log(error);
                resolve(false);
            })
        });
    },
    mapMasjid: (data) => {
        return new Promise(resolve => {
            db.masjid_map.create({
                masjid_uid: data.masjid_uid,
                user_uid: data.user_uid,
                createby: data.username
            }).then(() => {
                resolve(true);
            }).catch((error) => {
                console.log(error);
                resolve(false);
            });
        });
    },
    uploadImage: async (data) => {
        return new Promise(async (resolve) => {
            const isOwner = await module.exports.checkOwner(data);
            
            if (isOwner) {
                const res = await bucket.upload((data.file.directory), {
                    gzip: true,
                    metadata: {
                        cacheControl: 'public, max-age=31536000',
                    }
                });
                
                const meta = res[0] ? res[0].metadata : null;

                if (meta) {
                    await bucket.file(meta.name).makePublic();
                    const url           = meta.mediaLink.split('download')[0]+meta.bucket+'/'+meta.name;
                    const insertImage   = await module.exports.insertMasjidImage({
                        ...data,
                        url : url,
                        masjid_program_uid: null
                    });
                    if (insertImage) {
                        resolve({
                            status: true,
                            data: {
                                url : url
                            }
                        });
                    } else {
                        resolve({
                            status: false,
                            data: 'Failed to insert in database'
                        });
                    }
                } else {
                    resolve({
                        status : false,
                        msg : 'Failed to upload'
                    });
                }
                
            } else {
                resolve({
                    status : false,
                    msg : 'Unauthorized user'
                });
            }
        });
        
    },
    insertMasjidImage: (data) => {
        return new Promise(resolve => {
            db.masjid_image.create({
                ...data,
                createby: data.username
            }).then(() => {
                resolve(true);
            }).catch((error) => {
                console.log(error);
                resolve(false);
            });
        });
    }
}