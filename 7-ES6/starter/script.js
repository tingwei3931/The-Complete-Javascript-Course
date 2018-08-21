/**
 * Modern Javascript ES6 or ES2015 (The old javascript previously learnt is ES5)
 * ES6/ES2015
 * ES7/ES2016
 * ES8/ES2017
 * Well supported in all modern browsers
 * No support in older browsers
 * Can use most features in production with transpiling and polyfiling(converting to ES5)
 * ES6 has a ton of new features.
 * Examples:
 * Variable Declarations with let and const
 * Blocks and IIFEs
 * Strings
 * Arrow Functions
 * Destructuring
 * Arrays
 * The Spread Operator
 * Rest and Default Parameters
 * Maps
 * Classes and Subclasses
 * IMPORTANT FEATURES:
 * Promises
 * Native modules
 */

// Two new ways of declaring variables (replacing var) which are let and const. 
////////////////////////////////////////
// Lecture: let and const

// ES5 
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
// const is for constants, and let is for the old var
const name6 = 'Jane Smith';
let age6 = 23;
//name6 = 'Jane Miller'; // Uncaught TypeError: Assignment to a constant variable.
console.log(name6);
// IMPORTANT NOTE: variables declared in ES5 are function-scoped, but varables declared in ES6 are block-scoped. Example:

// ES5
function driversLicence5(passedTest) {

    if (passedTest) {
        console.log(firstName); //will print out undefined because of hoisting
        var firstName = 'John';
        var yearOfBirth = 1900;
    }
    console.log(firstName + ' born in ' + yearOfBirth + ', is now officially allowed to drive a car '); //worked fine because ES5 is function-scoped. var firstName is valid inside anywhere in the function regardless of where it is declared.
}
driversLicence5(true);

// ES6
function driversLicence6(passedTest) {

    //console.log(firstName); //immediately throws an error firstName is not defined. ES6 will throw an error if a variable is used before it is declared (ES5 initialises it with undefined)
    //Known as temporal dead-zone. Variables ARE ACTUALLY HOISTED, but still cannot access them before they are declared and defined. 
    let firstName;
    //const must be initialised in the same line it is declared    
    const yearOfBirth = 1900;
    if (passedTest) {
        // Block: codes that are wrapped between two curly brackets.
        // firstName and yearOfBirth is only accessible inside this if-block.
        firstName = 'John';
    }
    console.log(firstName + ' born in ' + yearOfBirth + ', is now officially allowed to drive a car '); // (IF firstName is defined in the if-block) firstName is not defined. Because ES6 is block-scoped. FirstName is defined inside the if-block. Any reference outside of its scope is undefined. 
}
driversLicence6(true);

// ES5
var j = 23;
for (var j = 0; j < 5; j++) {
    console.log(j); //23 will be overwritten by this new j 
}
console.log(j); //will print 5 (the i declared in the loop)

// ES6
let i = 23; //different from the i in the loop
for (let i = 0; i < 5; i++) {
    console.log(i); //local scope
}
console.log(i); //this will print 23 (refers to the i in global scope)

////////////////////////////////////////
// Lecture: Blocks and IIFEs
{
    //these two variables are enclosed within a block and cannot be accessed from the outside (another way to create controllers in the budgety project)
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b); // a is not defined
console.log(c); //this is defined because var is function-scoped not block-scoped. 

// ES5 (Old way to make a IIFE)
(function () {
    var cd = 3;
})();

//console.log(cd); // is not defined because of IIFE (not accessible outside of scope)

////////////////////////////////
// Lecture: Strings

let firstName = 'john';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2018 - year;
}

//Template Literals 
//ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
// Backticks: tell javascript that we want to use template literals. ${} will evaluate it as a javascript expression.
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

// using template literals to concatenate strings. 
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j')); //will return whether the string starts with j or not (true or false)
console.log(n.endsWith('SM')); //will return whether the string eds with SM or not (true or false)
console.log(n.includes('oh')); //will return whether the string contains oh or not (true or false)
console.log(firstName.repeat(5)); //repeat the string 5 times
console.log(`${firstName} `.repeat(5)); //repeat the string 5 times with spaces between them using template literal

///////////////////////////////////////
// Lecture: Arrow functions

// Calculate the age given years
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function (current) {
    return 2018 - current;
});
console.log(ages5);

// ES6 
// Using arrow notation for callbacks
// one argument and one line of code
let ages6 = years.map(el => 2018 - el);
console.log(ages6);

// if more than one arugment, put in parenthesis.
ages6 = years.map((el, index) => `Age element ${index+1}: ${2018 - el}`);
console.log(ages6);

// If callback is more than one line, then need to use curly braces and need to rewrite return function
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index+1}: ${2018 - el}`;
});
console.log(ages6);

////////////////////////////////////////
// Lecture: Arrow Functions 2 
// Arrow functions share the surrounding this keyword. This means that, unlike normal functions, arrow functions dont get their own this keyword. They have a lexical this keyword. 

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        var self = this; // the this here points to the object itself
        document.querySelector('.green').addEventListener('click', function () {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color; //if used with the normal this keyword, the this will point to the window object.
            alert(str);
        });
    }
};

//both this.position and this.color will display undefined 
//EXPLANATION: only in a method call, that the this keyword will point to an object itself. In a regular function call, the keyword will always point to the global object, which in the browser is the window object. the callback for the addEventListener() is a regular function call, that is why the this is refering to the window object and not the box5 object. SOLUTION: create a new variable to store the this variable.
box5.clickMe();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color; //in ES6, the this keyword here points to the object. 
            alert(str);
        });
    }
};
//now the this keyword in the callback points to the object itself. 
//BEST PRACTICE: Always use arrow functions when you want to preserve the this keyword. 
box6.clickMe();

/*
// ES6 Another Example
const box66 =  {
    color: 'green',
    position: 1,
    clickMe: () => { 
        // this method here also shares the lexical this keywords from its surroundings (the global context)
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color; //this will become undefined because it now points to the global context
            alert(str);
        });
    }
};
//SAYS UNDEFINED AGAIN
box66.clickMe();
*/

// ES5 
function Person(name) {
    this.name = name;
}

Person.prototype.myFriends5 = function (friends) {
    var arr = friends.map(function (el) {
        return this.name + ' is friends with ' + el; //this points to the window object and not the Person object.
    }.bind(this)); //SOLUTION: bind creates a copy of this function that points back to the object
    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function (friends) {
    //this callback function does not have its own keyword, therefore it shares the lexical this keyword from surroundings which is this function that points back to the object
    var arr = friends.map(el =>
        `${this.name} is friends with ${el}`);
    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('Bob').myFriends6(friends);


///////////////////////////////////////////////
// Lecture: Destructuring
// Destructing gives us a very convienient way to extract data from data structure like an object or an array. 

// ES5
// Extract each elements in an array and store them in a variable. 
var john = ['John', 26];
var name = john[0];
var age = john[1];

// ES6
// will create two constants called name and year and stores it accordingly  
const [name66, age66] = ['John', 26];
console.log(name66);
console.log(age66);

// works for objects also
const obj = {
    firstName66: 'John',
    lastName66: 'Smith'
};

//destructure the same way of structuring the object (square brackets for array, curly for objects)
//the name of the variable must be the same as the property of the object
const {firstName66, lastName66} = obj;
console.log(firstName66);
console.log(lastName66);

//destructuring into different name that does not match with key names
const {firstName66: a, lastName66: b} = obj;
console.log(firstName66);
console.log(lastName66);

// A more practical example of destructuring
// Return more than one value from a function. In ES5, usually will return an object.
function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age]; //can now return an array
}

//use destruturing to unpack the values
const [age2, retirement2] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement2);

///////////////////////////////////////////
// Lecture: Arrays in ES6
const boxes = document.querySelectorAll('.box'); //returns a NodeList

// ES5
// To use a prototype function, use Array.prototype.slice.call();
var boxesArr5 = Array.prototype.slice.call(boxes); //use slice to convert it into an array 
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerBlue';
});


// ES6
//Transform a NodeList into an array (a more convenient method than slice)
//The Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object (like NodeList).
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerBlue');


// ES5
/*
for(var k = 0; k < boxesArr5.length; k++) {
    //className: returns the name of the class
    if(boxesArr5[k].className === 'box blue') {
        //continue;
        break;
    }
    boxesArr5[k].textContent = 'I changed to blue!';
};
*/

// ES6 (for-of loop)
for(const cur of boxesArr6) {
    if(cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}

// New Array Methods
// ES5
// Find children who are already of full age
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(cur) {
    return cur >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6
// findIndex() method: pass a callback into it and it's then gonna return us the index of the array where the callback function returns true. 
console.log(ages.findIndex(cur => cur >= 18)); //retuns the index that returns true for the callback function
//find() returns the item that returns true for the callback function
console.log(ages.find(cur => cur >= 18));

////////////////////////////////////////
// Lecture: Spread Operator
// Convenient way to expand the elements of an array

function addFourAges(a, b, c, d) {
    return a + b + c + d;
};

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [18, 30, 12, 21];
//apply: callFourAges will elements in ages as arugment. The null is the argument for this, but here null is sufficient.
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6
// Spread operator
// Spread operator (...) expands the array into its components and pass them as arugments.
const sum3 = addFourAges(...ages);
console.log(sum3);

//joining two arrays
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
//expands the array into their elements and joining them together
const bigFamily = [...familySmith, ...familyMiller, 'Lily'];
console.log(bigFamily);

//NodeList example. 
const h = document.querySelector('h1'); //this is simply a Node
const boxes6 = document.querySelectorAll('.box');
//Spread NodeList and combine it with Node
const all = [h, ...boxes6];
Array.from(all).forEach(cur => cur.style.color = 'purple');

///////////////////////////////////////
// Lecture: Rest parameters
// Rest parameters allows us to pass an arbitrary number of arguments into a function, and use these arguments in that function. Look exactly the same like the spread operator, but very different in nature. 

// ES5
// IN ES5, if we want to receive an undefined number of arguments, simply dont define any parameters from our function, then use the arguments keyword to access the arguments passed. (very similar to this variable)
function isFullAge5() { 
    //special variable accessible in all functions //not an array, but an array-like structure.
    console.log(arguments);
    //convert to an array
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((2018 - cur) >= 18);
    })
};

isFullAge5(1990, 1999, 1965);
isFullAge5(1990, 1999, 1965, 2016, 1987);

// ES6
function isFullAge6(...years) {
    //will transform all the arguments supplied into an array
    //console.log(years);
    years.forEach(cur => console.log((2018 - cur) >= 18));
}
isFullAge6(1990, 1999, 1965, 2018, 1997);
// The big difference between the spread operator and the rest parameter is in the place that we used them. IMPORTANT: The spread operator is used in the function call while the rest operator is used in the function declaration. 

// Another example: accept another paramter that acts as the age limit. 
// ES5
function isFullAge5_2(limit){
    var argsArr = Array.prototype.slice.call(arguments, 1); //start copying a new array from index 1 so that the limit is not included in argsArr

    argsArr.forEach(function(cur) {
        console.log((2018 - cur) >= limit);
    })
}
isFullAge5_2(21, 1990, 1999, 1965, 2018);

// ES6
function isFullAge6_2(limit, ...years) {
    years.forEach(cur=> console.log((2016 - cur) >= limit));
}
isFullAge6_2(16, 1990, 1999, 1965, 2016, 1987);