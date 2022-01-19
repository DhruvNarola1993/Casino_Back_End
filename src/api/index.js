var router = require('express').Router();


router.get('/', (req, res) => res.sendFile(__dirname + './../../index.html'));

router.use('/agenttype', require('./router/role.router'));

router.use('/gametype', require('./router/game-group.router'));

router.use('/faq', require('./router/faq.router'));

router.use('/setting', require('./router/setting.router'));

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