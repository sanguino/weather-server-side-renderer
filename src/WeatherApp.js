import { LitElement, html, css } from 'lit-element';
import './layouts/WeatherLayout';
import './layouts/ErrorLayout';

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
    await fetch(`https://api.openweathermap.org/data/2.5/onecall?lon=-3.87&lat=40.49&APPID=${this.weatherToken}&units=metric`)
        .then(r => r.json())
        .then(async data => {
          this.weather = data;
        });
  }

  constructor() {
    super();
    this.urlParams = new URLSearchParams(window.location.search);
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 128px;
        height: 296px;
      }
    `;
  }


  render() {
      return this.urlParams.get('error') ?
        html`<error-layout></error-layout>` :
        html`<weather-layout .weather="${this.weather}" .urlParams="${this.urlParams}"></weather-layout>`;
  }
}

customElements.define('weather-app', WeatherApp);