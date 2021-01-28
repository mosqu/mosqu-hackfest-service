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

route.post('/image/:masjid_uid', [ auth.checkHeader ], (req, res) => {
	controller.masjid.uploadImage(req, res);
});

route.get('/bot/trigger/list', [ auth.checkHeader ], (req, res) => {
	controller.masjid.getAllBotTrigger(req, res);
});

route.post('/bot/trigger', [ auth.checkHeader ], (req, res) => {
	controller.masjid.newBotTrigger(req, res);
});

module.exports = route;