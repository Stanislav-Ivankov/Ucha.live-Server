const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const PATH_TO_RSA_PRIVATE_KEY = path.join(__dirname, '../.keys/', 'RSA_PRIVATE_KEY.pem');
const RSA_PRIVATE_KEY = fs.readFileSync(PATH_TO_RSA_PRIVATE_KEY, 'utf-8');



let issueJWT = user => {
	let _id = user._id;
	let tokenExpirationTime = '3d';
	let payload = { sub: _id, iat: Date.now() };
	let signedJWT = jsonwebtoken.sign(payload, RSA_PRIVATE_KEY, { expiresIn: tokenExpirationTime, algorithm: 'RS256' });

	return { Token: `Bearer ${ signedJWT }`, Expires: tokenExpirationTime };
}

let issueUserJWT = user => {
	let _id = user._id;
	let tokenExpirationTime = '1d';
	let payload = { sub: _id, iat: Date.now() };
	let signedJWT = jsonwebtoken.sign(payload, RSA_PRIVATE_KEY, { expiresIn: tokenExpirationTime, algorithm: 'RS512' });

	return { Token: `Bearer ${ signedJWT }`, Expires: tokenExpirationTime };
}

let isValidPassword = (password, hash, salt) => {
	let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

	return hash == hashVerify;
}

let generatePassword = password => {
	let salt = crypto.randomBytes(32).toString('hex');
	let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

	return { salt, hash };
}



module.exports.issueJWT = issueJWT;
module.exports.issueUserJWT = issueUserJWT;
module.exports.isValidPassword = isValidPassword;
module.exports.generatePassword = generatePassword;