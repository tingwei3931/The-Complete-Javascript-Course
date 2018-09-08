import uniqid from 'uniqid';

export default class List {
    
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        // Each of the items has to have a unique id
        const item = {
            id: uniqid(),
            count,
            unit, 
            ingredient
        }
        this.items.push(item);
        
        // Persist the data in local storage
        this.persistData();

        //Good practice to always return newly created item
        return item;
    }

    deleteItem(id) {
        //Splice() mutates the original array but slice() returns a brand new array. Slice() accepts the start and end index of the portion that we want to take and then returns a new array but the original array is not mutated. 
        //In slice(), the second argument is the end index (takes up to but not including end index)
        //In splice(), the second argument is the number of elements to take (starting from the element in start index)
        // Eg:
        // [2, 4, 8] splice(1, 2) -> returns [4, 8], original array is [2] (mutated).
        // [2, 4, 8] slice(1, 2) -> returns [4], original array is [2, 4, 8] (not mutated).

        // This line below will mutate the original item array
        this.items.splice(this.items.findIndex(el => el.id === id), 1);
    }

    // Delete everything in the list
    deleteAllItem() {
        this.items = [];
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }

    persistData() {
        localStorage.setItem('shoppingList', JSON.stringify(this.items));
    }

    readStorage() {
        // JSON also parses an array of objects
        // getItem() will return null if there is nothing
        const items = JSON.parse(localStorage.getItem('shoppingList'));

        // Restores likes from localStorage
        if (items) this.items = items;
    }
}

