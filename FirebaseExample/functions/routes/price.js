const routes = require('express').Router();

routes.get('/getprice', (request, response)=>{
    response.end('sss');
    const puppeteer = require('puppeteer');
    var theItem;
    theItem = puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] }).then(async browser => {
 
        const page = await browser.newPage();
        await page.goto("https://www.amazon.com/Apple-iPhone-XR-Fully-Unlocked/dp/B07P6Y7954");
        await page.waitForSelector('body');
 
        var productInfo = await page.evaluate(() => {
 
            /* Get product title */
            let title = document.body.querySelector('#productTitle').innerText;
 
            /* Get review count */
            let reviewCount = document.body.querySelector('#acrCustomerReviewText').innerText;
            let formattedReviewCount = reviewCount.replace(/[^0-9]/g,'').trim();
 
            /* Get and format rating */
            let ratingElement = document.body.querySelector('.a-icon.a-icon-star').getAttribute('class');
            let integer = ratingElement.replace(/[^0-9]/g,'').trim();
            let parsedRating = parseInt(integer) / 10;
 
            /* Get availability */
            let availability = document.body.querySelector('#availability').innerText; 
            let formattedAvailability = availability.replace(/[^0-9]/g, '').trim();
 
            /* Get list price */
            let listPrice = document.body.querySelector('.priceBlockStrikePriceString').innerText;
 
            /* Get price */
            let price = document.body.querySelector('#priceblock_ourprice').innerText;
 
            /* Get product description */
            let description = document.body.querySelector('#renewedProgramDescriptionAtf').innerText;
 
            /* Get product features */
            let features = document.body.querySelectorAll('#feature-bullets ul li');
            let formattedFeatures = [];
 
            features.forEach((feature) => {
                formattedFeatures.push(feature.innerText);
            });
 
            /* Get comparable items */
            let comparableItems = document.body.querySelectorAll('#HLCXComparisonTable .comparison_table_image_row .a-link-normal');                
            formattedComparableItems = [];
 
            comparableItems.forEach((item) => {
                formattedComparableItems.push("https://amazon.com" + item.getAttribute('href'));
            });
 
 
            var product = { 
                "title": title,
                "rating": parsedRating,
                "reviewCount" : formattedReviewCount,
                "listPrice": listPrice,
                "price": price,
                "availability": formattedAvailability,
                "description": description,
                "features": formattedFeatures,
                "comparableItems": formattedComparableItems
            };
            return product;
 
        });
 
            console.log(productInfo);
            var product = {
                "title": productInfo['title'],
                "price": productInfo['price'],
            }
            await browser.close();
            result = product;
            response.send(product);
        }).catch(function(error) {
            console.error(error);
    });
 });
  
module.exports = routes;