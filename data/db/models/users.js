const mongoose = require('mongoose');

module.exports = mongoose.model(
	'User', 
	{
		_id: { 
			type: mongoose.Types.ObjectId, 
			auto: true
		},
		name: {
			type: String,
			required: true
		},
		surname: {
			type: String,
			required: true
		},
		group: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		hash: {
			type: String
		},
		salt: {
			type: String
		}
	}
);