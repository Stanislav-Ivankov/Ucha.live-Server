const mongoose = require('mongoose');

module.exports = mongoose.model(
	'Camera', 
	{
		_id: { 
			type: mongoose.Types.ObjectId, 
			auto: true
		},
		name: {
			type: String,
			required: true
		},
		ip: {
			type: String,
			required: true
		},
		RTPusername: {
			type: String,
			required: true
		},
		RTPpassword: {
			type: String,
			required: true
		}
	}
);