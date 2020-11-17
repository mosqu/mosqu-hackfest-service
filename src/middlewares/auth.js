const jwt = require('jsonwebtoken');

module.exports = {
	checkHeader: async (req, res, next) => {
		if (!req.headers.authorization) {
			res.status(401).send({
				status 	: false,
				msg 	: 'unauthorized'
			});
			return;
		} else {
			const encoded = await module.exports.verifyToken(req.headers.authorization);
			if (encoded) {
				const userdata 	= await module.exports.getUserdata(encoded);
				req.userdata 	= userdata;
				next();
			} else {
				res.status(401).send({
					status 	: false,
					msg 	: 'unauthorized'
				});
				return;
			}
		}
	},
	signToken: (data) => {
		return new Promise(( resolve, reject) => {
			jwt.sign(data, process.env.JWT_KEY, { 
				expiresIn: '24h'
			}, (err, token) => {
				if (err) {
					reject(err);
				}
				resolve(token);
			});
		});
	},
	verifyToken: (token) => {
		return new Promise(( resolve) => {
			jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
				if (err) {
					console.log(err);
					resolve(false);
				}
				resolve(decoded);
			})
		});
	},
	getUserdata: (data) => {
		return new Promise((resolve) => {
			db.user.findOne({
				attributes: [
					'user_uid', 'username', 'email', 'full_name'
				],
				where: {
					user_uid: data.user_uid,
					statusid: 1
				},
				include: [
                    {
                        model: db.role_map,
                        as: 'role',
                        required: false,
                        attributes: ['role_uid'],
                        where: {
                            statusid: 1
                        }
                    },
                    {
                        model: db.masjid_map,
                        as: 'masjid',
                        attributes: ['masjid_uid'],
                        required: false,
                        where: {
                            statusid: 1
                        }
                    }
                ],
			}).then(result => {
				if (result) {
					resolve(result);
				}
				resolve({});
			}).catch((error) => {
				console.log(error);
				resolve({});
			});
		});
	}
}