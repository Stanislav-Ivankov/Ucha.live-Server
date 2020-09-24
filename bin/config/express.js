const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
let Passport = require('passport').Passport;
const helmet = require('helmet');
const path = require('path');

const passport = new Passport();
const passportUser = new Passport();

const rtsp = require('../../services/rtsp')();
const cors = require('cors');

const init = async repository => {
	const app = express();

	require('../config/passport').passport(passport);
	app.use(passport.initialize());

	require('../config/passport').passportUserStrategy(passportUser);
	app.use(passportUser.initialize());

	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser());
	app.use(helmet());

	// Routers
	require('./../../routes/admins/admins-router').attachTo(app, repository);
	require('./../../routes/groups/groups-router').attachTo(app, passport, repository);
	require('./../../routes/cameras/cameras-router').attachTo(app, passport, repository);
	require('./../../routes/users/users-router').attachTo(app, passport, passportUser, repository);

	rtsp.init(repository);

	// share the streams
	// TODO: Make some tocken validation before returning the result
	app.use('/streams', express.static(path.join(__dirname, '../../streams')));

	app.use((_req, _res, next) => { next(createError(404)) });
	app.use((err, req, res, next) => {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		res.status(err.status || 500);
		next();
	});

	return app;
};

module.exports = { init };