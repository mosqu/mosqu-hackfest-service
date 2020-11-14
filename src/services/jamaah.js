const model     = require('../models');
const Op        = require('sequelize').Op;

module.exports = {

    new: (data) => {
        return new Promise( async (resolve) => {
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.jamaah_kk.create({
                    ...data,
                    createby: data.username
                }).then(async (result) => {
                    const member = await Promise.all(data.members.map(async (val) => {
                        const addMember = await module.exports.addMember({
                            ...val,
                            kk_uid: result.get('kk_uid'),
                            createby: data.username
                        });
                        return addMember;
                    }));

                    resolve({
                        status: true,
                        data: {
                            kk: result,
                            kk_member: member
                        }
                    });
                }).catch((error) => {
                    console.log(error);
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

    addMember: (data) => {
        return new Promise( async (resolve) => {
            db.jamaah_kk_member.create({
                ...data
            }).then((result) => {
                resolve({
                    status: true,
                    data: result
                });
            }).catch((error) => {
                resolve({
                    status : false,
                    msg : error
                });
            });
        });
    },

    getAll: (data) => {
        return new Promise(resolve => {
            db.jamaah_kk.findAll({
                attributes: [
                    'kk_uid', 'masjid_uid', 'name', 'age', 
                    'birthdate', 'occupation', 'salary', 'address',
                    'latitude', 'longitude', 'additional_info'
                ],
                where : {
                    statusid: 1
                },
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
            db.jamaah_kk.findOne({
                attributes: [
                    'kk_uid', 'masjid_uid', 'name', 'age', 
                    'birthdate', 'occupation', 'salary', 'address',
                    'latitude', 'longitude', 'additional_info'
                ],
                include: [
                    {
                        model: db.jamaah_kk_member,
                        required: false,
                        where: {
                            statusid: 1
                        }
                    }
                ],
                where : {
                    statusid: 1,
                    kk_uid: data.kk_uid
                }
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

    update: (data) => {
        return new Promise( async (resolve) => {
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.jamaah_kk.update({
                    ...data,
                    updateby: data.username
                }, {
                    where : {
                        kk_uid: data.kk_uid,
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

    updateMember: (data) => {
        return new Promise( async (resolve) => {
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.jamaah_kk_member.update({
                    ...data,
                    updateby: data.username
                }, {
                    where : {
                        member_uid: data.member_uid,
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
                db.jamaah_kk.update({
                    statusid: 0,
                    updateby: data.username
                }, {
                    where : {
                        kk_uid: data.kk_uid,
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

    removeMember: (data) => {
        return new Promise( async (resolve) => {
            const isOwner = await module.exports.checkOwner(data);
            if (isOwner) {
                db.jamaah_kk_member.update({
                    statusid: 0,
                    updateby: data.username
                }, {
                    where : {
                        member_uid: data.member_uid,
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

}