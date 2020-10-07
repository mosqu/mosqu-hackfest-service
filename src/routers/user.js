const { Router } = require('express');
const controller = require('../controllers');
const { auth } = require('../middlewares');

const route = Router();

route.post('/register', (req, res) => {
	controller.user.register(req, res);
});

route.post('/login', (req, res) => {
	controller.user.login(req, res);
});

route.get('/', [ auth.checkHeader ], (req, res) => {
	controller.user.allUser(req, res);
});

module.exports = route;