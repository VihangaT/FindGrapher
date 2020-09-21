
const nodemailer = require('nodemailer');
require('dotenv').config();
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

const { Photographer } = require('../models/photographer');
const { User } = require('../models/user');
const HttpError = require('../models/http-error');
const multer = require("multer");


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

exports.getPhotographers = async (req, res, next) => {

    let photographers;
    try {
        photographers = await Photographer.find();
    } catch (err) {
        const error = new HttpError(
            'Fetching Photographers failed, please try again later.',
            500
        );
        return next(error);
    }
    res.status(201).json({
        message: "photographers",
        photographers: photographers
    });
    // res.status(201).json({photographers: photographers.map(photographer => photographer.toObject({ getters: true }))});
};

exports.getPhotographersByID = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Photographer.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingPhotographer;

    try {
        existingPhotographer = await Photographer.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Email doesnt exists, Logging in failed, please try again later.',
            500
        );
        res.json({
            message: 'Email doesnt exists, Logging in failed, please try again later.',
            error: error
        });
        return next(error);
    }

    let isValidPassword = false;

    try {
        if (password === existingPhotographer.password) {
            isValidPassword = true;
        }
        // isValidPassword = await bcrypt.compare(password, existingPhotographer.password);
    } catch (err) {
        const error = new HttpError(
            'Password Incorrect, Logging in failed, please try again later.',
            500
        );
        res.json({
            message: 'Password Incorrect, Logging in failed, please try again later.',
            error: error
        });
        return next(error);
    }


    if (!existingPhotographer && !isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            401
        );
        res.json({
            message: 'Invalid credentials, could not log you in.',
            error: error
        });
        return next(error);
    }

    const token = jwt.sign({ email: email }, "token_validator", { expiresIn: "1h" });

    res.status(200).json({
        message: 'Logged in Successful!',
        photographer: existingPhotographer,
        token: token
    });
};


exports.signup = async (req, res, next) => {

    let existingPhotographer;
    try {
        existingPhotographer = await Photographer.findOne({ email: req.body.email });
    } catch (e) {
        console.log(e);
        const error = new HttpError(
            'Sign-up Failed. Please try again!',
            500
        );
        res.json({
            message: 'Sign-up Failed. Please try again!',
            error: error
        });
        return next(error);
    }

    if (existingPhotographer) {
        const error = new HttpError(
            'Sign-up Failed. Email exists already   !',
            500
        );
        res.json({
            message: 'Sign-up Failed. Email exists already   !',
            error: error
        });
        return next(error);
    }
    const url = req.protocol + "://" + req.get("host");

    const newPhotographer = new Photographer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        city: req.body.city,
        email: req.body.email,
        tag1: req.body.specialityField1,
        tag2: req.body.specialityField2,
        tag3: req.body.specialityField3,
        tag4: req.body.specialityField4,
        tag5: req.body.specialityField5,
        tag6: req.body.specialityField6,
        tag7: req.body.specialityField7,
        tag8: req.body.specialityField8,
        gender: req.body.gender,
        password: req.body.password,
        contactNo: req.body.contactNo,
        imgUrl1: url + "/images/" + req.files['image1'][0].filename,
        imgUrl2: url + "/images/" + req.files['image2'][0].filename,
        imgUrl3: url + "/images/" + req.files['image3'][0].filename,
        imgUrl4: url + "/images/" + req.files['image4'][0].filename,
        imgUrl5: url + "/images/" + req.files['image5'][0].filename,

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

    try {
        await newPhotographer.save();
    } catch (e) {
        console.log(e);
        const error = new HttpError(
            'Sign-up Failed. Please try again! ',
            500
        );
        res.json({
            message: 'Server Error: Sign-up Failed. Please try again!',
            error: error
        });
        return next(error);
    }

    const token = jwt.sign({ email: req.body.email }, "token_validator", { expiresIn: "1h" });
    res.status(200).json({
        message: "SignUp Successfull",
        token: token,
        photographer: newPhotographer
    });
};

exports.getPhotographersByTag = async (req, res, next) => {

    const tagName = req.params.tag;
    let photographers;
    try {
        photographers = await Photographer.find({ tags: tagName.toString() }, '-password');
    } catch (err) {
        const error = new HttpError(
            'Fetching Photographers for Tags failed, please try again later.',
            500
        );
        return next(error);
    }
    res.status(201).json({ photographers: photographers.map(photographer => photographer.toObject({ getters: true })) });

};

exports.updatePhotographerByID = async (req, res, next) => {

    //const id = req.params.id;
    const url = req.protocol + "://" + req.get("host");

    let imagePath1 = req.body.image1;
    let imagePath2 = req.body.image2;
    let imagePath3 = req.body.image3;
    let imagePath4 = req.body.image4;
    let imagePath5 = req.body.image5;

    try {
        if (req.files['image1']) {
            imagePath1 = url + "/images/" + req.files['image1'][0].filename;
        }

        if (req.files['image2']) {
            imagePath2 = url + "/images/" + req.files['image2'][0].filename;
        }

        if (req.files['image3']) {
            imagePath3 = url + "/images/" + req.files['image3'][0].filename;
        }

        if (req.files['image4']) {
            imagePath4 = url + "/images/" + req.files['image4'][0].filename;
        }

        if (req.files['image5']) {
            imagePath5 = url + "/images/" + req.files['image5'][0].filename;
        }
    } catch (error) {
        console.log(error);
    }


    let photographer;
    try {
        photographer = await Photographer.find({ email: req.body.prevEmail });
    } catch (err) {
        console.log("err1");
        console.log(err);
        const error = new HttpError(
            'Something went wrong, could not update photographer.',
            500
        );
        return next(error);
    }

    if (!photographer) {
        console.log("err");
        const error = new HttpError(
            'No ID! Something went wrong, could not update photographer.',
            500
        );
        return next(error);
    }

    // photographer.firstName = req.body.firstName;
    // photographer.lastName = req.body.lastName;
    // photographer.country = req.body.country;
    // photographer.city = req.body.city;
    // // photographer.email = req.body.email;
    // photographer.tag1 = req.body.specialityField1,
    //     photographer.tag2 = req.body.specialityField2,
    //     photographer.tag3 = req.body.specialityField3,
    //     photographer.tag4 = req.body.specialityField4,
    //     photographer.tag5 = req.body.specialityField5,
    //     photographer.tag6 = req.body.specialityField6,
    //     photographer.tag7 = req.body.specialityField7,
    //     photographer.tag8 = req.body.specialityField8,
    //     photographer.contactNo = req.body.contactNo;
    // photographer.gender = req.body.gender;
    // photographer.imgUrl1 = imagePath1;
    // photographer.imgUrl2 = imagePath2;
    // photographer.imgUrl3 = imagePath3;
    // photographer.imgUrl4 = imagePath4;
    // photographer.imgUrl5 = imagePath5;

    const updatedPhotographer = new Photographer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        city: req.body.city,
        email: req.body.prevEmail,
        tag1: req.body.specialityField1,
        tag2: req.body.specialityField2,
        tag3: req.body.specialityField3,
        tag4: req.body.specialityField4,
        tag5: req.body.specialityField5,
        tag6: req.body.specialityField6,
        tag7: req.body.specialityField7,
        tag8: req.body.specialityField8,
        gender: req.body.gender,
        password: photographer.password,
        contactNo: req.body.contactNo,
        imgUrl1: imagePath1,
        imgUrl2: imagePath2,
        imgUrl3: imagePath3,
        imgUrl4: imagePath4,
        imgUrl5: imagePath5
    })


    // try {
    //     await photographer.save();
    // } catch (err) {
    //     const error = new HttpError(
    //         'Something went wrong, could not update photographer.',
    //         500
    //     );
    //     return next(error);
    // }

    // res.status(200).json({ photographer: photographer.toObject({ getters: true }) });

    Photographer.update({ email: req.body.prevEmail }, {
        '$set': {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            country: req.body.country,
            city: req.body.city,
            tag1: req.body.specialityField1,
            tag2: req.body.specialityField2,
            tag3: req.body.specialityField3,
            tag4: req.body.specialityField4,
            tag5: req.body.specialityField5,
            tag6: req.body.specialityField6,
            tag7: req.body.specialityField7,
            tag8: req.body.specialityField8,
            gender: req.body.gender,
            contactNo: req.body.contactNo,
            imgUrl1: imagePath1,
            imgUrl2: imagePath2,
            imgUrl3: imagePath3,
            imgUrl4: imagePath4,
            imgUrl5: imagePath5
        }
    })
        .then(result => {
            res.status(200).json({
                message: "Update successful!",
                photographer: updatedPhotographer
            });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.deletePhotographers = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Photographer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
};

exports.sendMail = async (req, res) =>
{
    const { photoEmail, userEmail } = req.body;
    let name ="";
    let country ="";
    let message = "Email sent successfully";
    let status = 200;
    try
    {
        const user = await User.findOne({email: userEmail});
        name = user.name;
        country = user.country;


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: photoEmail,
            subject: 'FindGrapher- An client is Waiting For You',
            text: `${name} from ${country} wants to contact with you. \n Email Address :${userEmail} . Please contact the client as soon as possible`
        };

        await transporter.sendMail(mailOptions, function (err, data) {});

        return res.status(status).json({
            message: message,
        });

    } catch (error) {
        console.log(error);
    }
}
