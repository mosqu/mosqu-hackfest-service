const service = require('../services');

module.exports = {
	new: async (req, res) => {
		const result = await service.masjid_program.new({
			...req.body,
			...req.userdata
		});

		res.json(result);
	},
	getAll: async (req, res) => {
		const result = await service.masjid_program.getAll({
			...req.body,
			...req.query
		});

		res.json(result);
	},
	getDetail: async (req, res) => {
		const result = await service.masjid_program.getDetail({
			...req.body,
			...req.params
		});

		res.json(result);
	},
	update: async (req, res) => {
		const result = await service.masjid_program.update({
			...req.body,
			...req.params,
			...req.userdata
		});

		res.json(result);
	},
	remove: async (req, res) => {
		const result = await service.masjid_program.remove({
			...req.body,
			...req.params,
			...req.userdata
		});

		res.json(result);
	},
}