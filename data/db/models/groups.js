const mongoose = require('mongoose');

module.exports = mongoose.model(
	'Group', 
	{
		_id: { 
			type: mongoose.Types.ObjectId, 
			auto: true
		},
		name: {
			type: String,
			required: true
		},
		schedule: [{
			start: String,
			end: String,
			title: String,
			description: String,
			camera: mongoose.Types.ObjectId,
			dayOfWeek: Number
		}],
	}
);