import { LitElement, html, css } from 'lit-element';

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
];

export class WeatherIcon extends LitElement {

  /*
  constructor() {
    super();
    const list = [ 'thunderstorm', 'thunderstorm-sun', 'thunderstorm-moon', 'cloud-drizzle', 'cloud-sun-rain', 'cloud-moon-rain', 'cloud-hail', 'cloud-showers-heavy', 'cloud-showers', 'snowflake', 'cloud-hail', 'cloud-hail-mixed', 'cloud-sleet', 'cloud-snow', 'snowflakes', 'smoke', 'smog', 'smog', 'volcano', 'tornado', 'fog', 'sun', 'moon', 'moon-stars', ' stars', 'sun-cloud', 'moon-cloud', 'cloud-sun', 'cloud-moon', 'clouds-sun', 'clouds-moon', 'clouds'];
    setInterval(() => {
      this.icon = list.shift();
      list.push(this.icon)
    }, 2000);
  }
  */

  static get properties() {
    return {
      weatherId: {type: Number},
      itsDay: {type: Boolean},
      icon: {type: String}
    };
  }

  get icon() {
    const icon = icons.find(elem => elem.regex.test(this.weatherId)).value;
    return (typeof icon === 'function' ? icon(this.itsDay) : icon)
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      i.fas {
         font-size: 80px;
         line-height: 80px;
         text-align: center;
      }
    `;
  }

  render() {
    return html`
    <link rel="stylesheet" href="./css/fontawesome.min.css">
    <link rel="stylesheet" href="./css/solid.min.css">
    <i class="fas fa-${this.icon}"></i>`;
  }
}

customElements.define('weather-icon', WeatherIcon);