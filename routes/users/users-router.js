const { Router } = require('express');

const attachTo = (app, passport, passportUserLogin, repository) => {
	const router = new Router();
	const usersController = require('./users-controller')(repository);

	router
		.post('/user/login', usersController.login)
		.get('/users', usersController.getUsers)
		.get('/group/:id/schedule', usersController.getUserSchedule)
		.post('/user', passport.authenticate('jwt', { session: false }), usersController.addUser)
		.patch('/user/:id', passport.authenticate('jwt', { session: false }), usersController.editUser)
		.delete('/user/:id', passport.authenticate('jwt', { session: false }), usersController.removeUser)

	app.use('/api', router);
};

module.exports = { attachTo };