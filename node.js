const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const app = express();

let WIDTH = 128;
let HEIGHT = 296;

app.get('/', async (req, res) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: WIDTH, height: HEIGHT })
    await page.goto(`file://${path.resolve('.')}/index.html?temp=${req.query.temp}&hum=${req.query.hum}&bat=${req.query.bat}&usb=${req.query.usb}`);
    await page.waitForResponse(response => response.ok())
    const pixels = await page.screenshot()
    await browser.close()

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

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        width: WIDTH,
        height: HEIGHT,
        tick: 1000,//(60 - new Date().getSeconds())*1000,
        data: uint8.toString()
    });
});

app.listen(3223);
