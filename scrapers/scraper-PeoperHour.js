const puppeteer = require("puppeteer");

(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
      );
      await page.goto(
        "https://www.peopleperhour.com/hire-freelancers/photography?page=1",
        {
          waitUntil: "load",
          timeout: 0,
        }
      );
      async function scrape(){
        await page.waitForSelector('[class="list⤍List⤚3R-r9"]');
        console.log("Web Page Visited");
  
        await page.waitForSelector(
          '[class="freelancer⤍FreelancerListItem⤚1sW1y"]'
        );
        const photographers = await page.$$(
          '[class="freelancer⤍FreelancerListItem⤚1sW1y"] '
        );
        console.log(photographers.length);
  
        for (photographer of photographers) {
          await page.waitForSelector(
            '[class="freelancer__title⤍FreelancerListItem⤚28qcy"] > a >h5'
          );
  
          const Name = await photographer.$eval(
            '[class="freelancer__title⤍FreelancerListItem⤚28qcy"] > a >h5',
            (name) => name.innerText
          );
  
          let Location = "";
          if (
            (await photographer.$(
              '[class="u-hidden--md u-hidden--lg u-hidden--xl freelancer__location⤍FreelancerListItem⤚1BmpC"]'
            )) !== null
          ) {
            Location = await photographer.$eval(
              '[class="u-hidden--md u-hidden--lg u-hidden--xl freelancer__location⤍FreelancerListItem⤚1BmpC"]',
              (location) => location.innerText
            );
          }
  
          let Price = "";
          if (
            (await photographer.$(
              '[class="price__unit⤍FreelancerListItem⤚3iIv4"]'
            )) !== null
          ) {
            Price = await photographer.$eval(
              '[class="price__unit⤍FreelancerListItem⤚3iIv4"]',
              (price) => price.innerText
            );
          }
  
          let Expertise = "";
          if (
            (await photographer.$(
              '[class="freelancer__description⤍FreelancerListItem⤚F94t2"]'
            )) !== null
          ) {
            Expertise = await photographer.$eval(
              '[class="freelancer__description⤍FreelancerListItem⤚F94t2"]',
              (expertise) => expertise.innerText
            );
          }
  
          let Rating = "";
          if (
            (await photographer.$(
              '[class="rating__average⤍FreelancerListItem⤚3Dxxj"]'
            )) !== null
          ) {
            Rating = await photographer.$eval(
              '[class="rating__average⤍FreelancerListItem⤚3Dxxj"]',
              (rating) => rating.innerText
            );
          }
  
          const ProURL = await photographer.$eval(
            '[class="freelancer__title⤍FreelancerListItem⤚28qcy"] > a',
            (url) => url.href
          );
  
          console.log("URL:", ProURL);
          console.log("Name:", Name);
          console.log("Expertise:", Expertise);
          console.log("Location:", Location);
          console.log("Price:", Price);
          console.log("Rating:", Rating);
        }
      }
    scrape();

    if((await page.$('[class="pagination__icon⤍SimplePagination⤚z5DPn"] > path')) !== null){
        console.log("**************************************Moving to the next page*********************************")
        const NXTbutton = await page.$(
            '[class="pagination__icon⤍SimplePagination⤚z5DPn"] > path'
          );
          await NXTbutton.click();
          scrape();
    }

    console.log("*************Scraping is Completed***************************");
    await browser.close();
  } catch (ex) {
    console.log("Error Prompted", ex);
    await browser.close();
  }
})();



