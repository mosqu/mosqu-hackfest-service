const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`masjid_map`, {
        masjid_map_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        user_uid : {
            type      : Sequelize.UUID,
            allowNull : true
        },
        masjid_uid : {
            type      : Sequelize.UUID,
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