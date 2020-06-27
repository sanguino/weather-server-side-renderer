import {css, html, LitElement} from 'lit-element';

export class NumberComp extends LitElement {

  constructor() {
    super();
    this.color = "black"
  }

  static get properties() {
    return {
      value: {type: Number},
      icon: {type: String},
      size: {type: String},
      color: {type: String},
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        font-size: 24px;
        font-family: 'FORCED SQUARE';
        -webkit-font-smoothing: none;
        line-height:18px;
        font-weight: 700;
      }
      
      .white {
        color: white;
      }
      .integer.big {
        font-size: 70px;
        line-height: 46px;
      }
      .integer.medium {
        font-size: 34px;
        line-height: 22px;
      }
      
      .decimal {
        vertical-align: super;
      }
      .decimal.big {
        font-size: 25px;
        line-height: 15px;
      }
      .decimal.medium {
        font-size: 17px;
        line-height: 12px;
        position: relative;
        top: 3px;
      }
    `;
  }
  get integer() {
    return Math.floor(this.value);
  }

  get decimal() {
    return Math.round(10 * (this.value - this.integer));
  }

  render() {
    return html`
    <div class="integer ${this.size} ${this.color}">${this.integer}<spam class="decimal ${this.size}">${this.decimal}</spam></div>
       
    ${this.icon ?
        html`<img src="imgs/${this.icon}.png">` :
        ``
    }
    
    `;
  }
}

customElements.define('number-comp', NumberComp);