const model = require('../models');

module.exports = {
	hello: () => {
		return 'Mosqu service';
	},

	meta: (data) => {
		return new Promise(async (resolve) => {
			if (data.role.role_uid) {
				const roles = await module.exports.getRole(data.role.role_uid);
				resolve({
					menus : await module.exports.menu(roles),
					... data
				})
			} else {
				resolve({
					menus: [],
					... data
				});
			}
		});
	},

	getRole: (role_uid) => {
        return new Promise(async (resolve) => {
            const menu = await db.menu_map.findAll({
                where: {
                    role_uid: role_uid,
                    statusid: 1
                },
                include: [
                    {
                        model: db.menu_group,
                        required: true
                    }
                ]
            });
            const result = menu.map((value) => {
                return {
                    id 		: value.menu_group.menu_group_uid,
                    name 	: value.menu_group.name,
                    title 	: value.menu_group.description,
                    icon 	: value.menu_group.icon,
                    link 	: value.menu_group.url,
                    childs  : []
                }
            });
            resolve(result);
        });
    },

    menu: (roles) => {
        return new Promise((resolve, reject) => {
            const roleGroup = roles.map((value) => {
                return value.name;
            });

            db.menu.findAll({
                attributes : [
                    `menu_uid`, `name`, `description`, `url`, `icon`, `sequence`,
                    [ sequelize.col(`menu_group.menu_group_uid`),          `menu_group_uid`   ],
                    [ sequelize.col(`menu_group.name`),        `menu_group_name` ],
                    [ sequelize.col(`menu_group.description`), `menu_group_title` ],
                    [ sequelize.col(`menu_group.url`), `menu_group_link` ],
                    [ sequelize.col(`menu_group.icon`), `menu_group_icon` ],
                ],
                where : {
                    statusid : 1
                },
                include : [
                    {
                        model      : db.menu_group,
                        attributes : [],
                        required   : true,
                        where : {
                            name: roleGroup
                        }
                    }
                ],
                order   : [
                    [ `sequence`,      `ASC` ],
                    [ db.menu_group, `sequence`,      `ASC` ]
                ],
                raw : true
            }).then((rows) => {
                const menu = rows.reduce((acc, val) => {
                    const index = acc.findIndex(value => value.name == val.menu_group_name);
                    if ( index != -1 ) {
                        acc[index].childs.push({
                            title	: val.description,
                            link 	: val.url
                        });
                    } 
                    return acc;
                }, roles);    
                resolve(menu);
            }).catch((error) => {
                reject(error);
            });
        });
    },
}