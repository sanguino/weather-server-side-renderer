import {html, LitElement} from 'lit-element';

const batLevels = [0, 25, 50, 75, 100];
export class BatteryIcon extends LitElement {

    static get properties() {
        return {
            bat: {type: Number},
            usb: {type: Boolean},
        };
    }

    get batIcon () {
        if (this.usb) return 'battery-charge.png';

        let level = batLevels.reduce( (prev, curr) => {
            return (Math.abs(curr - this.bat) < Math.abs(prev - this.bat) ? curr : prev);
        });
        level = level === 0 ? '00' : level.toString();
        return `battery-${level}.png`
    }

    render() {
        return html`<img src="imgs/${this.batIcon}">`;
    }
}

customElements.define('battery-icon', BatteryIcon);
