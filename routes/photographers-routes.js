const express = require('express');
const multer = require("multer");

var { Photographer } = require('../models/photographer');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

const photographerController = require('../controllers/photographerController');
const checkAuth = require("../shared/middleware/check-auth");


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

router.get('/', checkAuth,photographerController.getPhotographers);

router.get('/:tag', photographerController.getPhotographersByTag);

router.get('/:id',  photographerController.getPhotographersByID);

router.post('/signup',
    multer({ storage: storage }).fields([
        {name: "image1",  maxCount: 1},
        {name: "image2",  maxCount: 1},
        {name: "image3",  maxCount: 1},
        {name: "image4",  maxCount: 1},
        {name: "image5",  maxCount: 1},
    ]),  photographerController.signup);

router.post('/login',  photographerController.login);

router.patch('/update',  multer({ storage: storage }).fields([
    {name: "image1",  maxCount: 1},
    {name: "image2",  maxCount: 1},
    {name: "image3",  maxCount: 1},
    {name: "image4",  maxCount: 1},
    {name: "image5",  maxCount: 1},
]), photographerController.updatePhotographerByID);

router.delete('/:id',  photographerController.deletePhotographers);


router.post('/sendmail', photographerController.sendMail);

module.exports = router;
