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
        new PNG().parse(screenshot, function (error, png) {
            error && reject(error);
            const pixelsData = []
            let pixelsDataByte = ''
            for (let i = 0; i < png.data.length; i += 4) {
                pixelsDataByte += png.data[i] > THRESHOLD ? '1': '0'
                if (pixelsDataByte.length === 8) {
                    pixelsData.push(parseInt(pixelsDataByte, 2))
                    pixelsDataByte = ''
                }
            }
            console.log(pixelsData)
            return resolve({
                data: pixelsData.toString(),
                width: png.width,
                height: png.height,
            })
        });
    })
}

async function createPuppeteer(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({width: WIDTH, height: HEIGHT})
    await page.goto(url)
    await page.waitFor(1000)
    return {browser, page}
}

app.use('/', express.static('public'))

app.get(['/api/weather', '/api/error', '/api/test'], async (req, res) => {
    const url = `http://localhost:3223/?${req.path.endsWith('error') ? `error=true` : `temp=${req.query.temp}&hum=${req.query.hum}&bat=${req.query.bat}&usb=${req.query.usb}`}`
    const {browser, page} = await createPuppeteer(url);
    const pixels = await page.screenshot()
    await browser.close()
    res.header("Access-Control-Allow-Origin", "*")

    if (!req.path.endsWith('test')) {
        res.json({
            width: WIDTH,
            height: HEIGHT,
            tick: (60 - new Date().getSeconds())*1000,
            data: (await calculatePixels(pixels)).data,
        })
    } else {
        const img = Buffer.from(pixels, 'binary');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    }

})

app.get('/api/characters', async (req, res) => {

    const characters = ['char_1', 'char_2', 'char_3', 'char_4', 'char_5', 'char_6', 'char_7', 'char_8', 'char_9', 'char_0', 'char_semi_colon'];
    const {browser, page} = await createPuppeteer(`http://localhost:3223/characters.html`);
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