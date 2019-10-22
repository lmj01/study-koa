const router = require('koa-router')();
const logger = require('../middlewares/logger');
const modelUser = require('../db/model.user');
const md5 = require('md5');


router.get('/en/register', async (ctx, next) => {    
    await ctx.render('index/register', {
        title: 'Login'
    })
});

router.get('/en/login', async (ctx, next) => {    
    await ctx.render('index/login', {
        title: 'Login'
    })
});

router.post('/login', async (ctx, next) => {
    logger.info(ctx);        
});

router.post('/register', async (ctx, next) => {
    let { nickname, email, password, password2 } = ctx.request.body;
    let files = ctx.request.files;    
    logger.info(ctx.request.body);
    logger.info(files);    
    // if (!email || !password) {
    //     ctx.response.redirect('en/register');
    //     return;
    // }
    logger.info(typeof password);
    await modelUser.user_find(email)
        .then(async (result) => {
            logger.info(result);
            if (result.length >=  1) {
                ctx.body = {
                    code: 1, 
                    message: email + '已经注册啦'
                }
            } else if (password !== password2 || password.trim() === '') {
                ctx.body = {
                    code: 1,
                    message:'密码输入不一致'
                };
            } else {
                ctx.response.redirect('en/register');
            }
        });
});

module.exports = router;