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
        super('img', options.id, options.selector, options.src);
        this.src = options.src;
    }
    renderComponent() {
        const elem = super.renderComponent();
        elem.setAttribute('src', `${this.src}`);
        return elem;
    }
}
