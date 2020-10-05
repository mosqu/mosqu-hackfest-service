const { Router } = require('express');
const controller = require('../controllers');

const route = Router();

route.post('/register', (req, res) => {
	controller.user.register(req, res);
});
route.post('/login', (req, res) => {
	controller.user.login(req, res);
});

module.exports = route;