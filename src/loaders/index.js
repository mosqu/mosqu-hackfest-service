const expressModule 	= require('./express');
const configModule 		= require('./config');
const sequelizeModule 	= require('./sequelize');
const storageModule 	= require('./storage');

module.exports = async (app) => {
    await configModule();
    global.db = await sequelizeModule();
    global.bucket = await storageModule();
    await expressModule(app);
};