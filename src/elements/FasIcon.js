import {LitElement, html} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

export class FasIcon extends LitElement {

    static get properties() {
        return {
            icon: {type: String},
            fixWidth: {type: String},
        };
    }

    get styles() {
        return {
            width: this.fixWidth
        };
    }

    render() {
        return html`
    <link rel="stylesheet" href="./css/fontawesome.min.css">
    <link rel="stylesheet" href="./css/solid.min.css">
    <i class="fas fa-${this.icon}" style="${styleMap(this.styles)}"></i>`;
    }
}

customElements.define('fas-icon', FasIcon);