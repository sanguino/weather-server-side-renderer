const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const app = express();

const WIDTH = 128;
const HEIGHT = 296;

function calculatePizels(pixels) {
    let pixelsData = [];
    let pixelsDataByte = '';
    for (let i = 0; i < pixels.length; i += 4) {
        pixelsDataByte += !!pixels[i]? '1': '0'

        if (pixelsDataByte.length === 8) {
            pixelsData.push(parseInt(pixelsDataByte, 2))
            pixelsDataByte = ''
        }
    }
    const buffer = new ArrayBuffer(pixelsData.length);
    const uint8 = new Uint8Array(buffer);
    uint8.set(pixelsData)
    return uint8.toString();
}

async function renderPixels(temp, hum, bat, usb) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: WIDTH, height: HEIGHT })
    await page.goto(`file://${path.resolve('.')}/index.html?temp=${temp}&hum=${hum}&bat=${bat}&usb=${usb}`);
    //  await page.setContent(htmlContent, {waitUntil: 'networkidle2'});
    await page.waitForResponse(response => response.ok())
    const pixels = await page.screenshot()
    await browser.close()
    return pixels;
}

app.get('/', async (req, res) => {
    
    const pixels = await renderPixels(req.query.temp, req.query.hum, req.query.bat, req.query.usb)
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        width: WIDTH,
        height: HEIGHT,
        tick: 1000,//(60 - new Date().getSeconds())*1000,
        data: calculatePizels(pixels)
    });
});

app.listen(3223);
