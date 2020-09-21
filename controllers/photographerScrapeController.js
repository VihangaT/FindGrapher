require("dotenv").config();
const { ScrapedPhotographer } = require("../models/scrapedPhotographer");
const HttpError = require("../models/http-error");

exports.signup = async (req, res, next) => {
  let existingPhotographer;
  try {
    existingPhotographer = await ScrapedPhotographer.findOne({
      email: req.body.email,
    });
  } catch (e) {
    console.log(e);
    const error = new HttpError("Scraped Data Saving Failed. Please try again!", 500);
    res.json({
      message: "Sign-up Failed. Please try again!",
      error: error,
    });
    return next(error);
  }

  if (existingPhotographer) {
    const error = new HttpError(
      "Sign-up Failed. Email exists already   !",
      500
    );
    res.json({
      message: "Sign-up Failed. Email exists already   !",
      error: error,
    });
    return next(error);
  }
  const url = req.protocol + "://" + req.get("host");

  const newPhotographer = new ScrapedPhotographer({
    Name: req.body.Name,
    Expertise: req.body.Expertise,
    Location: req.body.Location,
    Email: req.body.Email,
    Price: req.body.Price,
    ContactNo: req.body.contactNo,
    ProfileURL: req.body.ProfileURL,
    Rating: req.body.Rating,
    

    // frontend photographer model
    // {
    //     "Name": "David Hartig",
    //     "specialityField": " Architecture & Commercial Interiors",
    //     "country": "San Diego,US",
    //     "email": "David@davidhartig.com",
    //     "price": 0,
    //     "contactNo": " 800-600-4278",
    //     "proUrl": "https://www.asmp.org/portfolio/david-hartig/?address=Los%2BAngeles%2C%2BCA%2C%2BUSA&lat=34.0522342&lng=-118.2436849&distance=26.1&units=mi",
    //     "starRating": null
    //   }
  });

  try {
    await newPhotographer.save();
  } catch (e) {
    console.log(e);
    const error = new HttpError("Scraped Data Saving Failed. Please try again! ", 500);
    res.json({
      message: "Server Error: Scraped Data Saving Failed. Please try again!",
      error: error,
    });
    return next(error);
  }
};
