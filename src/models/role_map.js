const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`role_map`, {
        role_map_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        user_uid        : {
            type      : Sequelize.UUID,
            allowNull : false,
        },
        role_uid        : {
            type      : Sequelize.UUID,
            allowNull : false,
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