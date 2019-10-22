const router = require('koa-router')();
const logger = require('../middlewares/logger');

router.get('/', async (ctx, next) => {    
    let name = ctx.params.name;
    logger.info(ctx.params);
    await ctx.render('index/index', {
        title: 'koa-title',
        name: name
    })
});

module.exports = router;