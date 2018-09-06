//for models, a convention to use uppercase for model name 
//Default exports - only used when we want to export one thing from a module.
//Named exports - export multiple things from a module. 
// export default 'I am an exported string.';
import axios from 'axios';
import { API_KEY, proxy } from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    };

    async getResults() {
        try {
            //fetch does not really work in all browsers just yet
            //using library called axios that works in all browsers
            //automatically returns json(no need to convert explicitly)
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${API_KEY}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
};