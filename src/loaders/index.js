const expressModule = require('./express');
const configModule = require('./config');
const sequelizeModule = require('./sequelize');

module.exports = async (app) => {
    await configModule();
    await sequelizeModule();
    await expressModule(app);
};