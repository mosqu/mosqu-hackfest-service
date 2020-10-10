const bcrypt = require('bcrypt');
const model = require('../models');
const { auth } = require('../middlewares');

module.exports = {
	register: async (data) => {
		const hashedPassword = await bcrypt.hashSync(data.password, 5); 
		const isExist = await module.exports.iskUsernameExist(data.username);

		return new Promise( resolve => {
			if (isExist) {
				resolve({
					status : false,
					msg : 'username was occupied'
				});
			} else {
				db.user.create({
					...data,
					password: hashedPassword,
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
			}
		});
	},
	login: (data) => {
		return new Promise( async resolve => {
			const user = await db.user.findOne({
				attributes: ['user_uid', 'username', 'password'],
				where : {
					username: data.username
				},
				raw: true
			}).catch((error) => {
				resolve({
					status : false,
					msg : error
				});
			});
			if (user) {
				const checkPassword = await bcrypt.compareSync(data.password, user.password);
				if (checkPassword) {
					const token = await auth.signToken({
						username: user.username,
						user_uid: user.user_uid
					}).catch(error => {
						resolve({
							status : false,
							msg : error
						});
					});
					resolve({
						status: true,
						data: {
							token
						}
					});
				} else {
					resolve({
						status : false,
						msg : 'password is not match'
					});
				}
			} else {
				resolve({
					status : false,
					msg : 'username is not exist'
				});
			}
		});
	},
	iskUsernameExist: (username) => {
		return new Promise(resolve => {
			db.user.findOne({
				where: {
					username: username
				}
			}).then(result => {
				if (result) {
					resolve(true);
				}
				resolve(false);
			});
		});
	},
	allUser: (data) => {
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
	}
}