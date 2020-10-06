const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`masjid_image`, {
        image_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        masjid_uid  : {
            type      : Sequelize.UUID,
            allowNull : true
        },
        masjid_program_uid  : {
            type      : Sequelize.UUID,
            allowNull : true
        },
        url         : {
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