import { LitElement, html, css } from 'lit-element';
import './FasIcon'

export class NumberElem extends LitElement {

  static get properties() {
    return {
      value: {type: Number},
      icon: {type: String},
      iconSize: {type: String},
      size: {type: String},
      end: {type: String}
    };
  }

  get integer() {
    return Math.floor(this.value);
  }

  get decimal() {
    return Math.round(10 * (this.value - this.integer));
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
      .integer.big {
        font-size: 55px;
        line-height: 42px;
        padding-bottom: 5%;
      }
      .integer.medium {
        font-size: 30px;
        line-height: 22px;
      }
      .integer.small {
        font-size: 18px;
        line-height: 18px;
      }

      .decimal {
        vertical-align: super;
      }
      .decimal.big {
        font-size: 25px;
        line-height: 15px;
      }
      .decimal.medium {
        font-size: 12px;
        line-height: 12px;
        display: none;
      }
      .decimal.small {
        font-size: 9px;
        line-height: 9px;
        display: none;
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
    <div class="integer ${this.size}">${this.integer}<spam class="decimal ${this.size}">${this.decimal}</spam></div>
    
    <fas-icon icon="${this.icon}" class="icon ${this.iconSize || this.size}"></fas-icon>
    ${this.end}
    `;
  }
}

customElements.define('number-elem', NumberElem);