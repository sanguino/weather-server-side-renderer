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
        font-family: 'Players';
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: none;
      }
      
      .white {
        color: white;
      }
      .integer.big {
        font-size: 51px;
      }
      .integer.medium {
        font-size: 27px;
      }
      
      .decimal {
        vertical-align: super;
      }
      .decimal.big {
        font-size: 19px;
        position: relative;
        top: -3px;
        left: 2px
      }
      .decimal.medium {
        font-size: 15px;
        position: relative;
        top: 2px;
        min-width: 8px;
      }
      
      img {
        padding-left: 2px;
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