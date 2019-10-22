
const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-body');
const session = require('koa-session-minimal');
const mysqlStore = require('koa-mysql-session');
const staticCache = require('koa-static');

const logger = require('./middlewares/logger');
const config = require('./config/default');

const app = new Koa();

app.use(session({
	key: 'user_sid',
	store: new mysqlStore({
		user: config.mysql.user,
		password: config.mysql.password,
		database: config.mysql.database,
		host: config.mysql.host,
		port: config.mysql.port
	})
}));

app.use(staticCache(path.join(__dirname, './public'), {
	dynamic: true
}, {
	maxAge: 365 * 24 * 60 * 60
}));

app.use(staticCache(path.join(__dirname, './images'), {
	dynamic: true
}, {
	maxAge: 365 * 24 * 60 * 60
}));

app.use(require('./middlewares/render'));
app.use(bodyParser({
	formidable: {},
	requestBody: 'body',
	requestFiles: 'files'
}));
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(require('./routers/root').routes());
app.use(require('./routers/authentication').routes());
app.on('error', err=>{
	logger.error('server error', err);	
})

app.listen(config.port);