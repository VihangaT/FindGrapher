const puppeteer = require("puppeteer");
const { mongoose } = require("../db.js");
const { ScrapedPhotographer } = require("../models/scrapedPhotographer");
(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    );
    await page.goto(
      "https://experts.shopify.com/services/store-setup/customize-design?industries%5B%5D=ART_PHOTOGRAPHY",
      {
        waitUntil: "load",
        timeout: 0,
      }
    );
    await page.waitForSelector("div._3iz-t");
    // await page.waitForSelector('div._2dskn ');
    // await page.waitForSelector('[class="Polaris-Icon__Svg"]');

    const photographers = await page.$$("div._3iz-t");
    const ForLinks = await page.$$('[class="kVWrj"] > a');
    console.log("For Links", ForLinks.length);

    console.log("Number of Photographers", photographers.length);

    const Expertise = await page.$eval(
      '[class="Polaris-Tag__TagText"]',
      (skill) => skill.innerText
    );

    console.log(Expertise);

    const PageResult = await page.$eval(
      '[class="_2Ep7Z iyHZA"] >[class="Polaris-Stack Polaris-Stack--distributionTrailing Polaris-Stack--alignmentCenter"] > [class="Polaris-Stack__Item"] > span.Polaris-TextStyle--variationSubdued',
      (result) => result.innerText
    );

    console.log(PageResult);
    const noResults = PageResult.split(" ");
    console.log("Number of Results", noResults[0]);
    const Results = noResults[0];
    function getNoPages(Res) {
      if (Res / 12 === 0) {
        return (NumPages = Res / 12);
      } else {
        return (NumPages = Math.round(Res / 12));
      }
    }
    let NumberofPages = getNoPages(Results);
    console.log("Number of Pages", NumberofPages);

    for (let i = 1; i <= NumberofPages; i++) {
    //   for (let link of ForLinks) {
    //     await page.waitForSelector('[class="kVWrj"]');
    //     const ProfileURL = await link.$eval('div.kVWrj > a', (ProURL) =>
    //       ProURL.getAttribute("href")
    //     );
    //     console.log("Profile URL:", ProfileURL);
    //   }

      for (let photographer of photographers) {
        // const button = await photographer.$('[class="_12oDh _4KkyP"]');
        //  await button.click();
        await page.waitForSelector('[class="_3657d"]');
        console.log("Start of loop");

        //   await page.waitForNavigation();
        await page.waitForSelector(
          '[class="Polaris-DisplayText Polaris-DisplayText--sizeExtraLarge"]'
        );
        console.log("Iteration Starts");

        //   await page.waitForSelector('img.lazyautosizes ls-is-cached lazyloaded');
        //    const Name = await photographer.$eval(
        //     "h2._12oDh _4KkyP",
        //     (name) => name.innerText
        //   );

        // const ProfileURL = await page.$eval(
        //   ' div.kVWrj',
        //   (ProURL) => ProURL.getAttribute('href')
        // );

        // const ProfileURL = await photographer.evaluate('document.querySelector("[class="kVWrj"] > a").getAttribute("href")')

        const Name = await photographer.$eval(
          '[class="_12oDh _4KkyP"]',
          (name) => name.innerText
        );

        const Location = await photographer.$eval(
          '[class="Polaris-TextStyle--variationSubdued"]',
          (location) => location.innerText
        );

        //   await page.waitForNavigation();
        const Price = await photographer.$eval(
          '[class="_3657d"]',
          (price) => price.innerText
        );

        const Rating = await photographer.$eval(
          '[class="Polaris-Stack Polaris-Stack--spacingExtraTight Polaris-Stack--alignmentCenter"] > [class="Polaris-Stack__Item"]',
          (rating) => rating.innerText
        );
        console.log(photographer);
        console.log("Expertise:", Expertise);
        console.log("Name:", Name);
        console.log("Location", Location);
        console.log("Price:", Price);
        console.log("Rating", Rating);
       

        try {
          let scraper = {
            Name: Name,
            Location: Location,
            Email: "null",
            ContactNo: "null",
            Expertise: Expertise,
            Price:Price,
            ProfileURL: "null",
            Rating: Rating,
          };
  
          console.log(scraper);
          await new ScrapedPhotographer(scraper).save();
          console.log("Saved to database Successfully");
        } catch (error) {
          console.log(error);
        }
      }

      if (NumberofPages != i) {
        console.log(
          "**********************************Going to click next*******************************"
        );
        await page.waitForSelector(
          '[class="Polaris-Pagination__Button Polaris-Pagination__NextButton"]'
        );
        const NXTbutton = await page.$(
          '[class="Polaris-Pagination__Button Polaris-Pagination__NextButton"]'
        );
        await NXTbutton.click();
      }
    }

    console.log("*******Scraping this web site is completed*********");

    await browser.close();
  } catch (e) {
    console.log("our error", e);
    await browser.close();
  }
})();
