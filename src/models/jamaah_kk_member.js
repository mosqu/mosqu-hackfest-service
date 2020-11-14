const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`jamaah_kk_member`, {
        member_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        kk_uid : {
            type      : Sequelize.UUID,
            allowNull : true
        },
        name : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        age : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        birthdate : {
            type      : Sequelize.DATEONLY,
            allowNull : true
        },
        occupation : {
            type      : Sequelize.STRING,
            allowNull : true
        },
        salary : {
            type      : Sequelize.INTEGER,
            allowNull : true
        },
        family_status : {
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
        }
    }, {
        freezeTableName : true,
        createdAt       : false,
        updatedAt       : false,
    });

};