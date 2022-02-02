
const { QueryTypes, Op } = require('sequelize');
const sequelize = require('../../database/index');
const { models } = require('../../database/index');

/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */

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
 * AGENT_PERMISSION_ID, AGENT_PERMISSION_KEY, AGENT_PERMISSION_VALUE, ISVIEW, CREATE_DATE, UPDATE_DATE, RoleROLEID, ROLE_ID
 */
async function insertServices(params) {
    try {
        var insertSave = await models.Roles.create(params);
        var getFirstParentId = parseInt(params.ROLE_PARENT_ID.split(',')[0]);
        if (insertSave != undefined) {
            await models.AgentPermission.bulkCreate([
                { AGENT_PERMISSION_KEY: "CREATE_CASHIER", AGENT_PERMISSION_VALUE: "Can Create Cashiers", CREATE_DATE: new Date(), UPDATE_DATE: new Date(), ROLE_ID: insertSave.dataValues.ROLE_ID },
                { AGENT_PERMISSION_KEY: "REGISTER_PLAYER", AGENT_PERMISSION_VALUE: "Can Register Players", CREATE_DATE: new Date(), UPDATE_DATE: new Date(), ROLE_ID: insertSave.dataValues.ROLE_ID },
                { AGENT_PERMISSION_KEY: "BLOCK_PLAYER", AGENT_PERMISSION_VALUE: "Can Block Players", CREATE_DATE: new Date(), UPDATE_DATE: new Date(), ROLE_ID: insertSave.dataValues.ROLE_ID },
                { AGENT_PERMISSION_KEY: "UPDATE_PASSWORD_PLAYER", AGENT_PERMISSION_VALUE: "Can Change Player Passwords", CREATE_DATE: new Date(), UPDATE_DATE: new Date(), ROLE_ID: insertSave.dataValues.ROLE_ID },
                { AGENT_PERMISSION_KEY: "ISACTIVE_GAME", AGENT_PERMISSION_VALUE: "Can activate/deactivate games", CREATE_DATE: new Date(), UPDATE_DATE: new Date(), ROLE_ID: insertSave.dataValues.ROLE_ID },
                { AGENT_PERMISSION_KEY: "ISDEPOSIT_PLAYER", AGENT_PERMISSION_VALUE: "Can Deposit to Players", CREATE_DATE: new Date(), UPDATE_DATE: new Date(), ROLE_ID: insertSave.dataValues.ROLE_ID },
                { AGENT_PERMISSION_KEY: "ISWITHDRAW_PLAYER", AGENT_PERMISSION_VALUE: "Can Withdraw from Players", CREATE_DATE: new Date(), UPDATE_DATE: new Date(), ROLE_ID: insertSave.dataValues.ROLE_ID },
            ], { returning: false });
            let strQuery = "SELECT t2.ROLE_ID AS ROLE_ID, t2.ROLE_NAME AS ROLE_NAME, " +
                " group_concat(t1.ROLE_NAME ORDER BY t1.ROLE_ID DESC) AS MASTER_ROLE_NAME, " +
                " group_concat(t1.ROLE_ID ORDER BY t1.ROLE_ID DESC) AS ROLE_PARENT_ID ,  " +
                " t2.DESCRIPTION AS DESCRIPTION, " +
                " t2.UPDATE_DATE AS UPDATE_DATE  " +
                " FROM ROLES t1, ROLES t2  " +
                " WHERE t1.ISDELETE = 0 and t2.ISACTIVE = 1 and t2.ROLE_ID =  " + insertSave.ROLE_ID +
                " AND  FIND_IN_SET(t1.ROLE_ID, t2.ROLE_PARENT_ID) " +
                " group by t2.ROLE_ID LIMIT 1 ";
            var getRow = await sequelize.query(strQuery, { type: QueryTypes.SELECT });
            /// Update Child Id's 
            await models.Roles.update({ CHILD_ROLE_ID: insertSave.ROLE_ID }, { where: { ROLE_ID: getFirstParentId } })
            return {
                status: true,
                msg: "Create Successfully.",
                data: getRow[0]
            }
        } else {
            /// 502
            return {
                status: false,
                msg: "Erron on Insert Data."
            }
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}



/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function listServices(params) {
    try {
        const { pageNumber, pageLimit } = params;
        let listQuery = "SELECT t2.ROLE_ID AS ROLE_ID, t2.ROLE_NAME AS ROLE_NAME, " +
            " group_concat(t1.ROLE_NAME ORDER BY t1.ROLE_ID DESC) AS MASTER_ROLE_NAME, " +
            " group_concat(t1.ROLE_ID ORDER BY t1.ROLE_ID DESC) AS ROLE_PARENT_ID , " +
            " t2.DESCRIPTION AS DESCRIPTION, " +
            " t2.UPDATE_DATE AS UPDATE_DATE  " +
            " FROM ROLES t1, ROLES t2  WHERE  " +
            " FIND_IN_SET(t1.ROLE_ID, t2.ROLE_PARENT_ID) AND t2.ISDELETE=0 group by t2.ROLE_ID " +
            " ORDER BY t2.ROLE_ID DESC " +
            " LIMIT " + parseInt(pageLimit) + " OFFSET " + parseInt(pageNumber);
        let countRecords = await models.Roles.count({});
        var listFind = await sequelize.query(listQuery, { type: QueryTypes.SELECT });
        return {
            status: true,
            msg: "Show data Successfully.",
            total: countRecords - 1,
            data: listFind
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }

}


/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function dropdownServices() {
    try {
        var listFind = await models.Roles.findAll({
            where: { ISDELETE: false }, /// ROLE_ID: { [Op.ne] : 1 }
            order: [
                ['ROLE_ID', 'DESC']
            ],
            limit: 1,
            attributes: ['ROLE_NAME', 'ROLE_ID', 'ROLE_PARENT_ID']
        });
        return {
            status: true,
            msg: "Show data Successfully.",
            data: listFind
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }

}

/**
 * 
 * @description Date - 29-12-2021 
 * @author Dipesh
 * 
 */
async function updateServices(params) {
    try {
        const { ROLE_ID, ROLE_NAME, ROLE_PARENT_ID, DESCRIPTION, ISACTIVE } = params;
        var updateOne = await models.Roles.update(
            { ROLE_NAME: ROLE_NAME, ROLE_PARENT_ID: ROLE_PARENT_ID, DESCRIPTION: DESCRIPTION, UPDATE_DATE: new Date(), ISACTIVE: ISACTIVE },
            {
                where: { ROLE_ID: ROLE_ID }
            }
        );
        if (updateOne) {
            let strQuery = "SELECT t2.ROLE_ID AS ROLE_ID, t2.ROLE_NAME AS ROLE_NAME, " +
                " group_concat(t1.ROLE_NAME ORDER BY t1.ROLE_ID DESC) AS MASTER_ROLE_NAME, " +
                " group_concat(t1.ROLE_ID ORDER BY t1.ROLE_ID DESC) AS ROLE_PARENT_ID ,  " +
                " t2.DESCRIPTION AS DESCRIPTION, " +
                " t2.UPDATE_DATE AS UPDATE_DATE  " +
                " FROM ROLES t1, ROLES t2  " +
                " WHERE t1.ISDELETE = 0 and t2.ISACTIVE = 1 AND t2.ROLE_ID =  " + ROLE_ID +
                " AND  FIND_IN_SET(t1.ROLE_ID, t2.ROLE_PARENT_ID) " +
                " group by t2.ROLE_ID LIMIT 1 ";
            var getRow = await sequelize.query(strQuery, { type: QueryTypes.SELECT });
            return {
                status: true,
                msg: "Update data Successfully.",
                data: getRow[0]
            }

        } else {
            return {
                status: false,
                msg: "Error on Update data."
            }
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }

}


/**
 * 
 * @description Date - 29-12-2021 
 * @author Dipesh
 * 
 */
async function deleteServices(params) {
    try {
        const { ROLE_ID } = params;
        var deleteOne = await models.Roles.update(
            { ISDELETE: true },
            {
                where: {
                    ROLE_ID: ROLE_ID
                }
            }
        );
        if (deleteOne) {
            return {
                status: true,
                msg: "Delete data Successfully.",
                data: deleteOne
            }
        } else {
            return {
                status: false,
                msg: "Error on Delete data."
            }
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}


module.exports = { insertServices, listServices, dropdownServices, updateServices, deleteServices };