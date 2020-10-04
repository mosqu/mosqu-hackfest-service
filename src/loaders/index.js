const expressModule = require('./express');
const configModule = require('./config');
const sequelizeModule = require('./sequelize');

module.exports = async (app) => {
    await configModule();
    global.db = await sequelizeModule();
    await expressModule(app);

};