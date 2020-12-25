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
                    'latitude', 'longitude', 'additional_info', 'phone_number'
                ],
                where : {
                    statusid: 1,
                    masjid_uid: data.masjid.masjid_uid
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

    getAllPhone: (data) => {
        return new Promise(resolve => {
            db.jamaah_kk.findAll({
                attributes: [
                    'kk_uid', 'masjid_uid', 'name', 'phone_number'
                ],
                where : {
                    statusid: 1,
                    masjid_uid: data.masjid.masjid_uid,
                    phone_number: {
                        [Op.ne] : null
                    }
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

    getStatus: (data) => {
        return new Promise(resolve => {
            db.status.findAll({
                attributes: [
                    'status_uid', 'description', 'group'
                ],
                where : {
                    statusid: 1
                },
                raw: true
            }).then(result => {
                const status = result.reduce((acc, val ) => {
                    if (acc[val.group]) {
                        acc[val.group].push({
                            status_uid : val.status_uid,
                            description: val.description
                        });
                    } else {
                        acc[val.group] = [
                            {
                                status_uid : val.status_uid,
                                description: val.description
                            }
                        ]
                    }

                    return acc;
                }, {});
                resolve({
                    status: true,
                    data: status
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

    getChart: (data) => {
        return new Promise( async (resolve) => {
            const result = await db.jamaah_kk.findAll({
                where: {
                    statusid: 1,
                    masjid_uid: data.masjid.masjid_uid
                },
                include: [
                    {
                        model: db.jamaah_kk_member,
                        required: false,
                        where: {
                            statusid: 1
                        }
                    }
                ]
            });
            const sum_kk        = await module.exports.dataSumKK(result);
            const total_jamaah  = await module.exports.dataTotalJamaah(result);
            const mean_kk       = Math.round(total_jamaah*10/sum_kk)/10;
            const dist_age      = await module.exports.dataDistAge(result);
            const dist_salary   = await module.exports.dataDistSalary(result);

            resolve({
                result,
                sum_kk,
                total_jamaah,
                mean_kk,
                dist_age,
                dist_salary
            })
        });
    },

    dataSumKK: (data) => {
        return new Promise( async (resolve) => {
            resolve(data.length);
        });
    },

    dataTotalJamaah: (data) => {
        return new Promise( async (resolve) => {
            const sum =  data.reduce((acc, val) => {
                acc = acc + val.jamaah_kk_members.length + 1;
                return acc;
            }, 0);
            resolve(sum);
        });
    },

    dataDistAge: (data) => {
        return new Promise( async (resolve) => {
            const array =  data.reduce((acc, val) => {
                if (val.age) {
                    acc.push(val.age);
                }

                if (val.jamaah_kk_members.length) {
                    val.jamaah_kk_members.map((member) => {
                        if (member.age) {
                            acc.push(member.age);
                        }
                    });
                }
                
                return acc;
            }, []);

            const grouped = array.sort().reduce((acc, val) => {
                const index = acc.labels.indexOf(val);
                if( index != -1) {
                    acc.data[index] = acc.data[index] + 1;
                } else {
                    acc.data.push(1);
                    acc.labels.push(val);
                }

                return acc;
            }, {
                data: [],
                labels: []
            });
            resolve(grouped);
        });
    },

    dataDistSalary: (data) => {
        return new Promise( async (resolve) => {
            const array =  data.reduce((acc, val) => {
                if (val.salary) {
                    acc.push(val.salary);
                }

                if (val.jamaah_kk_members.length) {
                    val.jamaah_kk_members.map((member) => {
                        if (member.salary) {
                            acc.push(member.salary);
                        }
                    });
                }
                
                return acc;
            }, []);

            const grouped = array.sort().reduce((acc, val) => {
                const index = acc.labels.indexOf(val);
                if( index != -1) {
                    acc.data[index] = acc.data[index] + 1;
                } else {
                    acc.data.push(1);
                    acc.labels.push(val);
                }

                return acc;
            }, {
                data: [],
                labels: []
            });
            resolve(grouped);
        });
    },

}