const service = require('../services');

module.exports = {
	hello: async (req, res) => {
		const result = await service.main.hello();

		res.json(result);
	}
}