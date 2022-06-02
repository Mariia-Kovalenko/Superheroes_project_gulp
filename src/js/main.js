"use strict";

import axios from "axios";
import { heroTemplate, buttonTemplate } from "./module/templates.js";
import {API_KEY, URL, URL_CHARACTERS, URL_SEARCH_NAME} from './module/api.js';

import {toggleSideNav} from "./module/sidenav.js"

let characters;
//const container = document.querySelector('.content-section__content');
const values = {
    dataLimit: 100,
    limitChar: 10
}


toggleSideNav();

class loadDataAPI {
    async getData(url, start, end) {
        try {
            //try to send a request to server woth API key
            const response = await axios.get(url, {
                params: {
                    apikey: API_KEY,
                    offset: start,
                    limit: end
                }
            });
            //return list of characters
            return response.data.data.results;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

const loadData = new loadDataAPI();

const data = loadData.getData(URL + URL_CHARACTERS, 0, values.dataLimit);

data.then(data => {
    characters = data;
    //console.log(characters);

    displayCharacters(characters, 0, values.limitChar);

    //add Load More Button
    document.querySelector('.content-section').innerHTML += buttonTemplate('Load More');


    document.querySelector('.content-section__button').addEventListener('click', () => {
        //console.log('click');
        document.querySelector('.content-section__content').innerHTML = '';
        if (values.limitChar < values.dataLimit) {
            values.limitChar += 10;
            displayCharacters(characters, 0, values.limitChar);
        }
    });


    const search = loadData.getData(URL + URL_CHARACTERS + URL_SEARCH_NAME + 'man', 0, 50);
    search.then(data => console.log(data))
            .catch(err => console.log(err));
});


function displayCharacters(characters, start, limit) {
    let i = start;
    while (limit > 0) {
        if (characters[i].thumbnail) {
            //console.log(characters[i]);
            const path = characters[i].thumbnail.path;
            const extension = characters[i].thumbnail.extension;
            const name = characters[i].name;

            if (!path.includes('image_not_available')) {
                document.querySelector('.content-section__content').innerHTML += heroTemplate(`${path}.${extension}`, name);
                limit--;
            }
        }
        i++;
    }
}