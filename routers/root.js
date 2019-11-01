const router = require('koa-router')();

router.get('/', async ctx => {      
    await ctx.render('index/index', {
        title: 'Web-ceph',
        session: ctx.session
    })
});

module.exports = router;