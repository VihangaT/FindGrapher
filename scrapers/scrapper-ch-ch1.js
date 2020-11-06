const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
const { mongoose } = require("../db.js");
const { ScrapedPhotographer } = require("../models/scrapedPhotographer");
const mains = [
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Berlin",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Delhi",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Depensar",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Lugano",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Bangkok",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Vienna",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Sofia",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Nicosia",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Bristol",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Cape-Town",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Kiev",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Tobago",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Sao-Paulo",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Athens",
  "https://www.bookingaphotographer.com/Worldwidephotographers/country/Melbourne",
];
(async () => {
  let GrapherData = [];
  for (let main of mains) {
    const response = await request({
      uri: main,
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
      },
      gzip: true,
    });

    let $ = cheerio.load(response);
    let Name = $(
      'h2[class="font_2"] > span[style="font-size:30px;"] > span[style="font-weight:bold;"]'
    ).text();
    let Expertise = $(
      'div[id="comp-jftkgxjl__834addb3-f6a2-4f8f-8ba7-21161d9c7667"] > p[class="font_8"]'
    ).text();
    let location = $(
      'div[id="comp-js4h2xxa__834addb3-f6a2-4f8f-8ba7-21161d9c7667"] > p[class="font_8"]'
    ).text();
    let Price = $(
      'div[style="width: 74px; pointer-events: none;"] > p[class="font_8"] > span'
    ).text();
    let Rating = 0;

    GrapherData.push({
      main,
      Name,
      Expertise,
      location,
      Price,
      Rating,
    });
  }


 
  try {
    let scraper = {
      Name: Name,
      Location: Location,
      Email: "null",
      ContactNo: "null",
      Expertise: Expertise,
      Price:Price,
      ProfileURL: main,
      Rating: Rating,
    };

    console.log(scraper);
    await new ScrapedPhotographer(scraper).save();
    console.log("Saved to database Successfully");
  
  } catch (ex) {
    console.log(ex);
  }
})();
