function applyForeignKeySetup(sequelize) {
	const { AgentPermission, Roles } = sequelize.models;

	Roles.hasMany(AgentPermission);
	AgentPermission.belongsTo(Roles, { constraints: false, allowNull: false, at: 'ROLE_ID' , foreignKey: { name: 'ROLE_ID', fieldName: 'ROLE_ID'} });
    
}

module.exports = { applyForeignKeySetup };



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