'use strict';

export function heroTemplate(src, name) {
    return `
    <div class="hero__block">
        <div class="hero-image">
            <img src="${src}" alt="${name}">
        </div>
        <div class="hero__desc">
            ${name}
        </div>
    </div>
    `;
}

export function buttonTemplate(text) {
    return `
    <button class="content-section__button">${text}</button>
    `;
}