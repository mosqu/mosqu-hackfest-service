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
		const masjid 			= model.masjid(db);
		const masjid_image 		= model.masjid_image(db);
		const masjid_map 		= model.masjid_map(db);
		const masjid_program	= model.masjid_program(db);
		const role 				= model.role(db);
		const role_map 			= model.role_map(db);
		const user 				= model.user(db);

		masjid.belongsTo(masjid_image, {
			targetKey 	: 'masjid_uid',
			foreignKey 	: 'masjid_uid'
		});

		db.authenticate()
			.then(() => {
				console.log('Database connection has been established successfully.');
				resolve({
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