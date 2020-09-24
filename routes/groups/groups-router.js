const { Router } = require('express');

const attachTo = (app, passport, repository) => {
	const router = new Router();
	const validator = require('./groups-validator')();
	const categoriesController = require('./groups-controller')(repository);

	router
		.get('/groups', categoriesController.getGroups)
		.get('/group/:id', categoriesController.getGroupById)
		.patch('/groups/:id', validator.verifyEditMessage, passport.authenticate('jwt', { session: false }), categoriesController.editCategory)
		.post('/groups', validator.verifyCreateMessage, passport.authenticate('jwt', { session: false }), categoriesController.addCategory)
		.delete('/groups/:id', validator.verifyDeleteMessage, passport.authenticate('jwt', { session: false }), categoriesController.removeCategory)

	app.use('/api', router);
};

module.exports = { attachTo };