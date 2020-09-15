 var ObjectId = require('mongoose').Types.ObjectId;
 const jwt = require('jsonwebtoken');

var { User } = require('../models/user');
const HttpError = require('../models/http-error');

exports.getUser = (req, res) => {
    User.find((err, docs) => {
        if (!err) {  res.send(docs); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
};

exports.getUserByID = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
};

exports.signUp= async (req, res, next) => {

    const newUser = new User({
        name: req.body.name,
        country: req.body.country,
        city:req.body.city,
        email: req.body.email,
        password: req.body.password,
        contactNo: req.body.contactNo,
        gender: req.body.gender,
    });

    //Angular user model
    // name: string;
    // country: string;
    // city: string;
    // contactNo: string;
    // email: string;
    // gender: string;
    // password: string;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: newUser.email })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        res.json({
            message:   'Signing up failed, please try again later.',
            error: error
        });
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        res.json({
            message:  'User exists already, please login instead.',
            error: error
        });
        return next(error);
    }

    try {
        await newUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again.',
            500
        );
        res.json({
            message:  'Signing up failed, please try again.',
            error: error
        });
        return next(error);
    }

    const token = jwt.sign({email: req.body.email}, "token_validator", { expiresIn: "1h"});
    res.status(201).json({
        message: "SignUp Succsessfull",
        token: token
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser= await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        res.json({
            message: 'Logging in failed, please try again later.',
            error: error
        });
        return next(error);
    }
   
    if (!existingUser || existingUser.password !== password) {
        
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            401
        );
        res.json({
            message:  'Invalid credentials, could not log you in.',
            error: error,
        });
       
        //return next(error);
    }
   
    const token = jwt.sign({email: email}, "token_validator", { expiresIn: "1h"});
    res.json({
        message: 'Logged in Successful!',
        token: token,
        userEmail: email
    });
};

exports.postUserByID= (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var usr = {
        name: req.body.name,
        country: req.body.country,
        city:req.body.city,
        email: req.body.email,
        password: req.body.password,
        contactNo: req.body.contactNo,
        gender: req.body.gender,
    
    };
    User.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
};

exports.deleteUser= (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });

};
