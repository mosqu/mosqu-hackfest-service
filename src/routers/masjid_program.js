const { Router } = require('express');
const controller = require('../controllers');
const { auth } = require('../middlewares');

const route = Router();

route.post('/', [ auth.checkHeader ], (req, res) => {
	controller.masjid_program.new(req, res);
});

route.get('/list', [], (req, res) => {
	controller.masjid_program.getAll(req, res);
});

route.get('/detail/:masjid_program_uid', [], (req, res) => {
	controller.masjid_program.getDetail(req, res);
});

route.post('/update/:masjid_program_uid', [ auth.checkHeader ], (req, res) => {
	controller.masjid_program.update(req, res);
});

route.post('/remove/:masjid_program_uid', [ auth.checkHeader ], (req, res) => {
	controller.masjid_program.remove(req, res);
});

module.exports = route;