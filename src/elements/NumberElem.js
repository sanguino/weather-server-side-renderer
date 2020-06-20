import { html } from 'lit-element';
import { BaseElem } from './BaseElem'
import './FasIcon'

export class NumberElem extends BaseElem {

  get integer() {
    return Math.floor(this.value);
  }

  get decimal() {
    return Math.round(10 * (this.value - this.integer));
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