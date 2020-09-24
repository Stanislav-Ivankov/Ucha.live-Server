const { Router } = require('express');

const attachTo = (app, repository) => {
	const router = new Router();
	const adminsController = require('./admins-controller')(repository);

	router
		.post('/admin/login', adminsController.login);

	app.use('/api', router);
};

module.exports = { attachTo };