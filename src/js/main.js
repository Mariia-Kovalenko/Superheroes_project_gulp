"use strict";

import axios from "axios";
import { Image } from './module/components.js';
import {API_KEY, url} from './module/api.js';

let characters;
const container = document.querySelector('.content-section__content');

class loadDataAPI {
    async getData(url, start, end) {
        try {
            //try to send a request to server woth API key
            const response = await axios.get(url, {
                params: {
                    apikey: API_KEY,
                    offset: start, //start from begining
                    limit: end // get first 50 records
                }
            });
            //return limit records list of characters
            return response.data.data.results;
            //return response.data;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

const loadData = new loadDataAPI();

const data = loadData.getData(url, 0, 100);

data.then(data => {
        //console.log(data);

    characters = data;
    console.log(characters);

    console.log('next 50');

    const next = loadData.getData(url, 101, 100)
        .then(data => {
            console.log(data);

            if (characters[65].comics.available > 0) {
                const comicsURI = characters[65].comics.collectionURI;
                console.log(characters[65].comics);
                // loadData.getData(comicsURI, 0, characters[65].comics.available - 1)
                // .then(data => {
                //     console.log(data);
                // });
            }
            
            
        });

        //const comicsURI = characters[0].comics.collectionURI;

        // loadData.getData(comicsURI)
        //     .then(data => {
        //         console.log(data);
        //     });

        // for (let i = 0; i < 12; i++) {
        //     // console.log(characters[i]);
        //     if (characters[i].thumbnail) {
        //         const path = characters[i].thumbnail.path;
        //         const extension = characters[i].thumbnail.extension;
        //         const image = new Image({
        //             id: `image-${i}`,
        //             selector: `hero-image`,
        //             src: `${path}.${extension}`
        //         });
            
        //         container.append(image.renderComponent());
        //     }
            
        // }
});
