import axios from 'axios';
import { API_KEY, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    };

    async getRecipe() {
    //proxy is the url for proxy server
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${API_KEY}&rId=${this.id}`);
            //console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        // Assume for every 3 ingredients, need 15 minutes
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        // Hardcode servings :D
        this.servings = 4;
    }

    parseIngredients() {
        //Standardize units by converting units from unitsLong into unitsShort
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        const newIngredients = this.ingredients.map(el => {
            //1. Uniform units
            let ingredient = el.toLowerCase(); //to lowercase so as to compare with unitsLong and unitsShort
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            //2. Remove parenthesis using regular expression
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //3. Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            // Return the index of the elements that contains the unit from unitsShort
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if(unitIndex > -1) {
                // There is a unit
                // Everything before the unit is count
                // Eg: 4 1/2 cups, arrCount is [4, 1/2] ---> eval("4+1/2") --> 4.5
                // Eg: 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); 

                let count;
                if (arrCount.length == 1) {
                    // if the count is in the form of '1-1/2' (actually means 1+1/2)
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    // The eval() function evaluates or executes an argument. If the argument is an expression, eval() evaluates the expression. If the argument is one or more JavaScript statements, eval() executes the statements.
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            
            } else if (parseInt(arrIng[0], 10)){
                // There is NO unit but the first element is a number (e.g. 1 bread)
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    // equivalent to ingredient: ingredient
                    ingredient
                }
            }
            return objIng;
        });

        this.ingredients = newIngredients;
    }

    //type: 'increase' or 'decrease'
    updateServings(type) {
        // Update Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        // Update Ingredients
        this.ingredients.forEach(ing => ing.count *= (newServings / this.servings));
        this.servings = newServings;
    }
}