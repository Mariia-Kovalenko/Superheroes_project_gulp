"use strict";

import axios from "axios";
import { Button } from './module/components.js';
import { heroTemplate } from "./module/templates.js";
import {API_KEY, url} from './module/api.js';

import {toggleSideNav} from "./module/sidenav.js"

let characters;
const container = document.querySelector('.content-section__content');
let dataLimit = 100;
let limitChar = 10;

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
            //return 100 records list of characters
            return response.data.data.results;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

const loadData = new loadDataAPI();

const data = loadData.getData(url, 0, dataLimit);

data.then(data => {
    characters = data;
    console.log(characters);

    for (let i = 0; i < limitChar; i++) {
        // console.log(characters[i]);
        if (characters[i].thumbnail) {
            const path = characters[i].thumbnail.path;
            const extension = characters[i].thumbnail.extension;
            const name = characters[i].name;

            if (!path.includes('image_not_available')) {
                container.innerHTML += heroTemplate(`${path}.${extension}`, name);
                //if (limitChar < 10) {
                    limitChar++;
                //}
            }

            // const image = new Image({
            //     id: `image-${i}`,
            //     selector: `hero-image`,
            //     src: `${path}.${extension}`
            // });
        
            // container.append(image.renderComponent());
        }
    }

    document.querySelector('.content-section').append(new Button({
        id: 'load-more-btn', 
        selector: 'content-section__button', 
        text: 'Load More'
    }).renderComponent());

});