const validator = require('validator');

const adminValidator = () => {
	const verifyLoginData = (req, res, next) => {
		const payload = req.body;

		if (!payload || typeof payload.username !== 'string' || !validator.isLength(payload.username, { min: 1, max: 256 })) {
			return res.status(400).send({ isSuccessful: false, message: 'Invalid username!' });
		}

		if (!payload || typeof payload.password !== 'string' || !validator.isLength(payload.password, { min: 1, max: 256 })) {
			return res.status(400).send({ isSuccessful: false, message: 'Invalid password!' });
		}
		return next();
	};

	return { verifyLoginData };
};

module.exports = adminValidator;