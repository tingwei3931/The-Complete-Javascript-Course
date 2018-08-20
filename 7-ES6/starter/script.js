/**
 * Modern Javascript ES6 or ES2015 (The * * old javascript previously learnt is ES5)
 * ES6/ES2015
 * ES7/ES2016
 * ES8/ES2017
 * Well supported in all modern browsers
 * No support in older browsers
 * Can use most features in production *with transpiling and polyfiling(converting to ES5)
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
// NOTE: variables declared in ES5 are function-scoped, but varables declared in ES6 are block-scoped. Example:

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
    let firstName = 'John';
    //const must be initialised in the same line it is declared    
    const yearOfBirth = 1900;
    if (passedTest) {
        // Block: codes that are wrapped between two curly brackets.
        // firstName and yearOfBirth is only accessible inside this if-block.
        firstName = 'John';
    }
    console.log(firstName + ' born in ' + yearOfBirth + ', is now officially allowed to drive a car '); // firstName is not defined. Because ES6 is block-scoped. FirstName is defined inside the if-block. Any reference outside of its scope is undefined.
}
driversLicence6(true);

// ES5
var j = 23;
for(var j = 0; j < 5; j++) {
    console.log(j); //23 will be overwritten by this new j 
}
console.log(j); //will print 5 (the i declared in the loop)

// ES6
let i = 23; //different from the i in the loop
for(let i = 0; i < 5; i++) {
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
(function() {
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
var ages5 = years.map(function(current) {
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
    return  `Age element ${index+1}: ${2018 - el}`;
});
console.log(ages6);

////////////////////////////////////////
// Lecture: Arrow Functions 2 
// Arrow functions share the surrounding this keyword. This means that, unlike normal functions, arrow functions dont get their own this keyword. They have a lexical this keyword. 

// ES5
var box5 =  {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this; // the this here points to the object itself
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color; //if used with the normal this keyword, the this will point to the window object.
            alert(str);
        });
    }
};

//both this.position and this.color will display undefined 
//EXPLANATION: only in a method call, that the this keyword will point to an object itself. In a regular function call, the keyword will always point to the global object, which in the browser is the window object. the callback for the addEventListener() is a regular function call, that is why the this is refering to the window object and not the box5 object. SOLUTION: create a new variable to store the this variable.
box5.clickMe(); 

// ES6
const box6 =  {
    color: 'green',
    position: 1,
    clickMe: function() {
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

Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function(el) {
        return this.name + ' is friends with ' + el; //this points to the window object and not the Person object.
    }.bind(this)); //SOLUTION: bind creates a copy of this function that points back to the object
    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function(friends) {
    //this callback function does not have its own keyword, therefore it shares the lexical this keyword from surroundings which is this function that points back to the object
    var arr = friends.map(el => 
        `${this.name} is friends with ${el}`);
    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('Bob').myFriends6(friends);
