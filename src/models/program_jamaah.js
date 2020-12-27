const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`program_jamaah`, {
        program_jamaah_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        masjid_program_uid : {
            type      : Sequelize.UUID,
            allowNull : true
        },
        masjid_uid : {
            type      : Sequelize.UUID,
            allowNull : true
        },
        name         : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        address : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        birthdate         : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        phone_number         : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        additional_info : {
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
        }
    }, {
        freezeTableName : true,
        createdAt       : false,
        updatedAt       : false,
    });

};