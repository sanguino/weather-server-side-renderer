import {css, html, LitElement} from 'lit-element';

export class TimeComp extends LitElement {

  static get properties() {
    return {
      value: {type: Number},
      icon: {type: String},
      align: {type:String}
    };
  }

  get time() {
    const date = this.value ? new Date(this.value * 1000 ) : new Date();
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  static get styles() {
    return css`
      div {
        display: flex;
        flex-direction: column;
        font-family: 'FORCED SQUARE';
        -webkit-font-smoothing: none;
        font-weight: 700;
      }
      
      div.center {
        align-items: center;
      }
      
      div.start {
        align-items: flex-start;
      }
      
      img {
        padding-bottom: 1px;
      }
      
      span {
        font-size: 24px;
        line-height: 18px;
      }
      `;
  }

  render() {
    return html`
    <div class="${this.align}">
    ${this.icon ? 
        html`<img src="imgs/${this.icon}.png">` : 
        ``
    }
    <span>${this.time}</span>
    </div>
    `;
  }
}

customElements.define('time-comp', TimeComp);