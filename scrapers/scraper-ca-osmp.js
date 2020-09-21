const puppeteer = require("puppeteer");

(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    );
    await page.goto(
      "https://www.asmp.org/find-a-photographer/?gmw_address%5B0%5D=Canada%20Place%2C%20Canada%20Place%2C%20Vancouver%2C%20BC%2C%20Canada&gmw_distance=200&gmw_faph_name&gmw_faph_sort=distance&gmw_faph_view=card&gmw_form=1&gmw_per_page=200&gmw_lat=49.2888248&gmw_lng=-123.1111209&gmw_px=pt&action=gmw_post",
      {
        waitUntil: "load",
        timeout: 0,
      }
    );

    await page.waitForSelector('[class="posts-list-wrapper"]');
    console.log("visited the page");

    const photographers = await page.$$('[class="posts-list-wrapper"] > li');
    // const photographers = await page.$$("div._3iz-t");
    // console.log(photographers);
    console.log(photographers.length);
    let i = 1;
    for (let photographer of photographers) {
      await page.waitForSelector(
        '[class="top-wrapper"] > [class="post-title"] >a'
      );
      console.log("Start of loop:", i);
      await page.waitForSelector('[class="post-title"]');
      i = i + 1;

      const Name = await photographer.$eval(
        '[class="post-title"]',
        (name) => name.innerText
      );

      const Location = await photographer.$eval(
        '[class="details-block__info"]',
        (location) => location.innerText
      );

      const Expertise = await photographer.$eval(
        '[class="details-block details-block--specialties"] > p',
        (skill) => skill.innerText.substring(12)
      );

      let phoneNo="";
      if ((await photographer.$('[class="phone"]')) !== null){
        phoneNo = await photographer.$eval('[class="phone"]', (PhNum) =>
        PhNum.innerText.substring(6)
      );
      }
       
      let Email="";
      if((await photographer.$('[class="email"]')) !== null){
        Email = await photographer.$eval('[class="email"]', (email) =>
        email.innerText.substring(7)
      );
      }
      
      console.log(photographer);
      console.log("Name:", Name);
      console.log("Location:", Location);
      console.log("Expertise:", Expertise);
      console.log("Phone NO:", phoneNo);
      console.log("Email:", Email);
     
    }
    console.log("*************Scraping is Completed***************************");
    await browser.close();
  } catch (ex) {
    console.log("Error Prompted", ex);
    await browser.close();
  }
})();
