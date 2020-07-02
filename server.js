const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
PNG = require("pngjs").PNG;

const WIDTH = 128
const HEIGHT = 296
const THRESHOLD = 100

const puppeteerOptions = process.env.NODE_ENV === 'production' ? {
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
} : {};

function calculatePixels(screenshot) {
    return new Promise( (resolve, reject)=> {
        new PNG().parse(screenshot, function (error, pixels) {
            error && reject(error);
            const pixelsData = []
            let pixelsDataByte = ''
            for (let i = 0; i < pixels.data.length; i += 4) {
                pixelsDataByte += pixels.data[i] > THRESHOLD ? '1': '0'
                if (pixelsDataByte.length === 8) {
                    pixelsData.push(parseInt(pixelsDataByte, 2))
                    pixelsDataByte = ''
                }
            }
            return resolve(pixelsData.toString())
        });
    })
}

async function renderPixels(error, temp, hum, bat, usb) {
    const browser = await puppeteer.launch(puppeteerOptions)
    const page = await browser.newPage()
    await page.setViewport({width: WIDTH, height: HEIGHT})
    const url = `http://localhost:3223/?${error ? `error=${error}` : `temp=${temp}&hum=${hum}&bat=${bat}&usb=${usb}`}`;
    await page.goto(url)
    await page.waitFor(1000)
    const pixels = await page.screenshot()
    await browser.close()
    return pixels
}

app.use('/', express.static('public'))

app.get('/api', async (req, res) => {

    const pixels = await renderPixels(req.query.error, req.query.temp, req.query.hum, req.query.bat, req.query.usb)
    res.header("Access-Control-Allow-Origin", "*")
    res.json({
        width: WIDTH,
        height: HEIGHT,
        tick: (60 - new Date().getSeconds())*1000,
        data: await calculatePixels(pixels)
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

app.get('/characters', async (req, res) => {

    const characters = ['char_1', 'char_2', 'char_3', 'char_4', 'char_5', 'char_6', 'char_7', 'char_8', 'char_9', 'char_0', 'char_semi_colon'];

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({width: WIDTH, height: HEIGHT})
    const url = `http://localhost:3223/characters.html`;
    await page.goto(url)
    await page.waitFor(1000)

    const result = {}
    for (const char of characters) {
        const elem = await page.$(`span#${char}`);
        const screenShot = await elem.screenshot();
        result[char] = await calculatePixels(screenShot);
    }

    await browser.close()
    res.header("Access-Control-Allow-Origin", "*")
    res.json(result)
})

app.listen(3223)