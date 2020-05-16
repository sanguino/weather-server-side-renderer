const icons = [
    { regex: /^2\d2$/, value: 'thunderstorm' },
    { regex: /^2\d\d$/, value: day => day ? 'thunderstorm-sun' : 'thunderstorm-moon' },
    { regex: /^3\d\d$/, value: 'cloud-drizzle' },
    { regex: /^50[012]$/, value: day => day ? 'cloud-sun-rain' : 'cloud-moon-rain' },
    { regex: /^511$/, value: 'cloud-hail' },
    { regex: /^522|50[34]|531$/, value: 'cloud-showers-heavy' },
    { regex: /^5\d\d$/, value: 'cloud-showers' },
    { regex: /^600$/, value: 'snowflake' },
    { regex: /^61[12]$/, value: 'cloud-hail' },
    { regex: /^613$/, value: 'cloud-hail-mixed' },
    { regex: /^61\d$/, value: 'cloud-sleet' },
    { regex: /^62\d$/, value: 'cloud-snow' },
    { regex: /^6\d\d$/, value: 'snowflakes' },
    { regex: /^711$/, value: 'smoke' },
    { regex: /^721$/, value: 'smog' },
    { regex: /^731$/, value: 'smog' },
    { regex: /^762$/, value: 'volcano' },
    { regex: /^781$/, value: 'tornado' },
    { regex: /^7\d\d$/, value: 'fog' },
    { regex: /^800$/, value: day => day ? 'sun' : (Math.random() > 0.3 ? 'moon' : (Math.random() > 0.5 ? 'moon-stars' : ' stars')) },
    { regex: /^801$/, value: day => day ? 'sun-cloud' : 'moon-cloud' },
    { regex: /^802$/, value: day => day ? 'cloud-sun' : 'cloud-moon' },
    { regex: /^803$/, value: day => day ? 'clouds-sun' : 'clouds-moon' },
    { regex: /^8\d\d$/, value: 'clouds' },
]

function formatTime(ts) {
    return new Date(ts * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

function formatNum(num, end, bigClass = 'big', smallClass = 'small') {
    const big = Math.floor(num);
    const small = Math.round(10 * (num - big));
    return `<spam class="${bigClass}">${big}.</spam><spam class="${smallClass}">${small}</spam><spam class="${end === 'º' ? bigClass : smallClass} decorator">${end}</spam>`
}

function getIcon(code, now, sunrise, sunset) {
    const icon = icons.find(elem => elem.regex.test(code)).value
    const day = now > sunrise && now < sunset
    return 'fas fa-' + (typeof icon === 'function' ? icon(day) : icon)
}

function getTempIcon(temp) {
    if (temp > 35) return 'fas fa-thermometer-full'
    if (temp > 25) return 'fas fa-thermometer-three-quarters'
    if (temp > 15) return 'fas fa-thermometer-half'
    if (temp > 5) return 'fas fa-thermometer-quarter'
    return 'fas fa-thermometer-empty'
}

function getBatteryIcon(usb, bat) {
    if (usb === '1') return 'fas fa-battery-bolt'
    if (bat > 90) return 'fas fa-battery-full'
    if (bat > 65) return 'fas fa-battery-three-quarters'
    if (bat > 35) return 'fas fa-battery-half'
    if (bat > 10) return 'fas fa-battery-quarter'
    return 'fas fa-battery-empty'
}

function getBatteryPercent(bat, min, max) {
    return 100 * (bat - min) / (max - min)
}

fetch('https://api.openweathermap.org/data/2.5/weather?id=3118848&APPID=999f7d104881fc770d5a845d5c0ccfe7&units=metric').then(r => r.json()).then(r => {

    document.querySelector('.icon').innerHTML = `<i class="${getIcon(r.weather[0].id, r.dt, r.sys.sunrise, r.sys.sunset)}"></i>`
    document.querySelector('.temp').innerHTML = `${formatNum(r.main.temp, 'º', 'bigger', 'big')} `
    document.querySelector('.feels_like').innerHTML = `<i class="fas fa-hand-paper"></i>${formatNum(r.main.feels_like, 'º')}`
    document.querySelector('.temp_min').innerHTML = `${formatNum(r.main.temp_min, 'º')}<i class="fas fa-temperature-up"></i>`
    document.querySelector('.temp_max').innerHTML = `${formatNum(r.main.temp_max, 'º')}<i class="fas fa-temperature-down"></i>`
    document.querySelector('.humidity').innerHTML = `${formatNum(r.main.humidity, ' ')}<i class="fas fa-humidity"></i>`
    document.querySelector('.wind-deg').innerHTML = `<i class="fas fa-location-arrow" style="transform: rotate(${(r.wind.deg||0) - 45}deg)"></i>`
    document.querySelector('.wind-speed').innerHTML = formatNum(r.wind.speed, 'km/h')
    document.querySelector('.sunrise').innerHTML = `<i class="fas fa-sunrise"></i>${formatTime(r.sys.sunrise)}`
    document.querySelector('.sunset').innerHTML = `<i class="fas fa-sunset"></i>${formatTime(r.sys.sunset)}`
    document.querySelector('.date').textContent = formatTime(new Date() / 1000) //r.dt)

    const urlParams = new URLSearchParams(window.location.search);
    document.querySelector('.in_temp').innerHTML = `${formatNum(urlParams.get('temp'), 'º', 'bigger', 'big')} `
    document.querySelector('.in_humidity').innerHTML = `${formatNum(urlParams.get('hum'), ' ')}<i class="fas fa-humidity"></i>`
    document.querySelector('.battery').innerHTML = `${formatNum(urlParams.get('bat')*100, ' ')}<i class="${getBatteryIcon(urlParams.get('usb'), getBatteryPercent(urlParams.get('bat'), 2.5, 5))}"></i>`
    document.querySelector('.container').innerHTML = `${document.querySelector('.container').innerHTML}<div class="rendered"></div>`
});
