const router = require('koa-router')();
const logger = require('../middlewares/logger');
const modelUser = require('../db/model.user');
const md5 = require('md5');
const moment = require('moment');
const uuidv1 = require('uuid/v1');


router.get('/en/register', async ctx => {    
    await ctx.render('index/en/register', {
        title: 'Register',
        session: ctx.session
    });
});

router.get('/en/login', async ctx => {       
    await ctx.render('index/en/login', {
        title: 'Login',
        session: ctx.session
    });
});

router.post('/logout', async ctx => {
    ctx.session = null;
    await ctx.render('index/index', {
        title: 'Web-ceph',
        session: ctx.session
    });
});

router.post('/login', async ctx => {
    let { email, password } = ctx.request.body;
    await modelUser.user_find(email)
        .then(res=>{
            if (res.length && email === res[0]['email'] && md5(password) === res[0]['password']) {
                ctx.session = {
                    nickname: res[0]['nickname'],
                    email: res[0]['email'],
                    id: res[0]['id'],
                    uuid: res[0]['uuid']
                }
                ctx.body = {
                    code: 0,
                    message: 'login success!'
                }
            } else {
                ctx.body = {
                    code: 1,
                    message: 'email or password is not correct!'
                }
                logger.info('login fail', email, password);
            }
        }).catch(err=>{
            logger.error('login ',err);
        })  
});

router.post('/register', async ctx => {
    let { nickname, email, password, password2 } = ctx.request.body;
    await modelUser.user_find(email)
        .then(async (result) => {
            logger.info(result);
            if (result.length >=  1) {
                ctx.body = {
                    code: 1, 
                    message: email + ' has registered!'
                }
            } else if (password !== password2 || password.trim() === '') {
                ctx.body = {
                    code: 2,   
                    message:'the password with differenet!'
                };
            } else {
                await modelUser.user_insert([nickname, email, md5(password), uuidv1(), 
                    moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')])
                    .then(res=>{                    
                        ctx.body = {
                            code: 0,
                            message: 'register succcess!'
                        }
                    });                
            }
        }).catch(err=>{
            logger.error('register ', err);
        });
});

module.exports = router;