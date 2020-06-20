import { LitElement, css } from 'lit-element';

export class BaseElem extends LitElement {

  static get properties() {
    return {
      value: {type: Number},
      postValue: {type: String},
      icon: {type: String},
      iconSize: {type: String},
      size: {type: String},
      postIcon: {type: String}
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: 'Ubuntu';
        -webkit-font-smoothing: none;
        line-height:18px;
        font-weight: 700;
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
        font-size: 20px;
        line-height: 20px;
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
      
      .time.big {
        font-size: 55px;
        line-height: 42px;
        padding-bottom: 5%;
      }
      .time.medium {
        font-size: 20px;
        line-height: 18px;
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
}
