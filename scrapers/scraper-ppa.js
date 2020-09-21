const puppeteer = require("puppeteer");
(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    );
    await page.goto("https://www.ppa.com/faces-of-ppa", {
      waitUntil: "networkidle2",
    });
    console.log("Page Loaded");

    await page.waitForSelector(
      '[class="load_more btn btn-gray btn-block mx-auto ppa-14 my-5"] > [class="ppa-medium"]'
    );

    while (
      (await page.$(
        '[class="load_more btn btn-gray btn-block mx-auto ppa-14 my-5"] > [class="ppa-medium"]'
      )) !== null
    ) {
      await page.waitForTimeout(6000);
      await page.click(
        '[class="load_more btn btn-gray btn-block mx-auto ppa-14 my-5"] > [class="ppa-medium"]'
      );

      await page.waitForSelector('[id="results"]');

      const photographers = await page.$$(
        '[class="col-xl-3 col-lg-4 col-md-6 text-center p-0 mb-5"]'
      );

      for (photographer of photographers) {
        const ProfileURL = await photographer.$eval(
          '[class="col-xl-3 col-lg-4 col-md-6 text-center p-0 mb-5"] > a ',
          (url) => url.href
        );

        const Name = await photographer.$eval(
          '[class="caption"] > strong ',
          (name) => name.innerText
        );

        console.log(photographer);
        console.log("Name:", Name);
        console.log("URL:", ProfileURL);
      }
    }

    console.log(
      "*******************Web Scraping this web site is completed*************************"
    );
    await browser.close();
  } catch (error) {
    console.log("Error at:", error);
    await browser.close();
  }
})();
