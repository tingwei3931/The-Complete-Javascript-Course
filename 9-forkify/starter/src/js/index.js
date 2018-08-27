// Global app controller
//import test from './test'; //will import the number 23

// const x = 23;
// console.log(`I imported ${test} from another module called test.js! Variable x is ${x}`); //log the number 23 exported from test to the console

//default exports
// import x from './models/Search';
//Named imports
//need to use exact same names that is exported
//if want to use different name, use as keyword
// import { add as a, multiply as b, ID as c} from './views/searchView';
// console.log(`Using imported functions add: ${a(c, 2)}`);
// console.log(`Using imported functions multiply: ${b(5, 2)} ${x}`);

// Third way to import named imports
// import * as searchView from './views/searchView';

// Third way to use named imports
// console.log(`Using imported functions add: ${searchView.add(searchView.ID, 2)}`);
// console.log(`Using imported functions multiply: ${searchView.multiply(5, 2)} ${x}`);

import Search from './models/Search';
//Redux - state management library
//For this project, use an object to keep track of the state

/**
 *
 * Global State of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 * - these objects are stored in a central place like state object
 */


const state = {
};


const ctrlSearch = async ()  => {
    // 1. Get the query from the view 
    const query = 'pizza'; // TODO 
    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);
        
        // 3. Prepare UI for results (Spinner)

        // 4. Search for recipe

        // Since it is an async function, need to use awake
        await state.search.getResults();

        // 5. Render results on UI
        console.log(state.search.result);
    }
    

};
// Attach event listeners
document.querySelector('.search').addEventListener('submit', e => {
    // Prevent the page from refreshing
    e.preventDefault();
    ctrlSearch();
})

