const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`masjid`, {
        masjid_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        name : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        address         : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        city : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        province         : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        latitude : {
            type      : Sequelize.FLOAT,
            allowNull : true
        },
        longitude         : {
            type      : Sequelize.FLOAT,
            allowNull : true
        },
        year_built : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        additional_info         : {
            type      : Sequelize.JSONB,
            allowNull : true
        },
        statusid  : {
            type      : Sequelize.INTEGER,
            allowNull : true
        },
        createdate    : {
            type      : Sequelize.DATE,
            allowNull : true
        },
        createby      : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        updateby      : {
            type      : Sequelize.STRING,
            allowNull : true
        }
    }, {
        freezeTableName : true,
        createdAt       : false,
        updatedAt       : false,
    });

};