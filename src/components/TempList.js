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

import NumView from './NumView.js';

export default {
    name: 'TempList',
    components: {
        NumView,
    },

    data() {
        return {
            weather: {
              icon: '',
            },
            temp: {
              in: '',
              out: '',
              feels: '',
              min: '',
              max: '',
            },
            humidity: {
              in: '',
              out: '',
            },
            wind: {
              deg: '',
              speed: '',
            },
            time: {
              sunset: '',
              sunrise: '',
              now: '',
            },
            battery: {
              icon: '',
              percent: '',
            },
        };
    },

    methods: {
        getIcon(code, now, sunrise, sunset) {
            const icon = icons.find(elem => elem.regex.test(code)).value
            const day = now > sunrise && now < sunset
            return 'fas fa-' + (typeof icon === 'function' ? icon(day) : icon)
        },

        getTempIcon(temp) {
            if (temp > 35) return 'fas fa-thermometer-full'
            if (temp > 25) return 'fas fa-thermometer-three-quarters'
            if (temp > 15) return 'fas fa-thermometer-half'
            if (temp > 5) return 'fas fa-thermometer-quarter'
            return 'fas fa-thermometer-empty'
        },

        getBatteryIcon(usb, bat) {
            if (usb === '1') return 'fas fa-battery-bolt'
            if (bat > 90) return 'fas fa-battery-full'
            if (bat > 65) return 'fas fa-battery-three-quarters'
            if (bat > 35) return 'fas fa-battery-half'
            if (bat > 10) return 'fas fa-battery-quarter'
            return 'fas fa-battery-empty'
        },

        getBatteryPercent(bat, min, max) {
            return 100 * (bat - min) / (max - min)
        },
    },

    created() {
        const urlParams = new URLSearchParams(window.location.search);
        return fetch('https://api.openweathermap.org/data/2.5/weather?id=3118848&APPID=999f7d104881fc770d5a845d5c0ccfe7&units=metric')
        .then(res => res.json()
          .then(r => {
            this.weather.icon = this.getIcon(r.weather[0].id, r.dt, r.sys.sunrise, r.sys.sunset);
            this.temp.out = r.main.temp;
            this.temp.feels = r.main.feels_like;
            this.temp.min = r.main.temp_min;
            this.temp.max = r.main.temp_max;
            this.humidity.out = r.main.humidity, ' ';
            this.wind.deg = (r.wind.deg || 0) - 45;
            this.wind.speed = r.wind.speed;
            this.time.sunrise = r.sys.sunrise;
            this.time.sunset = r.sys.sunset;
            this.time.now = new Date() / 1000;
            this.temp.in = urlParams.get('temp');
            this.humidity.in = urlParams.get('hum');
            this.battery.percent = urlParams.get('bat') * 100, ' ';
            this.battery.icon = this.getBatteryIcon(urlParams.get('usb'), this.getBatteryPercent(urlParams.get('bat'), 2.5, 5));
        }));

    },

    template: `



    <div class="container">
      <div class="icon-temp">
          <div class="icon"><i v-bind:class="weather.icon"></i></div>
          <div class="temContainer">
              <div class="temp">

                <num-view v-bind:value="temp.out"></num-view>
              </div>
              <div class="feels_like">{{temp.feels}}</div>
          </div>
      </div>
      
      <div class="temp_min"></div>
      <div class="temp_max"></div>
      <div class="humidity"></div>
      <div class="wind">
          <div class="wind-deg"></div>
          <div class="wind-speed"></div>
      </div>
      <div class="sunrise">{{time.sunrise | timeES}}</div>
      <div class="sunset">{{time.sunset | timeES}}</div>
      <div class="date">{{time.now | timeES}}</div>

      <div class="in_temp"></div>
      <div class="in_humidity"></div>
      <div class="battery"></div>
    </div>
  `,
};