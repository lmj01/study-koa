
const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const mysqlStore = require('koa-mysql-session');
const router = require('koa-router');
const views = require('koa-views');
const staticCache = require('koa-static');
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

app.use(views(path.join(__dirname, './views'), {

}));

app.use(bodyParser({
	formLimit: '1mb'
}));

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(require('./routers/signup.js').routes());

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
	ctx.body = 'hello world!';
});

app.listen(config.port);