const { Router } = require('express');
const controller = require('../controllers');
const { auth } = require('../middlewares');

const route = Router();

route.post('/', [ auth.checkHeader ], (req, res) => {
	controller.jamaah.new(req, res);
});

route.get('/list', [], (req, res) => {
	controller.jamaah.getAll(req, res);
});

route.get('/detail/:kk_uid', [], (req, res) => {
	controller.jamaah.getDetail(req, res);
});

route.get('/chart', [], (req, res) => {
	controller.jamaah.getChart(req, res);
});

route.get('/status', [ auth.checkHeader ], (req, res) => {
	controller.jamaah.getStatus(req, res);
});

route.post('/update/:kk_uid', [ auth.checkHeader ], (req, res) => {
	controller.jamaah.update(req, res);
});

route.post('/update/:kk_uid/:member_uid', [ auth.checkHeader ], (req, res) => {
	controller.jamaah.updateMember(req, res);
});

route.post('/remove/:kk_uid', [ auth.checkHeader ], (req, res) => {
	controller.jamaah.remove(req, res);
});

route.post('/remove/:kk_uid/:member_uid', [ auth.checkHeader ], (req, res) => {
	controller.jamaah.removeMember(req, res);
});

module.exports = route;