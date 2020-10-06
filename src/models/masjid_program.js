const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`masjid_program`, {
        masjid_program_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        masjid_uid : {
            type      : Sequelize.UUID,
            allowNull : true
        },
        name         : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        description : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        link         : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        location         : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        start_date : {
            type      : Sequelize.DATE,
            allowNull : true
        },
        end_date : {
            type      : Sequelize.DATE,
            allowNull : true
        },
        start_time : {
            type      : Sequelize.TIME,
            allowNull : true
        },
        end_time : {
            type      : Sequelize.TIME,
            allowNull : true
        },
        day : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        additional_info : {
            type      : Sequelize.TEXT,
            allowNull : true
        },
        type : {
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