const service = require('../services');

module.exports = {
	register: async (req, res) => {
		const result = await service.user.register({
			...req.body
		});

		res.json(result);
	},
	login: async (req, res) => {
		const result = await service.user.login({
			...req.body
		});

		res.json(result);
	},
	allUser: async (req, res) => {
		const result = await service.user.allUser({
			...req.body
		});

		res.json(result);
	}
}