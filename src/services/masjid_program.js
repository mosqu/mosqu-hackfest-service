const model = require('../models');
const Op = require('sequelize').Op;

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
				attributes: ['masjid_program_uid', 'name', 'description', 
							'link', 'location'],
				where : where,
				limit : 20
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
	getDetail: (data) => {
		return new Promise(resolve => {
			db.masjid_program.findOne({
				where : {
					statusid: 1,
					masjid_program_uid: data.masjid_program_uid
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