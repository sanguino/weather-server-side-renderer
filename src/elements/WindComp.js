import {css, html, LitElement} from 'lit-element';

const angles = [0, 45, 90, 135, 180, 225, 270, 315, 360];
export class WindComp extends LitElement {

  static get properties() {
    return {
      velocity: {type: Number},
      angle: {type: Number},
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
      
      div.value {
        padding-left: 2px;
        font-size: 34px;
        line-height: 23px;
      }
      
      div.unit {
        font-size: 15px;
        line-height: 12px;
      }
    `;
  }

  get windIcon() {
    let angle = angles.reduce( (prev, curr) => {
      return (Math.abs(curr - this.angle) < Math.abs(prev - this.angle) ? curr : prev);
    });
    angle = angle === 360 ? 0 : angle;
    angle = angle.toString();
    while (angle.length <3) {
      angle = '0' + angle;
    }
    console.log(angle);
    return `wind-${angle}.png`
  }

  render() {
    return html`
    <img src="imgs/${this.windIcon}">
    <div class="value">${Math.round(this.velocity * 3.6)}</div>
    <div class="unit">KM<br />H<div>
    `;
  }
}

customElements.define('wind-comp', WindComp);