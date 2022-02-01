var router = require('express').Router();


router.get('/', (req, res) => res.sendFile(__dirname + './../../index.html'));

router.use('/agenttype', require('./router/role.router'));

router.use('/gametype', require('./router/game-group.router'));

router.use('/faq', require('./router/faq.router'));

router.use('/setting', require('./router/setting.router'));

router.use('/coinpack', require('./router/coinpack.router'));

router.use('/loyalty', require('./router/loyalty.router'));

router.use('/permission', require('./router/agent-permission.router'));

router.use('/menu', require('./router/menu.router'));

router.use('/game', require('./router/game.router'));

router.use('/slider', require('./router/slider.router'));

router.use('/agent', require('./router/agent.router'));

// router.use('/player', require('./router/'));

// router.use('/menupermission', require('./router/slider.router'));


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