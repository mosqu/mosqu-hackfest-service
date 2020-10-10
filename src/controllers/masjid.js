const service = require('../services');

module.exports = {
	new: async (req, res) => {
		const result = await service.masjid.new({
			...req.body,
			username: req.userdata.username
		});

		res.json(result);
	},
	getAll: async (req, res) => {
		const result = await service.masjid.getAll({
			...req.body
		});

		res.json(result);
	},
	getDetail: async (req, res) => {
		const result = await service.masjid.getDetail({
			...req.body,
			...req.params
		});

		res.json(result);
	},
	update: async (req, res) => {
		const result = await service.masjid.update({
			...req.body,
			username: req.userdata.username
		});

		res.json(result);
	},
	remove: async (req, res) => {
		const result = await service.masjid.remove({
			...req.body
		});

		res.json(result);
	},
}