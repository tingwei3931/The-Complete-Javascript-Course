// Putting stuff that are reusable
export const elementStrings = {
    loader: 'loader',
    searchInput: '.search__field',
    searchForm: '.search',
    resultList: '.results__list',
    searchRes: '.results',
    resultPages: '.results__pages',
    recipe: '.recipe',
    shoppingList: '.shopping__list',
    likesField: '.likes__field',
    likesList: '.likes__list',
    shopping: '.shopping'
}

// All DOM Elements will be stored here
export const elements = {
    searchInput: document.querySelector(`${elementStrings.searchInput}`),
    searchForm: document.querySelector(`${elementStrings.searchForm}`),
    resultList: document.querySelector(`${elementStrings.resultList}`),
    searchRes: document.querySelector(`${elementStrings.searchRes}`),
    resultPages: document.querySelector(`${elementStrings.resultPages}`),
    recipe: document.querySelector(`${elementStrings.recipe}`),
    shoppingList: document.querySelector(`${elementStrings.shoppingList}`),
    likesMenu: document.querySelector(`${elementStrings.likesField}`),
    likesList: document.querySelector(`${elementStrings.likesList}`),
    shopping: document.querySelector(`${elementStrings.shopping}`),

};



export const renderLoader = parent => {
    // The <use> element takes nodes from within the SVG document, and duplicates them somewhere else.
    // Creates the html code needed to render a spinning loader (see CSS)
    const loader = `
        <div class=${elementStrings.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);        
}

export const clearLoader = () => {
    // Locate the loader here because the loader is not yet rendered when the file loads
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}