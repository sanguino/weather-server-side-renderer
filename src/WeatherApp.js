import { LitElement, html, css } from 'lit-element';

export class WeatherApp extends LitElement {

  constructor() {
    super();
    this.urlParams = new URLSearchParams(window.location.search);
  }
  static get styles() {
    return css`
      :host {
        display: flex;
      }

      main {
        width: 128px;
        height: 296px;
        margin: 0;
        background: white;
      }
    `;
  }

  render() {
    return html`
      <main>
        
        <h1>weather app</h1>
        <p>hello weather!</p>
        <p>temp: ${this.urlParams.get('temp')}</p>
        <p>hum: ${this.urlParams.get('hum')}</p>
        <p>bat: ${this.urlParams.get('bat')}</p>
        <p>usb: ${this.urlParams.get('usb')}</p>
      </main>
    `;
  }
}

customElements.define('weather-app', WeatherApp);