const fs = require('fs');
const path = require('path');
const Admins = require('../../data/db/models/admins');
const Users = require('../../data/db/models/users');

const JWT_STRATEGY = require('passport-jwt').Strategy
const EXTRACT_JWT = require('passport-jwt').ExtractJwt;

let PATH_TO_RSA_PUBLIC_KEY = path.join(__dirname, '../../.keys/', 'RSA_PUBLIC_KEY.pem');
let RSA_PUBLIC_KEY = fs.readFileSync(PATH_TO_RSA_PUBLIC_KEY, 'utf-8');



let options = {
	jwtFromRequest: EXTRACT_JWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: RSA_PUBLIC_KEY,
	algorithms: ['RS256']
}

let passport = passport => {
	passport.use(new JWT_STRATEGY(options, (JWT_Payload, done) => {

		Admins.findOne({ _id: JWT_Payload.sub }, (err, admin) => {

			if (err) {
				return done(err, false);
			}

			if(admin) {
				return done(null, admin);
			} else {
				return done(null, false);
			}
		});
	}));
}

let passportUserStrategy = passport => {
	passport.use(new JWT_STRATEGY(options, (JWT_Payload, done) => {

		Users.findOne({ _id: JWT_Payload.sub }, (err, user) => {

			if (err) {
				return done(err, false);
			}

			if(user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));
}

module.exports.passport = passport;
module.exports.passportUserStrategy = passportUserStrategy;