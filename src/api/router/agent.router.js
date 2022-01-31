const {  insertController, getAgentTypeController, getAgentPermissionController, 
    getGameGroupController, viewController, selectAgentTypeController, countUserNameController } = require('../controller/agent.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();

/***
 * @description Insert Data
 */
role.post('/', insertController);

/***
 * @description Agent Type List : First Open The model for insert
 */
role.get('/', getAgentTypeController);

/***
 * @description Agent Permission All
 */
role.get('/:id', getAgentPermissionController);

/***
 * @description Game Type 
 */
role.get('/gametypes/:id', getGameGroupController);

/***
 * @description Table View
 */
role.post('/list', viewController);

/***
 * @description Agent Type Based , Agent List
 */
role.get('/agenttypes/:id', selectAgentTypeController);

/***
 * @description Agent User-Name Count
 */
role.put('/agents', countUserNameController);


module.exports = role;