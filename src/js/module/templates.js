'use strict';

export function heroTemplate(src, name, id) {
    return `
    <div id="${id}" class="hero__block">
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

export function heroInfo(characterInfo) {
    const comicsList = characterComics(characterInfo.comics);
    // console.log(comicsList);
    return `
    <div class="character__details">
                <div class="character__img">
                    <img class="character-image" src="${characterInfo.img}" alt="hero">
                </div>
                <div class="character__info">
                    <h3 class="character__name">${characterInfo.name}</h3>

                    <div class="info__inner">
                        <div class="character__descr">
                            <div class="head">Description</div>
                            <p class="description-text">${characterInfo.description ? characterInfo.description : 'No description'}</p>
                        </div>
                        <div class="character__comics-list">
                            <div class="character__comics">
                                <div class="head">Comics</div>
                                <ul class="comics__list">
                                    ${comicsList}
                                </ul>
                            </div>
                        </div>
                    </div>
                
                    <div class="character__buttons">
                        <button class="character__button view-comics">See all comics</button>
                        <button class="character__button add">Add</button>
                    </div>
                </div>
            </div>
    `
}


function characterComics(comicsList) {
    let res = [];

    let limit = comicsList.length;

    if (limit > 3) {
        limit = 3;
    }

    for (let i = 0; i < limit; i++) {
        res.push(`
            <li><a class="comics__link" href="#">${comicsList[i].title}</a></li>
        `)
    }

    return res.join('');
}


export function loader() {
    return `
        <div class='loader'>
            <div class="loader__inner">
                <div class="spinner"></div>
            </div>
        </div>
    `
}