const service 			= require('../services');
const path 	 			= require('path');
const { v4: uuidv4 }    = require('uuid');

module.exports = {
	new: async (req, res) => {
		const result = await service.masjid_program.new({
			...req.body,
			...req.userdata
		});

		res.json(result);
	},
	getAll: async (req, res) => {
		const result = await service.masjid_program.getAll({
			...req.body,
			...req.query
		});

		res.json(result);
	},
	getProgramJamaahList: async (req, res) => {
		const result = await service.masjid_program.getProgramJamaahList({
			...req.query
		});

		res.json(result);
	},
	getDetail: async (req, res) => {
		const result = await service.masjid_program.getDetail({
			...req.body,
			...req.params
		});

		res.json(result);
	},
	addProgramJamaah: async (req, res) => {
		const result = await service.masjid_program.addProgramJamaah({
			...req.body,
			...req.userdata
		});

		res.json(result);
	},
	uploadProgramJamaah: async (req, res) => {

		if (!req.files || Object.keys(req.files).length === 0) {
			res.send({
				status : false,
				msg : 'No files were uploaded.'
			});
		} else {
			const result = await service.masjid_program.uploadProgramJamaah({
				...req.files,
				...req.body
			});

			res.json(result);
		}
	},
	update: async (req, res) => {
		const result = await service.masjid_program.update({
			...req.body,
			...req.params,
			...req.userdata
		});

		res.json(result);
	},
	remove: async (req, res) => {
		const result = await service.masjid_program.remove({
			...req.body,
			...req.params,
			...req.userdata
		});

		res.json(result);
	},
	uploadImage: async (req, res) => {
		if (!req.files || Object.keys(req.files).length === 0) {
			res.send({
				status : false,
				msg : 'No files were uploaded.'
			});
		} else {
			const ext = req.files.file.name.split(".")[1];
			const dir = path.join(__dirname, `../../protected/${uuidv4()}.${ext}`);

			req.files.file.mv(dir);
			const result = await service.masjid_program.uploadImage({
				...req.body,
				...req.params,
				...req.userdata,
				file : {
					directory: dir
				}
			});

			res.json(result);
		}
	}
}