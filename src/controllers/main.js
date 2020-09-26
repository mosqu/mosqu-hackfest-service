const { main } = require('../services');

module.exports = {
	hello: (req, res) => {
		res.send(main.hello());
	}
}