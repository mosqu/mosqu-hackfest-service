const { Sequelize } = require('sequelize');
const model 		= require('../models');

module.exports = () => {
	return new Promise(async (resolve) => {
		const db = new Sequelize(
			process.env.DB_NAME, 
			process.env.DB_USERNAME, 
			process.env.DB_PASSWORD, 
			{
				host: process.env.DB_HOST,
				dialect: 'postgres',
				port: parseInt(process.env["DB_PORT"], 10) || 5432,
				native: true, 
				ssl: true
			}
		);
		const jamaah_kk 		= model.jamaah_kk(db);
		const jamaah_kk_member 	= model.jamaah_kk_member(db);
		const masjid 			= model.masjid(db);
		const masjid_image 		= model.masjid_image(db);
		const masjid_map 		= model.masjid_map(db);
		const masjid_program	= model.masjid_program(db);
		const role 				= model.role(db);
		const role_map 			= model.role_map(db);
		const user 				= model.user(db);

		masjid.hasMany(masjid_image, {
			as 			: 'images',
			targetKey 	: 'masjid_uid',
			foreignKey 	: 'masjid_uid'
		});

		masjid_program.hasMany(masjid_image, {
			as 			: 'images',
			targetKey 	: 'masjid_program_uid',
			foreignKey 	: 'masjid_program_uid'
		});

		masjid_program.belongsTo(masjid, {
			targetKey 	: 'masjid_uid',
			foreignKey 	: 'masjid_uid'
		});

		jamaah_kk.hasMany(jamaah_kk_member, {
			targetKey 	: 'kk_uid',
			foreignKey 	: 'kk_uid'
		});

		user.hasMany(role_map, {
			as 			: 'role',
			targetKey 	: 'user_uid',
			foreignKey 	: 'user_uid'
		});

		user.hasMany(masjid_map, {
			as 			: 'masjid',
			targetKey 	: 'user_uid',
			foreignKey 	: 'user_uid'
		});

		db.authenticate()
			.then(() => {
				console.log('Database connection has been established successfully.');
				resolve({
					jamaah_kk,
					jamaah_kk_member,
					masjid,
					masjid_image,
					masjid_map,
					masjid_program,
					role,
					role_map,
					user
				});
			}).catch((error) => {
				console.error('Unable to connect to the database:', error);
			});
	});
}