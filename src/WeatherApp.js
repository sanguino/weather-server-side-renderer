import { LitElement, html, css } from 'lit-element';

export class WeatherApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
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
      </main>
    `;
  }
}

customElements.define('weather-app', WeatherApp);