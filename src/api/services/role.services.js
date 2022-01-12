
const { QueryTypes } = require('sequelize');
const sequelize = require('../../database/index');
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
        var insertSave = await models.Roles.create(params);
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
            " group_concat(t1.ROLE_ID ORDER BY t1.ROLE_ID DESC) AS MASTER_ROLE_ID , " +
            " t2.DESCRIPTION AS DESCRIPTION " +
            " FROM ROLES t1, ROLES t2  WHERE t1.ISDELETE = 0 and t2.ISACTIVE = 1 AND " +
            " FIND_IN_SET(t1.ROLE_ID, t2.ROLE_PARENT_ID) group by t2.ROLE_ID " +
            " ORDER BY t2.ROLE_ID DESC " +
            " LIMIT " + parseInt(pageLimit) + " OFFSET " + parseInt(pageNumber);
        let countRecords = await models.Roles.count({ });
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
            order: [
                ['ROLE_ID', 'DESC']
            ],
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
                where: { ROLE_ID: ROLE_ID },
                returning: true,
                plain: true
            }
        );
        if (updateOne) {
            return {
                status: true,
                msg: "Update data Successfully.",
                data: updateOne
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
        var deleteOne = await models.Roles.destroy({
            where: {
                ROLE_ID: ROLE_ID
            }
        });
        if(deleteOne) {
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