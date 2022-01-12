const { insertHelper } = require('../helper/role.helper');

/***
 * 
 * @description Role Insert 
 * 
 */
exports.roleController = async (req, res, next) => {
    var response;
    try {
        response = await insertHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};