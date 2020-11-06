const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
const { mongoose } = require("../db.js");
const { ScrapedPhotographer } = require("../models/scrapedPhotographer");
const URLS = [
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-krystal/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-olga/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-rachael/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-kirill/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-maria/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-james/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-claire/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-leo/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-lucille/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-kari-caleb/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-caroline/",
  "https://www.flytographer.com/vacation-photographers/your-vacation-photographer-in-paris-meet-brandie/",
];
(async () => {
  let GrapherData = [];
  for(let url of URLS)
  {
    const response = await request({
        uri: url,
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
        },
        gzip: true,
      });
    
      let $ = cheerio.load(response);
      let Name = $('h1[class="intro__name h3"]').text().substring(4,12);
      let Expertise = $('div[class="photog-bio"]').text();
      let location =  $('div[class="photog-bio"] > span').text();
      let Price = 0;
      let Rating = 0;
      let ContactNO=null;
      let Email="null"

    
      GrapherData.push({

        Name,
        Expertise,
        location,
        Email,
        Price,
        ContactNO,
        url,
        Rating

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

