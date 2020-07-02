import { LitElement, html, css } from 'lit-element';
import '../elements/HttpError';

export class ErrorLayout extends LitElement {

  static get styles() {
    return css`
      :host {
        background: url(../imgs/house.png) no-repeat;
        width: 128px;
        height: 296px;
        display:block;
    `;
  }

  render() {
    return html`<http-error error="wifi"></http-error>`;
  }
}

customElements.define('error-layout', ErrorLayout);