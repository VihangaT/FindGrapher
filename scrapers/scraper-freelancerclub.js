const puppeteer = require("puppeteer");
(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    );
    await page.goto("https://freelancerclub.net/discover/freelancers/search", {
      waitUntil: "networkidle2",
    });
    console.log("Page Loaded");

    // const NXTbutton = await page.$(
    //     '[class="btn btn-primary btn-block show-filters"]'
    //   );
    const searchWord = "photographer";
    await page.waitForSelector('[class="CaptionCont SelectBox search"]');
    await page.click('[class="CaptionCont SelectBox search"] > span');
    //   await page.$eval('[class="CaptionCont SelectBox search"] > span', el => el.value,'photography');
    await page.type(
      '[class="CaptionCont SelectBox search"] > span',
      searchWord,
      { delay: 500 }
    );
    await page.click('[class="opt"]');
    // await NXTbutton.click();

    async function scrollToBottom(page) {
      const distance = 100; // should be less than or equal to window.innerHeight
      const delay = 100;
      while (
        await page.evaluate(
          () =>
            document.scrollingElement.scrollTop + window.innerHeight <
            document.scrollingElement.scrollHeight
        )
      ) {
        await page.evaluate((y) => {
          document.scrollingElement.scrollBy(0, y);
        }, distance);
        await page.waitForTimeout(delay);
      }
    }

    async function scrape() {
      await page.waitForSelector('[class="panel-body"]');
      console.log("Photographer are loaded");

      await scrollToBottom(page);
      const photographers = await page.$$('[class="panel-body"]');

      console.log("photographer count:", photographers.length);

      for (photographer of photographers) {
        const Name = await photographer.$eval(
          '[class="searchname"] > a ',
          (name) => name.innerText
        );

        const ProURL = await photographer.$eval(
          '[class="searchname"] > a ',
          (url) => url.href
        );

        let Location = "";
        if ((await photographer.$('[class="searchlocation"]')) !== null) {
          Location = await photographer.$eval(
            '[class="searchlocation"]',
            (location) => location.innerText
          );
        }

        let Price = "";

        if ((await photographer.$('[class="fa fa-clock"]')) !== null) {
          Price = await photographer.$eval(
            '[class="fa fa-clock"]',

            (price) => price.innerText
          );
        }

        let Rating = "";
        if ((await photographer.$('[class="hidden-xs"]')) !== null) {
          Rating = await photographer.$eval(
            '[class="hidden-xs"] > strong',
            (rating) => rating.innerText
          );
        }

        let Expertise = "";
        if ((await photographer.$('[class="searchdisciplines"]')) !== null) {
          Expertise = await photographer.$eval(
            '[class="searchdisciplines"]',
            (expertise) => expertise.innerText
          );
        }

        console.log(photographer);
        console.log("URL:", ProURL);
        console.log("Name:", Name);
        console.log("Expertise:", Expertise);
        console.log("Location:", Location);
        console.log("Price:", Price);
        console.log("Rating:", Rating);
      }
    }
    scrape();

    // await browser.close();
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await browser.close();
  }
})();
