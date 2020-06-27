import { LitElement, html, css } from 'lit-element';
import './elements/WeatherIcon';
import './elements/BatteryIcon';
import './elements/NumberComp';
import './elements/TimeComp';
import './elements/WindComp';

export class WeatherApp extends LitElement {

  static get properties() {
    return {
      urlParams: {
        attribute: false,
        type: URLSearchParams
      },
      weatherToken: { type: String },
      weather: {
        attribute: false,
        type: Object
      },
    };
  }

  async firstUpdated() {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${this.weatherToken}&units=metric`)
        .then(r => r.json())
        .then(async data => {
          this.weather = data;
          console.log(this.weather)
        });
  }

  constructor() {
    super();
    this.urlParams = new URLSearchParams(window.location.search);
  }

  static get styles() {
    return css`
      :host {
        background: url(../imgs/house.png) no-repeat;
        display: block;
        width: 128px;
        height: 296px;
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: 16px 80px 40px 25px 25px 30px 20px 30px 30px;
        grid-template-areas: 
          "clock battery"
          "weather-icon weather-icon"
          "sunrise sunset"
          "temp-out temp-max"
          "temp-out temp-min"
          "wind hum-out"
          "ceil ceil"
          "temp-in ."
          "temp-in hum-in";
      }    
      .clock { grid-area: clock }
      .battery { grid-area: battery; justify-self: end;}
      .weather-icon { grid-area: weather-icon; justify-self: center; }
      .sunrise { grid-area: sunrise }
      .sunset { grid-area: sunset }
      .temp-out { grid-area: temp-out }
      .temp-max { grid-area: temp-max; justify-self: end;}
      .temp-min { grid-area: temp-min; justify-self: end;}
      .hum-out { grid-area: hum-out; justify-self: end;}
      .wind { grid-area: wind }
      .temp-in { grid-area: temp-in }
      .hum-in { grid-area: hum-in; justify-self: end;}
    `;
  }

  render() {
    return !this.weather ? html`loading...` : html`
      
        
        <time-comp
          class="clock"
          align="start">
        </time-comp>
        
        <battery-icon
          class="battery"
          bat="${this.urlParams.get('bat')}"
          ?usb="${this.urlParams.get('usb') === "true"}">
        </battery-icon>
        
        
        <weather-icon 
          class="weather-icon"
          weatherId="${this.weather.weather[0].id}" 
          itsDay="${this.weather.dt > this.weather.sys.sunrise && this.weather.dt < this.weather.sys.sunset}">
        </weather-icon>
    
        <time-comp
            class="sunrise"
            value="${this.weather.sys.sunrise}"
            icon="sunrise"
            align="center">
        </time-comp>
        <time-comp
            class="sunset"
            value="${this.weather.sys.sunset}"
            icon="sunset"
            align="center">
          </time-comp>
          
        <number-comp 
          class="temp-out"
          value="${this.weather.main.temp}" 
          size="big">
        </number-comp>
        
          <number-comp 
            class="temp-max"
            value="${this.weather.main.temp_max}" 
            size="medium"
            icon="temp-max">
          </number-comp>
          <number-comp 
            class="temp-min"
            value="${this.weather.main.temp_min}" 
            size="medium"
            icon="temp-min">
          </number-comp>
   
        <number-comp 
          class="hum-out"
          value="${this.weather.main.humidity}" 
          size="medium"
          icon="hum-out"
          iconSize="big">
        </number-comp> 
   
        <wind-comp
          class="wind"
          velocity="${this.weather.wind.speed}"
          angle="${this.weather.wind.deg}">
        </wind-comp>

        <number-comp 
          class="temp-in"
          value="${this.urlParams.get('temp')}" 
          size="big"
          color="white">
        </number-comp>

        <number-comp 
          class="hum-in"
          value="${this.urlParams.get('hum')}" 
          size="medium"
          icon="hum-in"
          color="white">
        </number-comp>
    `;
  }
}

customElements.define('weather-app', WeatherApp);