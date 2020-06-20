import { LitElement, css } from 'lit-element';

export class BaseElem extends LitElement {

  static get properties() {
    return {
      value: {type: Number},
      icon: {type: String},
      iconSize: {type: String},
      size: {type: String},
      end: {type: String}
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: 'Concert One';
        -webkit-font-smoothing: none;
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
}
