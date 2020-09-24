const passwordUtilities = require('../../utils/passwordUtilities');
const modelName = 'Admins';

const adminsController = repository => {

	const login = async (req, res) => {
		const adminData = req.body;

		return repository.findOne({ modelName, options: { username: adminData.username } })
			.then(admin => {

				if (!admin) {
					res.status(401).send({ Error: 'Admin Not Found !!!' });
				}
				else {
					const isPasswordValid = passwordUtilities.isValidPassword(adminData.password, admin.hash, admin.salt);

					if (isPasswordValid) {
						const tokenData = passwordUtilities.issueJWT(admin);
						res.status(200).send({ Token: tokenData.Token, Expires: tokenData.Expires });
					}
					else {
						res.status(401).json({ Error: "Wrong Password !!!" });
					}
				}
			})
			.catch(error => console.log(error));
	};

	return { login };
};

module.exports = adminsController;