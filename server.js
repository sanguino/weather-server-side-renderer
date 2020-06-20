const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const fs = require('fs')
PNG = require("pngjs").PNG;

const WIDTH = 128
const HEIGHT = 296

const puppeteerOptions = process.env.NODE_ENV === 'production' ? {
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--headless', '--disable-gpu']
} : {};

function calculatePizels(screenshot) {
    return new Promise( (resolve, reject)=> {
        new PNG().parse(screenshot, function (error, pixels) {
            error && reject(error);
            const pixelsData = []
            let pixelsDataByte = ''
            for (let i = 0; i < pixels.data.length; i += 4) {
                pixelsDataByte += !!pixels.data[i]? '1': '0'
                if (pixelsDataByte.length === 8) {
                    pixelsData.push(parseInt(pixelsDataByte, 2))
                    pixelsDataByte = ''
                }
            }
            return resolve(pixelsData.toString())
        });
    })
}

async function renderPixels(temp, hum, bat, usb) {
    const browser = await puppeteer.launch(puppeteerOptions)
    const page = await browser.newPage()
    await page.setViewport({ width: WIDTH, height: HEIGHT })
    await page.goto(`http://localhost:3223/?temp=${temp}&hum=${hum}&bat=${bat}&usb=${usb}`)
    //await page.waitForResponse(response => response.ok())
    //await page.waitForSelector('weather-app').shadowRoot
    await page.waitFor(1000)
    const pixels = await page.screenshot()
    await browser.close()
    return pixels
}

app.use('/', express.static('public'))

app.get('/api', async (req, res) => {

    const pixels = await renderPixels(req.query.temp, req.query.hum, req.query.bat, req.query.usb)
    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        width: WIDTH,
        height: HEIGHT,
        tick: (60 - new Date().getSeconds())*1000,
        data: await calculatePizels(pixels)
    })
})

app.get('/test', async (req, res) => {

    const pixels = await renderPixels(req.query.temp, req.query.hum, req.query.bat, req.query.usb)
    const img = Buffer.from(pixels, 'binary');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
})

app.listen(3223)