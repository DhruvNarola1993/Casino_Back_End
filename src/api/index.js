var router = require('express').Router();


router.get('/', (req, res) => res.sendFile(__dirname + './../../index.html'));

router.use('/role', require('./router/role.router'));


/***
 * 
 * Middleware API - If not found any url
 * 
 */
router.use(function (req, res, next) {
    var err = {};
    err.status = 404;
    err.msg = "Not Found";
    next(res.json({ status: false, msg: err }));
});
module.exports = router;