const model     = require('../models');
const Op        = require('sequelize').Op;
const xlsx      = require('xlsx');

module.exports = {
    new: (data) => {
        return new Promise( async (resolve) => {
            console.log(data);
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.masjid_program.create({
                    ...data,
                    createby: data.username
                }).then((result) => {
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
    getAll: (data) => {
        let where = {
            statusid : 1
        };

        if (data.name) {
            where.name = {
                [Op.iLike] : `%${data.name}%`
            }
        }

        if (data.location) {
            where.location = {
                [Op.iLike] : `%${data.location}%`
            }
        }

        return new Promise(resolve => {
            db.masjid_program.findAll({
                attributes: ['masjid_program_uid', 'name', 
                            'description', 'link', 'location'],
                where : where,
                include: [
                    {
                        model       : db.masjid_image,
                        as          : 'images',
                        attributes  : ['url'],
                        required    : false
                    },
                    {
                        model       : db.masjid,
                        attributes  : ['masjid_uid', 'name', 'address', 
                                        'city', 'province'],
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
    getProgramJamaahListTotal: (data) => {
        return new Promise((resolve) => {
            db.program_jamaah.count().then((result) => {
                resolve(result);
            });
        });
    },
    getProgramJamaahList: (data) => {
        return new Promise(async (resolve) => {
            const count = await module.exports.getProgramJamaahListTotal();
            db.program_jamaah.findAll({
                where: {
                    masjid_program_uid: data.masjid_program_uid
                },
                offset: (data.page-1)*data.itemsPerPage,
                limit: data.itemsPerPage
            }).then(result => {
                resolve({
                    status: true,
                    data: result,
                    total: count
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
            db.masjid_program.findOne({
                where : {
                    statusid: 1,
                    masjid_program_uid: data.masjid_program_uid
                },
                include: [
                    {
                        model       : db.masjid_image,
                        as          : 'images',
                        attributes  : ['url'],
                        required    : false
                    },
                    {
                        model       : db.masjid,
                        attributes  : ['masjid_uid', 'name', 'address', 
                                        'city', 'province'],
                        required    : false
                    }
                ]
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
    addProgramJamaah: (data) => {
        return new Promise( async (resolve) => {
            console.log(data);
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.program_jamaah.create({
                    ...data,
                    createby: data.username
                }).then((result) => {
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
    uploadProgramJamaah: (data) => {
        return new Promise( async (resolve) => {
            const   workbook        = xlsx.read(data.file.data),
                    sheet_name_list = workbook.SheetNames;

            const content = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

            content.map(async (item) => {
                const isExist = await db.program_jamaah.findAll({
                    where: {
                        statusid: 1,
                        masjid_uid: data.masjid_uid,
                        masjid_program_uid: data.masjid_program_uid,
                        name: item['NAMA  ANGGOTA']
                    },
                    raw: true
                });

                if (isExist.length) {
                    console.log(true);
                } else {
                    const result = await db.program_jamaah.create({
                        masjid_uid: data.masjid_uid,
                        masjid_program_uid: data.masjid_program_uid,
                        name: item['NAMA  ANGGOTA'],
                        address: item['A L A M A T'],
                        birthdate: item['TANGGAL LAHIR'],
                        additional_info: {
                            INDUK: item['INDUK'],
                            STATUS: item['STATUS'],
                            JML: item['JML'],
                            TEMPATLAHIR: item['TEMPAT LAHIR']
                        }
                    });
                    console.log(result);
                }
            });


            resolve(data);
        });
    },
    update: (data) => {
        return new Promise( async (resolve) => {
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.masjid_program.update({
                    ...data,
                    updateby: data.username
                }, {
                    where : {
                        masjid_program_uid: data.masjid_program_uid,
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
                db.masjid_program.update({
                    statusid: 0,
                    updateby: data.username
                }, {
                    where : {
                        masjid_program_uid: data.masjid_program_uid,
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
                        url : url
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