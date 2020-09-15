const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/FindGrapher')

	.then(() => {	 
		console.log('mongodb connected');
	})
	 .catch(err => {
		console.log(err);
	});

module.exports = mongoose;
