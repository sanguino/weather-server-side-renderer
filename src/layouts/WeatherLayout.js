import { LitElement, html, css } from 'lit-element';
import '../elements/WeatherIcon';
import '../elements/BatteryIcon';
import '../elements/NumberComp';
import '../elements/TimeComp';
import '../elements/WindComp';

export class WeatherLayout extends LitElement {

  static get properties() {
    return {
      urlParams: {
        type: Object
      },
      weather: {
        type: Object
      },
    };
  }

  static get styles() {
    return css`
      :host {
        background: url(../imgs/house.png) no-repeat;
        width: 128px;
        height: 296px;
        display: grid;
        grid-template-columns: 75px auto;
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
 
      .clock, .battery, .weather-icon, .sunrise, .sunset, .temp-max, .temp-min, .hum-out, .wind, .hum-in {
        padding: 1px;
      }

      .clock { grid-area: clock }
      .battery { grid-area: battery; justify-self: end; padding: 2px}
      .weather-icon { grid-area: weather-icon; justify-self: center; }
      .sunrise { grid-area: sunrise; padding: 4px 0 0 6px; width: 50px }
      .sunset { grid-area: sunset; padding: 4px 0 0 0; width: 50px }
      .temp-out { grid-area: temp-out; padding: 10px 0 0 4px; }
      .temp-max { grid-area: temp-max; justify-self: end; padding-top: 10px; }
      .temp-min { grid-area: temp-min; justify-self: end; padding-bottom: 2px; }
      .hum-out { grid-area: hum-out; justify-self: end; }
      .wind { grid-area: wind }
      .temp-in { grid-area: temp-in; padding: 10px 0 0 4px; }
      .hum-in { grid-area: hum-in; justify-self: end; padding-bottom: 8px; }
      
      http-error.weather-icon { padding: 0 }
    `;
  }

  get renderHeader() {
    return html`
      <time-comp
        class="clock"
        align="start">
      </time-comp>
      
      <battery-icon
        class="battery"
        bat="${this.urlParams.get('bat')}"
        ?usb="${this.urlParams.get('usb') === "true"}">
      </battery-icon>
    `;
  }

  get renderWeather() {
    const forecast = this.weather.hourly[new Date(this.weather.current.dt + '000').getMinutes() > 30 ? 2 : 1];
    console.log(this.weather.daily[0])
    return html `
      <weather-icon 
        class="weather-icon"
        weatherId="${forecast.weather[0].id}" 
        itsDay="${forecast.dt > this.weather.current.sunrise && forecast.dt < this.weather.current.sunset}">
      </weather-icon>
  
      <time-comp
          class="sunrise"
          value="${this.weather.current.sunrise}"
          icon="sunrise"
          align="center">
      </time-comp>
      <time-comp
          class="sunset"
          value="${this.weather.current.sunset}"
          icon="sunset"
          align="center">
        </time-comp>
        
      <number-comp 
        class="temp-out"
        value="${this.weather.current.temp}" 
        size="big">
      </number-comp>
      
        <number-comp 
          class="temp-max"
          value="${this.weather.daily[0].temp.max}" 
          size="medium"
          icon="temp-max">
        </number-comp>
        <number-comp 
          class="temp-min"
          value="${this.weather.daily[0].temp.min}" 
          size="medium"
          icon="temp-min">
        </number-comp>
 
      <number-comp 
        class="hum-out"
        value="${this.weather.current.humidity}" 
        size="medium"
        icon="hum-out"
        iconSize="big">
      </number-comp> 
 
      <wind-comp
        class="wind"
        velocity="${this.weather.current.wind_speed}"
        angle="${this.weather.current.wind_deg}">
      </wind-comp>
    `;
  }

  get renderInHouse() {
    return html`
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

  get renderError() {
    return html`
      <http-error 
        error="net"
        class="weather-icon">
      </http-error>
    `;
  }

  render() {
    return html`
      ${this.renderHeader}
      ${this.weather ? this.renderWeather : this.renderError}
      ${this.renderInHouse}
    `;
  }
}

customElements.define('weather-layout', WeatherLayout);