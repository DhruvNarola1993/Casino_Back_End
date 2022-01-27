const { insertServices , getAgentTypeServices, getAgentPermissionServices, getGameGroupServices} = require('../services/agent.services');

/***
 * 
 * @description Role Help For Request
 * 
 */
async function insertHelper(params) {
    try {
        var insertService = await insertServices(params);
        return insertService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}


/***
 * 
 * @description Role Help For Request
 * 
 */
 async function getAgentTypeHelper(params) {
    try {
        var getAgentTypeService = await getAgentTypeServices(params);
        return getAgentTypeService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}


/***
 * 
 * @description Role Help For Request
 * 
 */
 async function getAgentPermissionHelper(params) {
    try {
        var getAgentPermissionService = await getAgentPermissionServices(params);
        return getAgentPermissionService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}


/***
 * 
 * @description Role Help For Request
 * 
 */
 async function getGameGroupHelper(params) {
    try {
        var getGameService = await getGameGroupServices(params);
        return getGameService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}

module.exports = { insertHelper , getAgentTypeHelper , getAgentPermissionHelper, getGameGroupHelper };