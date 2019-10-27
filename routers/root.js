const router = require('koa-router')();
const logger = require('../middlewares/logger');

router.get('/', async (ctx, next) => {    
    logger.info('get in', ctx.session);
    await ctx.render('index/index', {
        title: 'Web-ceph',
        session: ctx.session
    })
    next();
});

module.exports = router;