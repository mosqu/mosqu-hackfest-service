const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`role`, {
        role_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        description        : {
            type      : Sequelize.STRING,
            allowNull : false,
        },
        name : {
            type      : Sequelize.STRING,
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
        }
    }, {
        freezeTableName : true,
        createdAt       : false,
        updatedAt       : false,
    });

};