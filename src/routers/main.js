const { Router } = require('express');
const controller = require('../controllers');

const route = Router();

route.get('/', (req, res) => {
	controller.main.hello(req, res);
});

module.exports = route;