import { elements } from "./base";
import { Fraction } from "fractional";

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

const formatCount = count => {
    if (count) {
        // count = 2.5 --> 2 1/2
        // count = 0.5 --> 1/2
        // Problem: fractional cannot deal with recurring decimals. (e.g. 1/3 = 0.3333...) so we will round up the numbers here
        // The Math.round() function returns the value of a number rounded to the nearest integer.
        // Eg: 0.333333... --> 3333.33... --> after rounding --> 3333 ---> divide by 10000 ---> 0.3333
        // Round to the nearest 4 decimal place
        const newCount = Math.round(count * 100) / 100;
        // Eg: 0.3333 -> "0.3333"(String) -> ['0', '3333'] -> [0, 3333] 
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10)); // [2, 5]

        // no decimal 
        if (!dec) {
            return newCount;
        }

        //for cases like 0.5
        if (int === 0) {
            const fr = new Fraction(newCount); 
            return `${fr.numerator}/${fr.denominator}`;
        } else { //both integer and decimal present
            const fr = new Fraction(newCount - int); //this will take the decimal part (eg: 0.5 from 2.5)
            return `${int} ${fr.numerator}/${fr.denominator}`; // convert the 0.5 to 1/2 then combine back to the 2
        }
    }
    return '?';
};

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;


export const renderRecipe = (recipe, isLiked) => {
    const markup = `
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${ recipe.ingredients.map(createIngredient).join('')}
        </ul>

        <button class="btn-small recipe__btn  recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </a>
    </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

// Updae the UI whenever there is a change in the servings
export const updateServingsIngredients = recipe => {
    //Update counts
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // Update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, index) => el.textContent = formatCount(recipe.ingredients[index].count));
}