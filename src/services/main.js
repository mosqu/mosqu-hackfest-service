const model = require('../models');

module.exports = {
	hello: (data) => {
		return new Promise( resolve => {
			db.user.findAll({
				raw: true
			}).then((result) => {
				console.log(result);
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