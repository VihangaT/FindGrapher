const mongoose = require('mongoose');

//const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: { type: String, required: true },
    country: { type: String, required: true  },
    city: { type: String, required: true  },
    contactNo:{ type: String, required: true },
    email: { type: String, required: true, unique: true  },
    gender:{ type: String, required: true  },
    password: { type: String, required: true, minLength: 6 }
    
});

//userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = { User };

