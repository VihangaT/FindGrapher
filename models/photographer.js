const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const photographerSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tag1: { type: String },
    tag2: { type: String },
    tag3: { type: String },
    tag4: { type: String },
    tag5: { type: String },
    tag6: { type: String },
    tag7: { type: String },
    tag8: { type: String },
    gender:{ type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    contactNo:{ type: String, required: true},
    imgUrl1: { type: String },
    imgUrl2: { type: String },
    imgUrl3: { type: String },
    imgUrl4: { type: String },
    imgUrl5: { type: String }

    // frontend photographer model
    //
//     firstName: string;
//   lastName: string;
//   city: string;
//   country: string;
//   email: string;
//   specialityField1: string;
//   specialityField2: string;
//   specialityField3: string;
//   specialityField4: string;
//   specialityField5: string;
//   specialityField6: string;
//   specialityField7: string;
//   specialityField8: string;
//   gender: string;
//   password: string;
//   contactNo: string;
//   imgUrl1: string;
//   imgUrl2: string;
//   imgUrl3: string;
//   imgUrl4: string;
//   imgUrl5: string;

});

//photographerSchema.plugin(uniqueValidator);

const Photographer = mongoose.model('Photographer', photographerSchema);
module.exports = { Photographer };
