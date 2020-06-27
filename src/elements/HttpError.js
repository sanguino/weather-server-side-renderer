import {css, html, LitElement} from 'lit-element';

export class HttpError extends LitElement {

    static get properties() {
        return {
            error: {type: String},
        };
    }

    render() {
        return html`<img src="imgs/${this.error}-error.png">`;
    }
}

customElements.define('http-error', HttpError);