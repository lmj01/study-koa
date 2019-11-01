
const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-body');
const session = require('koa-session-minimal');
const mysqlStore = require('koa-mysql-session');
const staticCache = require('koa-static');

const config = require('./config/default');

const app = new Koa();

app.use(session({
	key: 'user_sid',
	store: new mysqlStore({
		user: config.mysql.user,
		password: config.mysql.password,
		database: config.mysql.database,
		host: config.mysql.host
	}),
	cookie: {
		domain: 'localhost',
		maxAge: 1000 * 30,
		httpOnly: true,
		overwrite: false
	}
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
app.use(bodyParser({
	formidable: {
		uploadDir:'./uploadfiles'
	},
	requestBody: 'body',
	requestFiles: 'files',
	multipart: true
}));
app.use(require('./middlewares/render'));
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(require('./routers/root').routes());
app.use(require('./routers/authentication').routes());
app.on('error', err=>{
	console.log('server error', err);		
});

app.listen(config.port);