import { elements } from './base';

export const renderItem = item => {
    const markup = `
    <li class="shopping__item" data-itemid="${item.id}">
        <div class="shopping__count" >
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count--value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
            `;

    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
}

export const renderDeleteAll = items => {
    const markup = `
        <button class="btn-small recipe__btn list__btn--delete">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Clear Shopping List</span>
            </button>
    `    
    document.querySelector('.shopping__list').insertAdjacentHTML('afterend', items.length > 0 ? markup : '');
}

export const deleteItem = id => {
    // Again, using CSS selector to select the item with the same id
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};

export const deleteAllItem = () => {
    document.querySelector('.shopping__list').innerHTML = '';
    // remove the delete all button
    const el = document.querySelector('.list__btn--delete');
    if (el) el.parentElement.removeChild(el);
}