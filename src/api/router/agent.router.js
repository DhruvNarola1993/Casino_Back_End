const {  insertController, getAgentTypeController, getAgentPermissionController, getGameGroupController } = require('../controller/agent.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();


role.post('/', insertController);

role.get('/', getAgentTypeController);

role.get('/:id', getAgentPermissionController);

role.get('/gametypes/:id', getGameGroupController);


module.exports = role;