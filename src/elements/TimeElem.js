import { LitElement, html, css } from 'lit-element';
import './FasIcon'

export class TimeElem extends LitElement {

  static get properties() {
    return {
      value: {type: Number},
      icon: {type: String},
      iconSize: {type: String},
      size: {type: String},
      end: {type: String}
    };
  }

  get time() {
    return new Date(this.value * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: 'Concert One';
        line-height:18px;
      }
      .time.big {
        font-size: 55px;
        line-height: 42px;
        padding-bottom: 5%;
      }
      .time.medium {
        font-size: 30px;
        line-height: 22px;
      }
      .time.small {
        font-size: 18px;
        line-height: 18px;
      }
      
      .icon.big {
        font-size: 24px;
        line-height: 24px;
      }
      .icon.medium {
        font-size: 18px;
        line-height: 18px;
      }
      .icon.small {
        font-size: 12px;
        line-height: 12px;
      }
    `;
  }

  render() {
    return html`
    <div class="time ${this.size}">${this.time}</div>
    <fas-icon icon="${this.icon}" class="icon ${this.iconSize || this.size}"></fas-icon>
    ${this.end}
    `;
  }
}

customElements.define('time-elem', TimeElem);