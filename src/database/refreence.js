function applyForeignKeySetup(sequelize) {
	const { AgentPermission, Roles, Game, GameGroup, MenuPermission, Menu, Agent } = sequelize.models;

	Roles.hasMany(AgentPermission, { constraints: true, foreignKey: { name: 'ROLE_ID', allowNull: false } });
	AgentPermission.belongsTo(Roles, { constraints: true, foreignKey: { name: 'ROLE_ID', allowNull: false } });

	GameGroup.hasMany(Game, { constraints: true, foreignKey: { name: 'GAMEGROUP_ID', allowNull: false } });
	Game.belongsTo(GameGroup, { constraints: true, foreignKey: { name: 'GAMEGROUP_ID', allowNull: false } });

	Roles.hasMany(MenuPermission, { constraints: true, foreignKey: { name: 'ROLE_ID', allowNull: false } });
	MenuPermission.belongsTo(Roles, { constraints: true, foreignKey: { name: 'ROLE_ID', allowNull: false } });

	Menu.hasMany(MenuPermission, { constraints: true, foreignKey: { name: 'MENU_ID', allowNull: false } });
	MenuPermission.belongsTo(Menu, { constraints: true, foreignKey: { name: 'MENU_ID', allowNull: false } });


	Roles.hasMany(Agent, { constraints: true, foreignKey: { name: 'ROLE_ID', allowNull: false } });
	Agent.belongsTo(Roles, { constraints: true, foreignKey: { name: 'ROLE_ID', allowNull: false } });



	Agent.hasOne(Agent, { constraints: true, foreignKey: { name: 'PARENT_AGENT_ID' } });

}

module.exports = { applyForeignKeySetup };


// MENU_PERMISSION_ID, ISVIEW, ISUPDATE, ISDELETE, ISNEW, CREATE_DATE, UPDATE_DATE, MASTER_MENU_ID, ROLE_ID
/**
 * 
 *  "CREATE_CASHIER" , "Can Create Cashiers"
 *  "REGISTER_PLAYER" , "Can Register Players"
 *  "BLOCK_PLAYER" , "Can Block Players"
 *  "UPDATE_PASSWORD_PLAYER",  "Can Change Player Passwords"
 *  "ISACTIVE_GAME" , "Can activate/deactivate games"
 *  "ISDEPOSIT_PLAYER" , "Can Deposit to Players"
 *  "ISWITHDRAW_PLAYER", "Can Withdraw from Players"
 * 
 */