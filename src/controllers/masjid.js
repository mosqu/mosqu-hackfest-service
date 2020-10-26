const service = require('../services');

module.exports = {
	new: async (req, res) => {
		const result = await service.masjid.new({
			...req.body,
			...req.userdata
		});

		res.json(result);
	},
	getAll: async (req, res) => {
		const result = await service.masjid.getAll({
			...req.body,
			...req.query
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
			...req.params,
			...req.userdata
		});

		res.json(result);
	},
	remove: async (req, res) => {
		const result = await service.masjid.remove({
			...req.body,
			...req.params,
			...req.userdata
		});

		res.json(result);
	},
	uploadImage: async (req, res) => {
		const result = await service.masjid.uploadImage({
			...req.body,
			...req.params,
			...req.userdata
		});

		res.json(result);
	}
}