"use strict";

import { heroTemplate, buttonTemplate, heroInfo, loader } from "./module/templates.js";
import {loadDataAPI, API_KEY, URL, URL_CHARACTERS, URL_SEARCH_NAME} from './module/api.js';

import {toggleSideNav} from "./module/sidenav.js"

let characters;
//const container = document.querySelector('.content-section__content');
const values = {
    dataLimit: 100,
    limitChar: 10
}


toggleSideNav();

const loadData = new loadDataAPI();

const data = loadData.getData(URL + URL_CHARACTERS, 0, values.dataLimit);

data.then(data => {
    characters = data;
    console.log(characters);

    displayCharacters(characters, 0, values.limitChar);

    //add Load More Button
    document.querySelector('.content-section').innerHTML += buttonTemplate('Load More');
    // enable load more characters
    document.querySelector('.content-section__button').addEventListener('click', loadMoreCharacters);
    // enable search character btn
    document.querySelector('.search-btn').addEventListener('click', toggleSearchCharacter);
    // show character details
    document.querySelector('.content-section__content').addEventListener('click', showCharacterDetails);

    // close modal
    document.querySelector('.modal__character').addEventListener('click', closeCharacterModal);
});

// ---------------

function loadMoreCharacters() {
        document.querySelector('.content-section__content').innerHTML = '';
        if (values.limitChar < values.dataLimit) {
            values.limitChar += 10;
            displayCharacters(characters, 0, values.limitChar);
        }
}

function toggleSearchCharacter(e) {
        if (e.target && e.target.closest('button')) {
            const name = document.querySelector('.search').value;
            // checkName();
            if (name) {
                document.querySelector('.search').value = '';
                searchCharacter(name);
            }
        }
}

function searchCharacter(characterName) {
    console.log(characterName);
    const search = loadData.getData(URL + URL_CHARACTERS + URL_SEARCH_NAME + characterName, 0, 50);
    search.then(data => {
        // console.log(data);
        // let result = data;
        values.dataLimit = data.length;
        characters = data
        displayCharacters(characters, 0, characters.length);
    })
    .catch(err => console.log(err));
}

function displayCharacters(characters, start, limit) {
    document.querySelector('.content-section__content').innerHTML = '';
    let i = start;
    // console.log('limit: ', limit);
    while (limit > 0) {
        if (characters[i].thumbnail) {
            const name = characters[i].name;
            const id = characters[i].id;
            const imgPath = extractImageSrc(characters[i]);

            if (!imgPath.includes('image_not_available')) {
                document.querySelector('.content-section__content').innerHTML += heroTemplate(`${imgPath}`, name, id);
                limit--;
            }
        }
        i++;
    }
}

function showCharacterDetails(e) {
        const hero =  e.target.closest('.hero__block');
        // console.log(hero);
        const heroId = +(hero.id);
        const character = characters.find(char => char.id === heroId);
        // console.log(character);

        const heroImage =  extractImageSrc(character);
        console.log(heroImage);

        const characterInfo = {
            name: character.name,
            img: heroImage,
            description: character.description,
            comics: character.comics.collectionURI
        }

        console.log(characterInfo);

        showCharacterModal(characterInfo);
    }

function showCharacterModal(characterInfo) {

    const modal = document.querySelector('.modal__character')
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    const character = document.querySelector('.character');

    character.innerHTML = loader();
    const comics = loadData.getData(characterInfo.comics);
    comics.then(result => {
        console.log(result);

        characterInfo.comics = result;

        character.innerHTML = heroInfo(characterInfo);
    })
}

function closeCharacterModal() {
    const modal = document.querySelector('.modal__character')
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function extractImageSrc(character) {
    const path = character.thumbnail.path;
    const extension = character.thumbnail.extension;

    return path + '.' + extension;
}