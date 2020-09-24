const passwordUtilities = require('../../utils/passwordUtilities');
const modelName = 'Users';
const Groups  = require('../../data/db/models/groups');

const usersController = repository => {

	const login = async (req, res) => {
		const userData = req.body;

		return repository.findOne({ modelName, options: { username: userData.username } })
			.then(user => {

				if (!user) {
					res.status(401).send({ Error: 'User Not Found !!!' });
				} else {
					const isPasswordValid = passwordUtilities.isValidPassword(userData.password, user.hash, user.salt);

					if (isPasswordValid) {
						const tokenData = passwordUtilities.issueUserJWT(user);
						res.status(200).send({ Group: user.group, Token: tokenData.Token, Expires: tokenData.Expires });
					} else {
						res.status(401).json({ Error: "Wrong Password !!!" });
					}
				}
			})
			.catch(error => console.log(error));
	};

	const addUser = async (req, res) => {
		const userData = req.body;

		const hashAndSalt = passwordUtilities.generatePassword(userData.password);

		userData.hash = hashAndSalt.hash;
		userData.salt = hashAndSalt.salt;

		return repository.create({ modelName, newObject: userData })
			.then(response => {
				if (response) {
					res.status(200).send(response._doc);
				} else {
					res.status(400).send({ error: response });
				}
			})
			.catch(error => console.log(error));
	};

	const editUser = async (req, res) => {
		const userData = req.body;

		let hashAndSalt = passwordUtilities.generatePassword(userData.password);

		userData.hash = hashAndSalt.hash;
		userData.salt = hashAndSalt.salt;

		return repository.update({ modelName, updatedRecord: userData })
			.then(response => {
				if (response) {
					res.status(200).send(response._doc);
				} else {
					res.status(400).send({ error: response });
				}
			})
			.catch(error => console.log(error));
	};

	const removeUser = async (req, res) => {
		return repository.remove({ modelName, record: { _id: req.params.id }})
			.then(response => {
				if (response) {
					res.status(200).send(response._doc);
				} else {
					res.status(400).send({ error: response });
				}
			}).catch(error => console.log(error));
	};

	const getUsers = async (_, res) => {
		return repository.find({ modelName })
			.then(response => {
				if (response) {
					res.status(200).send(response);
				} else {
					res.status(400).send({ error: response });
				}
			})
			.catch(error => console.log(error));
  };

  const getUserSchedule = async (req, res) => {
    return Groups.findOne({ _id: req.params.id }, { _id: 0, schedule: 1 })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

	return { login, addUser, editUser, removeUser, getUsers, getUserSchedule };
};

module.exports = usersController;