const puppeteer = require('puppeteer')

async function getTwoPoints({w1, w2, d1, d2}){

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.mapsdirections.info/ru/GPS-%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B0%D1%82%D1%8B-Google-%D0%9A%D0%B0%D1%80%D1%82%D0%B0%D1%85.html');

    const result = [];
    await page.focus('#marker-lat')
    await page.$eval('#marker-lat',(element, w1) =>{
        element.value = w1;
        const event = new Event('change');
        element.dispatchEvent(event);
    }, w1)
    await page.waitForSelector('#latlongmap > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > div > span:nth-child(7)');
    await page.focus('#marker-lng')
    await page.$eval('#marker-lng',(element, d1) =>{
        element.value = d1;
        const event = new Event('change');
        element.dispatchEvent(event);
    }, d1);
    await page.waitForSelector('#latlongmap > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > div > span:nth-child(7)');
    result[0] = await page.evaluate(() => {
        return document.querySelector('#latlongmap > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > div > span:nth-child(7)').textContent;

    })
    // поиск высоты второй точки


    await page.$eval('#marker-lat',(element, w2) =>{
        element.value = w2;
        const event = new Event('change');
        element.dispatchEvent(event);
    }, w2)
    await page.waitForSelector('#latlongmap > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > div > span:nth-child(7)');
    await page.focus('#marker-lng')
    await page.$eval('#marker-lng',(element, d2) =>{
        element.value = d2;
        const event = new Event('change');
        element.dispatchEvent(event);
    }, d2);
    await page.waitForSelector('#latlongmap > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > div > span:nth-child(7)');
    result[1] = await page.evaluate(() => {
        return document.querySelector('#latlongmap > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > div > span:nth-child(7)').textContent;

    })
    return result;

}


module.exports = getTwoPoints;