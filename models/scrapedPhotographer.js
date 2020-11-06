const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScrapedphotographerSchema = new Schema({
    Name: { type: String},
    Location: { type: String},
    Email: { type: String},
    ContactNo:{ type: String},
    Expertise: { type: String },
    Price: { type: String },
    ProfileURL: { type: String },
    Rating: { type: String },
    

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

//photographerSchema.plugin(uniqueValidator);

const ScrapedPhotographer = mongoose.model('ScrapedPhotographers', ScrapedphotographerSchema);
module.exports = { ScrapedPhotographer };
