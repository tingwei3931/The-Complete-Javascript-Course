export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLikes(id, title, author, img) {
        const like = {id, title, author, img}
        this.likes.push(like);

        // Persist the data in local storage
        this.persistData();

        // Return newly create object is a good practice
        return like;
    } 

    deleteLikes(id) {
        //Splice() mutates the original array but slice() returns a brand new array. Slice() accepts the start and end index of the portion that we want to take and then returns a new array but the original array is not mutated. 
        //In slice(), the second argument is the end index (takes up to but not including end index)
        //In splice(), the second argument is the number of elements to take (starting from the element in start index)
        // Eg:
        // [2, 4, 8] splice(1, 2) -> returns [4, 8], original array is [2] (mutated).
        // [2, 4, 8] slice(1, 2) -> returns [4], original array is [2, 4, 8] (not mutated).

        // This line below will mutate the original item array
        this.likes.splice(this.likes.findIndex(el => el.id === id), 1);

        // Persist the data in local storage
        this.persistData();
    }

    isLiked(id) {
        // Returns -1 if not found
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        // JSON also parses an array of objects
        // getItem() will return null if there is nothing
        const likes = JSON.parse(localStorage.getItem('likes'));

        // Restores likes from localStorage
        if (likes) this.likes = likes;
    }
}