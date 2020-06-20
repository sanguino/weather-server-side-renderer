import { LitElement, html, css } from 'lit-element';
import './elements/WeatherIcon';
import './elements/NumberElem';
import './elements/TimeElem';

export class WeatherApp extends LitElement {

  static get properties() {
    return {
      urlParams: { type: URLSearchParams },
      weather: { type: Object },
    };
  }

  async firstUpdated() {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?id=3118848&APPID=999f7d104881fc770d5a845d5c0ccfe7&units=metric`)
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

  get batIcon () {
    const usb = this.urlParams.get('usb');
    const bat = this.urlParams.get('bat');
    if (usb) return 'fas fa-battery-bolt';
    if (bat > 90) return 'fas fa-battery-full';
    if (bat > 65) return 'fas fa-battery-three-quarters';
    if (bat > 35) return 'fas fa-battery-half';
    if (bat > 10) return 'fas fa-battery-quarter';
    return 'fas fa-battery-empty';
  }
  static get styles() {
    return css`
      :host {
        display: block;
        width: 128px;
        height: 296px;
        margin: 0;
        background: white;
        position: relative; 
      }
      hr {
        margin: 6px 0;
      }
      section, footer {
        display: flex;
        justify-content: space-around;
      }
      footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        border-top: 2px solid black;
        align-items: center;
      }
      section.horizontal {
        width: 100%;
        justify-content: space-around;
        align-items: center;
      }
      section.vertical {
        flex-direction: column;
      }
      section.right {
        align-items: flex-end;
      }
      hr {
        border-color: black;
      }
    `;
  }

  render() {
    return !this.weather ? html`loading...` : html`
      <section>
        <weather-icon 
          weatherId="${this.weather.weather[0].id}" 
          itsDay="${this.weather.dt > this.weather.sys.sunrise && this.weather.dt < this.weather.sys.sunset}">
        </weather-icon>
      </section>
      
      <section class="horizontal">
        <number-elem 
          value="${this.weather.main.temp}" 
          size="big">
        </number-elem>
        
        <section class="vertical right">
          <number-elem 
            value="${this.weather.main.temp_max}" 
            size="medium"
            icon="temperature-up">
          </number-elem>
          <number-elem 
            value="${this.weather.main.temp_min}" 
            size="medium"
            icon="temperature-down">
          </number-elem>
        </section>  
      </section>
      <hr />  
      <section class="horizontal">
        <number-elem 
            value="${this.weather.main.humidity}" 
            size="medium"
            icon="humidity"
            iconSize="big">
          </number-elem> 
  
        <section class="vertical right">
          <time-elem
            value="${this.weather.sys.sunrise}"
            size="medium"
            icon="sunrise">
          </time-elem>
          <time-elem
            value="${this.weather.sys.sunset}"
            size="medium"
            icon="sunset">
          </time-elem>
        </section>
      </section>
      <section class="horizontal">
        <section>
          <fas-icon
            icon="location-arrow" 
            style="transform: rotate(${(this.weather.wind.deg||0) - 45}deg)">
          </fas-icon>
          <number-elem 
            value="${this.weather.wind.speed}" 
            size="medium"
            postIcon="km/h">
          </number-elem>
        </section>  
      </section>
      <hr />  
      <section class="horizontal">
        <number-elem 
          value="${this.urlParams.get('temp')}" 
          size="big">
        </number-elem>
        
        <section class="vertical right">
          <section class="horizontal">
            <fas-icon icon="temperature-high" class="icon big"></fas-icon>
            <fas-icon icon="house" class="icon big"></fas-icon>
          </section>
          <number-elem 
            value="${this.urlParams.get('hum')}" 
            size="medium"
            icon="humidity">
          </number-elem>
        </section>  
      </section>
      
      <footer>
        <time-elem
          size="medium">
        </time-elem>
        <number-elem 
          value="${this.urlParams.get('bat')}"
          postValue="%"
          size="small"
          iconSize="big"
          icon="${this.batIcon}">
        </number-elem>
      </footer>
    `;
  }
}

customElements.define('weather-app', WeatherApp);