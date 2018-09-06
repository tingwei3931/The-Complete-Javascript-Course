// All codes will be written in ES6 from this point

const first = () => {
    //Hey there and the end will appear first before the second() function
    console.log('Hey there');
    second();
    console.log("The end");
}

const second = () => {
    //setTimeout() is a asynchronus function
    setTimeout(() => {
        console.log("Async hey there");
    }, 2000); //in miliseconds. After 2seconds, the callback function will run
}

first();

//Asynchronous Javascript: Event Loop
// Refer to this link: https://medium.com/front-end-hacking/javascript-event-loop-explained-4cd26af121d4

//////////////////////////////////////// 
//Asynchronous Javascript with callbacks: The old way

function getRecipe() {
    //will show up after 1.5 seconds 
    setTimeout(() => {
        const recipeID = [523, 321, 432, 974];
        console.log(recipeID);

        setTimeout(id => {
            const recipe = {
                title: 'Fresh Tomato Pasta',
                publisher: 'Jonas'
            };
            console.log(`${id}: ${recipe.title}`);
            setTimeout(publisher => {
                const recipe2 = {
                    title: 'Italian Pizza',
                    publisher: publisher
                };
                console.log(recipe2);
            }, 1500, recipe.publisher);
        }, 1500, recipeID[2]); //will pass in the callback function as the parameter id 
    }, 1500);
}
getRecipe(); // This will eventually end up in CALLBACK HELL if the callback goes deeper(signified by the triangular indentation)

/////////////////////////////
// Promises (ES6)
//What is a Promise?
//An object that keeps track about whether a certain event has happened already or not. In the case that the event did happened, then it determines what happens after the event has happen(Note: Events here refering to asynchronous events)

// Promise States
// 1. Pending
// 2. Settled/Resolved (After the event happens)
// 3. Fulfilled (the result is available after the promise is fulfilled)
// 4. Rejected (if there is an error in retrieving the result)

// Asynchronous Javascript using promises
//first callback is called executor function and is executed once the object is created. Takes in two arguments: the callback function's resolve and reject. If the callback function is successful, we call the resolve function, if not we call the reject function.
const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        //return results from the promise if it is succesful
        resolve([523, 321, 432, 974]);
    }, 1500);
});

const getRecipe2 = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(id => {
            const recipe = {
                title: 'Fresh Tomato Pasta',
                publisher: 'Jonas',
                id: id
            };
            resolve(recipe);
        }, 1500, recID);

    })
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe2 = {
                title: 'Italian Pizza',
                publisher: pub
            };
            resolve(`${pub} : ${JSON.stringify(recipe2)}`);
        }, 1500, publisher);
    })
}

//after that we can then consume the Promise object using the method then and catch (all Promise objects will inherit these two methods)
//can add an event handler in case the event is fulfiled. 
//the callback here will be the result of the item
getIDs
    .then(IDs => {
        console.log(IDs);
        return getRecipe2(IDs[2]);
    })
    .then(recipe => {
        console.log(recipe);
        return getRelated(recipe.publisher);
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log('Error!!');
    });

/////////////////////////////////////////////
// Lecture: From Promises to Async/Await
// Syntax to consume Promises can still be quite confusing and difficult to manage
// In ES8/ES2017, Async/Await makes it easier to consume promises.
// Use back the same Promise objects from the last lecture, but different consume methods. 

//async keyword means it is an asynchronous function(runs in background)
//automatically returns a Promise object of the resolve value of the thing to return
async function getRecipesAw() {
    //wait for a promise object to resolve
    //await can only be used inside an async function
    const IDs = await getIDs;
    console.log(`Async result: ${IDs}`);
    const recipe = await getRecipe2(IDs[2]);
    console.log(recipe);
    const related = await getRelated("Jonas");
    console.log(related);
    return recipe;
}


//use the then keyword to resolve the promise that is return by the async function
getRecipesAw().then((recipe) => {
    console.log(`I like ${recipe.title}`);
});

////////////////////////////////////////////
// Lecture: AJAX and APIs
// AJAX: Asynchronous Javascript and XML
// allows the client(browser) to communicate with the server asynchronously in the background. 
// API: Application Programming Interface: Piece of software that allows another piece of software to talk with each other. 

//////////////////////////////////////////////////////////////
// Lecture: Making AJAX calls with Fetch and Promises
// Web API: Functions and methods that are available to us in the browser but are not really part of the Javascript language itself. 
// Using fetch() to make AJAX request 
// XML HttpReuqest - the old way

//Javascript has the 'Same-Origin Policy', which prevents us from fetching data (perform AJAX calls) from another domain that is different from our own. In order to circumvent this, Cross-Origin Resource Sharing (CORS) was developed. 

function getWeather(woeid) {
    //Fetch API gets our data and returuns a Promise. 
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
        .then(result => {
            //console.log(result);
            //convert ReadableStream to json (A asynchronous function)
            return result.json();
        })
        .then(data => {
            const today = data.consolidated_weather[0];
            console.log(`Temperatures today in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`);
        })
        .catch(error => {
            console.log(error);
        });
}
getWeather(2487956); //San Francisco
getWeather(44418); //London


/////////////////////////////////////////////////////////////
// Lecture: Making AJAX Calls with Fetch and Async/Await
// in async/await, error is displayed using try catch
async function getWeatherAW(woeid) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        const tomorrow = data.consolidated_weather[1];
        console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}`);
        return data;
    } catch (error) {
        alert(error);
    }
}
getWeatherAW(2487956); //San Francisco
let dataLondon;
getWeatherAW(44418).then(data => {
    dataLondon = data;
    console.log(dataLondon);
}); //London

//both these two asynchronous method does not follow its original order in the output


//Self testing a new api
function testing(id) {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`).then(response => response.json())
        .then(data => console.log(data.name));
}

testing(1);
testing(2);
testing(3);

//Another one using async/await
async function testingAW(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
    const data = await response.json();
    return data.body;
}

testingAW(1).then(result => console.log(result));