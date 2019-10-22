const renderer = require('koa-hbs-renderer');
const path = require('path');

let options = {
	cacheExpires: 60,
	contentTag: 'content',
	defaultLayout: 'default',
	//environment: process.env.NODE_ENV,
	paths: {
		views: path.join(__dirname, '../views'),
		layouts: path.join(__dirname, '../views/layouts'),
		partials: path.join(__dirname, '../views/partials'),
		helpers: path.join(__dirname, '../helpers')
	}
}

module.exports = renderer(options);