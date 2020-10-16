const { Router } = require('express');
const controller = require('../controllers');
const { auth } = require('../middlewares');

const route = Router();

route.post('/', [ auth.checkHeader ], (req, res) => {
	controller.masjid.new(req, res);
});

route.get('/list', [], (req, res) => {
	controller.masjid.getAll(req, res);
});

route.get('/detail/:masjid_uid', [], (req, res) => {
	controller.masjid.getDetail(req, res);
});

route.post('/update/:masjid_uid', [ auth.checkHeader ], (req, res) => {
	controller.masjid.update(req, res);
});

route.post('/remove/:masjid_uid', [ auth.checkHeader ], (req, res) => {
	controller.masjid.remove(req, res);
});

module.exports = route;