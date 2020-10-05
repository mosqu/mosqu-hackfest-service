const model = require('../models');

module.exports = {
	register: (data) => {
		return new Promise( resolve => {
			db.user.create({
				...data,
				createby: data.username
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
	login: (data) => {
		return new Promise( resolve => {
			db.user.findAll({
				raw: true
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
}