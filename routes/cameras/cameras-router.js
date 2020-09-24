const { Router } = require('express');

const attachTo = (app, passport, repository, upload) => {
	const router = new Router();
	const camerasController = require('./cameras-controller')(repository);

	router
		.get('/cameras', camerasController.getCameras)
		.get('/camera/:id', camerasController.getCameraById)

	app.use('/api', router);
};

module.exports = { attachTo };