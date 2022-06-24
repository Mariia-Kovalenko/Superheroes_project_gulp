'use strict';
export class Component {
    constructor(tag, id, selector) {
        this.tag = tag;
        this.id = id;
        this.selector = selector;
    }

    renderComponent() {
        const elem = document.createElement(this.tag);
        elem.setAttribute('id', `${this.id}`);
        elem.setAttribute('class', `${this.selector}`);
        return elem;
    }
}


export class Image extends Component {
    constructor(options) {
        super('img', options.id, options.selector);
        this.src = options.src;
    }
    renderComponent() {
        const elem = super.renderComponent();
        elem.setAttribute('src', `${this.src}`);
        return elem;
    }
}

// export class Block extends Component {
//     constructor(options) {
//         super('div', options.id, options.selector);
//     }

//     renderComponent() {
//         const elem = super.renderComponent();
//     }
// }

export class Button extends Component {
    constructor(options) {
        super('button', options.id, options.selector);
        this.text = options.text;
    }

    renderComponent() {
        const elem = super.renderComponent();
        elem.textContent = this.text;
        return elem;
    }
}
