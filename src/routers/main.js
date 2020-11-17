const { Router } = require('express');
const controller = require('../controllers');
const { auth } = require('../middlewares');

const route = Router();

route.get('/', (req, res) => {
	controller.main.hello(req, res);
});

route.get('/meta_', [ auth.checkHeader ], (req, res) => {
	controller.main.meta(req, res);
});

module.exports = route;