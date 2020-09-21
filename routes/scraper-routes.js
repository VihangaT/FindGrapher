const express = require("express");
const multer = require("multer");

var router = express.Router();

const photographerScrapedController = require("../controllers/photographerScrapeController");

router.post("/ScrapeSave", photographerScrapedController.signup);

module.exports = router;
