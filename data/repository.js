const db = {
	'Admins': require('./db/models/admins'),
	'Groups': require('./db/models/groups'),
	'Users': require('./db/models/users'),
	'Cameras': require('./db/models/cameras')
};

const init = () => {
	const create = request => db[request.modelName].create(request.newObject);
	const findOne = request => db[request.modelName].findOne(request.options);
	const find = request => db[request.modelName].find(request.options || {});
	const remove = request => db[request.modelName].deleteOne({ _id: request.record._id });
	const update = request => {
		let keys = Object.keys(request.updatedRecord).filter(key => key !== '_id');
		let setter = {};

		for(let counter = 0; counter < keys.length; counter++) {
			setter[keys[counter]] = request.updatedRecord[keys[counter]];
		}

		return db[request.modelName].findOneAndUpdate({ _id: request.updatedRecord._id }, setter, { new: true, returnNewDocument: true, returnOriginal: false });
	}

	return { create, findOne, find, remove, update };
};

module.exports = { init };