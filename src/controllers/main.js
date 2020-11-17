const service = require('../services');

module.exports = {
	hello: async (req, res) => {
		const result = await service.main.hello();

		res.json(result);
	},

	meta: (req, res) => {
		res.json(req.userdata);
	}
}