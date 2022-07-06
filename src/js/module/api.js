'use strict';
import axios from "axios";

export const API_KEY = 'a5837db97d72016c81a7a776f4240db9';
export const URL = 'https://gateway.marvel.com/v1/public/';
export const URL_COMICS = 'comics';
export const URL_CHARACTERS = 'characters';
export const URL_SEARCH_NAME = '?nameStartsWith='

export class loadDataAPI {
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