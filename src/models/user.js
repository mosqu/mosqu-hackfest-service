const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`user`, {
        user_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        username        : {
            type      : Sequelize.STRING,
            allowNull : false,
        },
        password : {
            type      : Sequelize.STRING,
            allowNull : false
        },
        email         : {
            type      : Sequelize.STRING,
            allowNull : false
        },
        full_name     : {
            type        : Sequelize.INTEGER,
            allowNull   : false,
        },
        statusid  : {
            type      : Sequelize.INTEGER,
            allowNull : false
        },
        createdate    : {
            type      : Sequelize.DATE,
            allowNull : false
        },
        createby      : {
            type      : Sequelize.STRING,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        createdAt       : false,
        updatedAt       : false,
    });

};