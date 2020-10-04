const model = require('../models');
module.exports = {
	hello: (data) => {
		db.user.findAll({
			raw: true
		}).then((result) => {
			console.log(result);
			return JSON.stringify(result);
		});
	}
}