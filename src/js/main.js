"use strict";

import axios from "axios";
import { Image } from './module/components.js';
import {API_KEY, url} from './module/api.js';

let characters;
const container = document.querySelector('.content-section__content');

class loadDataAPI {
    async getData(url) {
        try {
            //try to send a request to server woth API key
            const response = await axios.get(url, {
                params: {
                    apikey: API_KEY,
                    limit: 100
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

const data = loadData.getData(url);

data.then(data => {
    characters = data;
    console.log(characters);

    for (let i = 0; i < 12; i++) {
        // console.log(characters[i]);
        if (characters[i].thumbnail) {
            const path = characters[i].thumbnail.path;
            const extension = characters[i].thumbnail.extension;
            const image = new Image({
                id: `image-${i}`,
                selector: `hero-image`,
                src: `${path}.${extension}`
            });
        
            container.append(image.renderComponent());
        }
        
    }
});