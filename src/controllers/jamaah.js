const service 	= require('../services');

module.exports = {

	new: async (req, res) => {
		const result = await service.jamaah.new({
			...req.body,
			...req.userdata
		});

		res.json(result);
	},

	getAll: async (req, res) => {
		const result = await service.jamaah.getAll({
			...req.body,
			...req.query
		});

		res.json(result);
	},

	getDetail: async (req, res) => {
		const result = await service.jamaah.getDetail({
			...req.body,
			...req.params
		});

		res.json(result);
	},

	getChart: async (req, res) => {
		const result = await service.jamaah.getChart({
			...req.params
		});

		res.json(result);
	},

	update: async (req, res) => {
		const result = await service.jamaah.update({
			...req.body,
			...req.params,
			...req.userdata
		});

		res.json(result);
	},

	updateMember: async (req, res) => {
		const result = await service.jamaah.updateMember({
			...req.body,
			...req.params,
			...req.userdata
		});

		res.json(result);
	},

	remove: async (req, res) => {
		const result = await service.jamaah.remove({
			...req.body,
			...req.params,
			...req.query,
			...req.userdata
		});

		res.json(result);
	},

	removeMember: async (req, res) => {
		const result = await service.jamaah.removeMember({
			...req.body,
			...req.params,
			...req.query,
			...req.userdata
		});

		res.json(result);
	},
}