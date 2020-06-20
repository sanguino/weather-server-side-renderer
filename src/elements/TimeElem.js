import { html } from 'lit-element';
import { BaseElem } from './BaseElem'
import './FasIcon'


export class TimeElem extends BaseElem {

  get time() {
    return new Date(this.value * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
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