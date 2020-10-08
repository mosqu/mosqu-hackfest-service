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
				req.userdata = encoded;
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
	}
}