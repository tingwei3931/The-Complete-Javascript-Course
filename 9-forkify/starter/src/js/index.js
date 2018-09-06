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
import {
    elements,
    renderLoader,
    clearLoader,
    elementStrings
} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';
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


const state = {};


/**
 *
 * Search Controller
 *
 */
const ctrlSearch = async () => {
    // 1. Get the query from the view 

    const query = searchView.getInput(); // get the input from the view

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results (Spinner)
        searchView.clearInput();
        // Clear the results from the previous search
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            // 4. Search for recipe
            // Since it is an async function, need to use await
            await state.search.getResults();

            // 5. Render results on UI
            searchView.renderResults(state.search.result);
            console.log(state.search.result);
        } catch (error) {
            alert("Something wrong with the search..");
            console.log(error);
        } finally {
            //Clear the loader
            clearLoader();
        }

    }
};

// Attach event listeners
// Since searchForm is a form tag, submit event handler will be triggered by both clicking the button and also pressing enter (not the same as budgety cause budgety dont have a form tag)
elements.searchForm.addEventListener('submit', e => {
    // Prevent the page from refreshing
    e.preventDefault();
    ctrlSearch();
});

elements.resultPages.addEventListener('click', e => {
    // The Element.closest() method returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter. If there isn't such an ancestor, it returns null.
    const btn = e.target.closest('.btn-inline');
    // if there is a button, then read the page number to go from go-to attribute
    if (btn) {
        // data retrived from go-to attribute is in string format
        const pageToGo = parseInt(btn.dataset.goto, 10);
        console.log(pageToGo);
        searchView.clearResults();
        searchView.renderResults(state.search.result, pageToGo);
    }
});

/**
 *
 * Recipe Controller
 *
 */
const ctrlRecipe = async () => {

    // window.location returns the url of the page
    // .hash accesses the hash value of the url
    // replace the hash with nothing (omit hash)
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    //console.log(id);

    if (id) {
        // Clear the recipe
        recipeView.clearRecipe();

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Prepare UI for changes
        renderLoader(elements.recipe);

        // Create a new Recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // Parsr the ingredients into appropriate format
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // Render the recipe UI
            clearLoader(elements.recipe);
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error processing recipe!');
            console.log(error);
        }

    }

}

// The hashchange event is fired when the fragment identifier of the URL has changed (the part of the URL that follows the # symbol, including the # symbol). This event will be triggered whenever the user clicks on a recipe
// window.addEventListener('hashchange', ctrlRecipe);

// Retains data even after the browser refreshes(loads)
// window.addEventListener('load', ctrlRecipe);

// A better way to add event listener for different event but same event handler
['hashchange', 'load'].forEach(event => window.addEventListener(event, ctrlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    // Here, the closest cannot be used because there is more than one thing that we potentially want to select (+/- buttons) Solution: use matches() - accepts a css selector
    // This selector matches btn-decrease or any child of btn-decrease (in case we clicked on the icon)
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //Decrease button is clicked
        // Prevent negative servings
        if (state.recipe.servings > 1)
            state.recipe.updateServings('dec');
    } else if(e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
    }
    recipeView.updateServingsIngredients(state.recipe);

    console.log(state.recipe);
});