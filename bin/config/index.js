module.exports = {
	api: {
		port: process.env.PORT || 5200,
	},
	database: {
		dbAddress: process.env.MONGO_URL || ''
	}
};