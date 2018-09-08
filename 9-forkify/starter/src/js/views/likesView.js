import { elements } from './base';
import { recipeTitle } from './searchView';

export const toggleLikeBtn = (isLiked) => {
    const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    // Change the href of the use element 
    // CSS Selector:element element	
    // Example: div p	
    // Example description: Selects all <p> elements inside <div> elements

    // Explanation: Selects all <use> elements inside elements with the class recipe__love
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`)

}

// Only show the likes icon when there is likes
export const toggleLikeMenu = numLikes => {

    // Toggle the CSS property visibility
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${recipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
`;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    // CSS Selector: [attribute*=value]	
    // Example: a[href*="w3schools"]	
    // Example Description: Selects every <a> element whose href attribute value contains the substring "w3schools"

    // Explanation below: selects every element with the class 'likes__link' whose href attribute contains the substring "id" or "#id";
    const el = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;

    // Always good to test if querySelector found something before removing
    if(el) el.parentElement.removeChild(el);
}
