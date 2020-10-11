const model = require('../models');

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
		return new Promise(resolve => {
			db.masjid.findAll({
				attributes: ['masjid_uid', 'name', 'address', 
							'city', 'province'],
				where : {
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
	}
}