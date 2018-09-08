//Named export
// export const add = (a, b) => a + b;
// export const multiply = (a, b) => a * b;
// export const ID = 23;

// Import DOM Strings
import { elements } from './base';
import he from 'he'; //To encode/decode HTML entities

// Using named export here
export const getInput = () => elements.searchInput.value; //implicit return

const renderRecipe = recipe => {
    // Template literals will parse HTML as it is
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">z
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipeTitle(he.decode(recipe.title))}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.resultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {

    //Render results of current page and render the pagination buttons
    const start = (page - 1) * resPerPage; //the start index of the item to be displayed
    const end = page * resPerPage; //end index 

    // loop through the array and apply calback function renderRecipe to render them
    // The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `    
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    // round up the number of pages
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    // if we are on page one (pages > 1 to prevent showing the button if there is only one page)
    if(page === 1 && pages > 1) {
        // Button to go to next page
        button = createButton(page, 'next');
    } //middle pages
    else if (page < pages) {
        // Show both buttons on middle pages
        button = `
        ${createButton(page, 'prev')} 
        ${createButton(page, 'next')} 
        `;
    } // if we are on the last page (pages > 1 to prevent showing the button if there is only one page)
    else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }
    elements.resultPages.insertAdjacentHTML('afterbegin', button);
};

export const clearInput = () => {
    //clears the input value in the search box
    elements.searchInput.value = "";
};

// Truncates the recipe title
export const recipeTitle = (title, limit = 17) => {
    const newTitle = []; // adding stuff to a new array is not mutating the array itself so const is ok
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            // if the accumulator + length does not exceed the limit
            if (acc + cur.length <= limit) 
                newTitle.push(cur);
            return acc + cur.length; // this return statement will update the value of the accumulator
        }, 0); // initial value of the accumulator
        //return the result
        return `${newTitle.join(' ')} &hellip;`; //HTML entity for triple dot(...)
    }
    return title;
}

export const clearResults = () => {
    // Deletes all the html code inside it 
    elements.resultList.innerHTML = "";
    // Clear the pagination button as well
    elements.resultPages.innerHTML = "";

    // Alternative method: using hasChild and removeChild
    // const list = elements.resultList;
    // while(list.firstChild) {
    //     list.removeChild(list.firstChild);
    // }
};

export const highlightSelected = id => {

    // Clear all the highlights before highlighting a new one
    // The Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object.
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => el.classList.remove('results__link--active'));
    
    // Highlight the selected recipe 
    // can query based on CSS
    document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
}