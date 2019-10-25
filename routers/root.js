const router = require('koa-router')();
const logger = require('../middlewares/logger');

router.get('/', async (ctx, next) => {    
    await ctx.render('index/index', {
        title: 'Web-ceph',
        session: ctx.session
    })
});

module.exports = router;