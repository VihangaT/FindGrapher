const cron = require("node-cron");
let shell = require("shelljs");

cron.schedule("0 0 0/12 1 * * *",function(){
	let timestamp=Date.now();
    console.log("Scheduler Running:",Date);
    try {
        if(shell.exec("node scrapers/scraper-ppa.js").code !== 0){
            console.log("Something went wrong in scraper-ppa.js");
        }
        if(shell.exec("node scrapers/scraper-us-osmp.js").code !== 0){
            console.log("Something went wrong scraper-us-osmp.js");
        }
        if(shell.exec("node scrapers/scraper-shopify.js").code !== 0){
            console.log("Something went wrong scraper-shopify.js");
        }
        if(shell.exec("node scrapers/scraper-PeoperHour.js").code !== 0){
            console.log("Something went wrong scraper-PeoperHour.js");
        }
        if(shell.exec("node scrapers/scraper-freelancerclub.js").code !== 0){
            console.log("Something went wrong scraper-freelancerclub.js");
        }
        if(shell.exec("node scrapers/scraper-az-us.js").code !== 0){
            console.log("Something went wrong scraper-az-us.js");
        }
        if(shell.exec("node scrapers/scraper-bd.js").code !== 0){
            console.log("Something went wrong scraper-bd.js");
        }
        if(shell.exec("node scrapers/scraper-ca-osmp.js").code !== 0){
            console.log("Something went wrong scraper-ca-osmp.js");
        }
        if(shell.exec("node scrapers/scraper-ca-us.js").code !== 0){
            console.log("Something went wrong scraper-ca-us.js");
        }
        if(shell.exec("node scrapers/scraper-co-ud.js").code !== 0){
            console.log("Something went wrong scraper-co-ud.js");
        }
        if(shell.exec("node scrapers/scraper-dc.js").code !== 0){
            console.log("Something went wrong scraper-dc.js");
        }
        if(shell.exec("node scrapers/scraper-fl-us.js").code !== 0){
            console.log("Something went wrong scraper-fl-us.js");
        }
        if(shell.exec("node scrapers/scraper-ga-us.js").code !== 0){
            console.log("Something went wrong scraper-ga-us.js");
        }
        if(shell.exec("node scrapers/scraper-jfl-us.js").code !== 0){
            console.log("Something went wrong scraper-jfl-us.js");
        }
        if(shell.exec("node scrapers/scraper-kwi-us.js").code !== 0){
            console.log("Something went wrong scraper-kwi-us.js");
        }
        if(shell.exec("node scrapers/scraper-la-us.js").code !== 0){
            console.log("Something went wrong scraper-la-us.js");
        }
        if(shell.exec("node scrapers/scraper-NY-osamp.js").code !== 0){
            console.log("Something went wrong scraper-NY-osamp.js");
        }
        if(shell.exec("node scrapers/scraper-oc-us.js").code !== 0){
            console.log("Something went wrong scraper-oc-us.js");
        }
        if(shell.exec("node scrapers/scraper-oh-us.js").code !== 0){
            console.log("Something went wrong scraper-oh-us.js");
        }
        if(shell.exec("node scrapers/scraper-on-ca.js").code !== 0){
            console.log("Something went wrong scraper-on-ca.js");
        }
        if(shell.exec("node scrapers/scraper-or-us.js").code !== 0){
            console.log("Something went wrong scraper-or-us.js");
        }
        if(shell.exec("node scrapers/scraper-osmp2.js").code !== 0){
            console.log("Something went wrong scraper-osmp2.js");
        }
        if(shell.exec("node scrapers/scraper-ox.js").code !== 0){
            console.log("Something went wrong scraper-ox.js");
        }
        if(shell.exec("node scrapers/scraper-pl.js").code !== 0){
            console.log("Something went wrong scraper-pl.js");
        }
        if(shell.exec("node scrapers/scraper-pr-fr.js").code !== 0){
            console.log("Something went wrong scraper-pr-fr.js");
        }
        if(shell.exec("node scrapers/scraper-px-us.js").code !== 0){
            console.log("Something went wrong scraper-px-us.js");
        }
        if(shell.exec("node scrapers/scraper-QC-osmp.js").code !== 0){
            console.log("Something went wrong scraper-QC-osmp.js");
        }
        if(shell.exec("node scrapers/scraper-qu.js").code !== 0){
            console.log("Something went wrong scraper-qu.js");
        }
        if(shell.exec("node scrapers/scraper-re-fr.js").code !== 0){
            console.log("Something went wrong scraper-re-fr.js");
        }
        if(shell.exec("node scrapers/scraper-sd-us.js").code !== 0){
            console.log("Something went wrong scraper-sd-us.js");
        }
        if(shell.exec("node scrapers/scraper-sf-ca-us.js").code !== 0){
            console.log("Something went wrong scraper-sf-ca-us.js");
        }
        if(shell.exec("node scrapers/scraper-sw.js").code !== 0){
            console.log("Something went wrong scraper-sw.js");
        }
        if(shell.exec("node scrapers/scraper-to-ca.js").code !== 0){
            console.log("Something went wrong scraper-to-ca.js");
        }
        if(shell.exec("node scrapers/scraper-tx-us.js").code !== 0){
            console.log("Something went wrong scraper-tx-us.js");
        }
        if(shell.exec("node scrapers/scraper-to-us.js").code !== 0){
            console.log("Something went wrong scraper-to-us.js");
        }
        if(shell.exec("node scrapers/scraper-wa-us.js").code !== 0){
            console.log("Something went wrong scraper-wa-us.js");
        }
        if(shell.exec("node scrapers/scrapper-ch-ch1.js").code !== 0){
            console.log("Something went wrong scrapper-ch-ch1.js");
        }
        if(shell.exec("node scrapers/scrapper-ch-ch2.js").code !== 0){
            console.log("Something went wrong scrapper-ch-ch2.js");
        }
    } catch (error) {
        console.log("Error in scheduler",error);
    }finally{
        console.log("Sceduler will re-run in another 12 hours");
    }

    



    
})