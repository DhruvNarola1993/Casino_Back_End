
const { models } = require('../../database/index');
const { Op } = require("sequelize");
/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function insertServices(params) {
    try {
        var insertSave = await models.Agent.create(params);
        if (insertSave != undefined) {
            return {
                status: true,
                msg: "Create Successfully.",
                data: insertSave
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


/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function getAgentTypeServices(params) {
    try {
        var listFind = await models.Roles.findAll({
            where: { ISDELETE: false, ROLE_ID: { [Op.ne]: 1 } }, /// ROLE_ID: { [Op.ne] : 1 }
            attributes: ['ROLE_NAME', 'ROLE_ID']
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


/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function getAgentPermissionServices(params) {
    try {
        const { ROLE_ID } = params;
        var listFind = await models.AgentPermission.findAll({
            where: { ISVIEW: true, ROLE_ID: ROLE_ID }, 
            attributes: ['AGENT_PERMISSION_ID', 'AGENT_PERMISSION_VALUE']
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


/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
 async function getGameGroupServices(params) {
    try {
        var listFind = await models.GameGroup.findAll({
            where: { ISDELETE: false },
            attributes: ['GAMEGROUP_ID', 'GAMEGROUP_NAME']
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

module.exports = { insertServices, getAgentTypeServices, getAgentPermissionServices, getGameGroupServices };