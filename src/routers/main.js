const { Router } = require('express');
const { main } = require('../controllers');

const route = Router();

route.get('/', (req, res) => {
	main.hello(req, res);
});

module.exports = route;