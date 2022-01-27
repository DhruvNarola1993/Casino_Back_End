function applyForeignKeySetup(sequelize) {
	const { AgentPermission, Roles, Game, GameGroup, MenuPermission, Menu, Agent } = sequelize.models;

	Roles.hasMany(AgentPermission, { constraints: true, allowNull: false, foreignKey: 'ROLE_ID' });
	AgentPermission.belongsTo(Roles, { constraints: true, allowNull: false, foreignKey: 'ROLE_ID' });

	GameGroup.hasMany(Game, { constraints: true, allowNull: false, foreignKey: 'GAMEGROUP_ID' });
	Game.belongsTo(GameGroup, { constraints: true, allowNull: false, foreignKey: 'GAMEGROUP_ID' });

	Roles.hasMany(MenuPermission, { constraints: true, allowNull: false, foreignKey: 'ROLE_ID' });
	MenuPermission.belongsTo(Roles, { constraints: true, allowNull: false, foreignKey: 'ROLE_ID' });

	Menu.hasMany(MenuPermission, { constraints: true, allowNull: false, foreignKey: 'MENU_ID' });
	MenuPermission.belongsTo(Menu, { constraints: true, allowNull: false, foreignKey: 'MENU_ID' });

	
	Roles.hasMany(Agent, { constraints: true, allowNull: false, foreignKey: 'ROLE_ID' });
	Agent.belongsTo(Roles, { constraints: true, allowNull: false, foreignKey: 'ROLE_ID' });

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