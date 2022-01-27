const { insertHelper, getAgentTypeHelper, getAgentPermissionHelper, getGameGroupHelper } = require('../helper/agent.helper');

/***
 * 
 * @description Role Insert 
 * 
 */
exports.insertController = async (req, res, next) => {
    var response;
    try {
        console.log(req.body)
        response = await insertHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};

/***
 * 
 * @description Role Insert 
 * 
 */
 exports.getAgentTypeController = async (req, res, next) => {
    var response;
    try {
        response = await getAgentTypeHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};


/***
 * 
 * @description Role Insert 
 * 
 */
 exports.getAgentPermissionController = async (req, res, next) => {
    var response;
    try {
        req.body.ROLE_ID = req.params.id;
        response = await getAgentPermissionHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};



/***
 * 
 * @description Role Insert 
 * 
 */
 exports.getGameGroupController = async (req, res, next) => {
    var response;
    try {
        response = await getGameGroupHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};