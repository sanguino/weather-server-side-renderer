import { html } from 'lit-element';
import { BaseElem } from './BaseElem'
import './FasIcon'


export class TimeElem extends BaseElem {

  get time() {
    const date = this.value ? new Date(this.value * 1000 ) : new Date();
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  render() {
    return html`
    <div class="time ${this.size}">${this.time}</div>
    <fas-icon icon="${this.icon}" class="icon ${this.iconSize || this.size}"></fas-icon>
    ${this.postIcon}
    `;
  }
}

customElements.define('time-elem', TimeElem);