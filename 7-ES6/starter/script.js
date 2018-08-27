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
    //this callback function does not have its own this keyword, therefore it shares the lexical this keyword from surroundings which is this function that points back to the object
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
console.log(a);
console.log(b);

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

////////////////////////////////////////
// Lecture: Default parameters
// Preset parameters when no arguments is supplied

// ES5 
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {
    //simple ternary operator for default parameters. If it is undefined(ie. not supplied) simply assign to default value
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

//Javascript actually allows us to call any function without specifying all of the arguments. (It assigns undefined for parameters that are not supplied) 
var john5 = new SmithPerson5('John', 1990);
var emily5 = new SmithPerson5('Emily', 1983, 'Diaz', 'spanish'); //Diaz and spainish overrides the default value lastName and nationality


// ES6
// specify the default value of the parameters in function declaration
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john6 = new SmithPerson6('John', 1990);
var emily6 = new SmithPerson6('Emily', 1983, 'Diaz', 'spanish'); 

/////////////////////////////////////////////////////////////////////////////////
// Lecture: Maps (new Data Stucture)
// In Maps, we can use any primitive values like numbers, strings or Booleans for the keys, even functions and objects. Unlike objects, can only use string. 

const question = new Map();
//set() accepts a key-value pair
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015'); //official name
question.set(4, 'ES7'); //most current version but not official name
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

//retrieve data from the map
console.log(question.get('question'));
//console.log(question.size); //gets the length of map

//can use Map.has() to check whether an entry exists or not
/*
if(question.has(4)) {
    //question.delete(4); //delete a key-value pair
    console.log('Answer 4 is here');
}
question.delete(4); // Nothing happens if an entry gets deleted twice

//delete all the elements from the map
//question.clear();

// Maps are iterable(can loop)
// Callbacks has access to the value, key and the map itself
question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));
*/

// For-of loops in map
// question.entries() return all entries
// use destructuring to unpack the element into key and value 
for(let [key, value] of question.entries()) {
    //typeof() built-in javascript function
    if(typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt("Write the correct answer"));
console.log(question.get(ans === question.get('correct')));

//Why maps are better to create hashmaps than objects?
//1. can use anything as keys.
//2. Maps are iterable but objects are not
//3. can get the size easily using Map.size
//4. can add and delete easily. 

///////////////////////////////////////////
// Lecture: Classes
// Classes are called function constructors in ES5. Classes are syntatic sugar for function constructors.

// ES5
//This is written in function expression
//Alternative is function declaration
//Eg:
//function Person5(yada, yada) { }
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');

// ES6
class Person6 {
    // function constructor is replaced with class constructor
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greeting() { 
        console.log('Hey there!');
    }
}

const john66 = new Person6('john', 1990, 'teacher');
Person6.greeting();

// IMPORTANT POINTS:
// 1. Class definitions are not hoisted, so unlike function constructor, we need to implement a class and only later in our code start using it.
// 2. Can only add methods to classes but not properties (unlike function constructors), however inheriting properties through the object instances is not a good practice.  

/////////////////////////////////
// Lecture: Classes and Subclasses (Inheritance)
// ES5
//Person5 is the superclass
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicgames, medals) {
    //calling superclass function constructor
    //When creating a new athlete object, new creates a new empty object, calls the athlete function constructor and sets the this keyword to the newly create object. The this keyword below will point to the new empty Athlete object. 
    Person5.call(this, name, yearOfBirth, job);
    this.olympicgames = olympicgames;
    this.medals = medals;
}

//Object.create allows us to manually set the prototype of an object and we want the prototype of the athelete to be the prototype of the Person (to connect them together)
//Link together the prototype chain
//Athlete5 inherits the prototype of Person5 and in turn gets access to the calculateAge() function that is inside the prototype property of Person5
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

var johnAthlete5 = new Athlete5('john', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge(); //inherited from Person5
johnAthlete5.wonMedal(); //Athlete own method

// ES6
class Person66 {
    // function constructor is replaced with class constructor
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete66 extends Person66 {
    constructor(name, yearOfBirth, job, olympicgames, medals) {
        super(name, yearOfBirth,job);
        this.olympicgames = olympicgames;
        this.medals = medals;
    }

    wonMedal(){
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete66('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, numTrees, parkArea) {
        super(name, buildYear);
        this.numTrees = numTrees;
        this.parkArea = parkArea; //in km2 unit
    }

    calcTreeDensity() {
        const density = this.numTrees / this.parkArea;
        console.log(`Park ${this.name} has a tree density of ${density} trees per square km. `);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    //classify according to size using hashmaps
    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`Street ${this.name}, build in ${this.buildYear} is a ${classification.get(this.size)} street `);
    }
}

let allParks = [new Park('1', 1987, 0.2, 215),
             new Park('2', 1894, 3541, 2.9),
             new Park('3', 1953, 1001, 0.4)];

let allStreets = [new Street("A", 1493, 1.1, 4),
               new Street("B", 2008, 2.7, 2), //using default parameter
               new Street("C", 2009, 0.8, 4),
               new Street("D", 1997, 0.12, 1)];

function reportParks(p) {
    console.log(`-------PARKS REPORT--------------`);
    //Density
    console.log('1. Tree Density');
    p.forEach(cur => cur.calcTreeDensity());

    //Average Age
    console.log('2. Average age of parks');
    // Generate an array of all the ages before calculating the average
    const ages = p.map(cur => new Date().getFullYear() - cur.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`The average age of the parks is ${avgAge} years.`);
    
    //More than 1000 trees
    console.log('3. Park that has more than 1000 trees');   
    //function chaining
    //Problem: findIndex only finds the first element that satisfies the callback function not ALL
    //Solution: use array.filter()
    //const index = p.map(cur => cur.numTrees).findIndex(cur => cur >= 1000);
    p.filter(cur => cur.numTrees >= 1000).forEach(cur => console.log(`Park ${cur.name} has more than 1000 trees.`));
}

function calc(arr) {
    //New method: reduce() (ES5 methods)
    //have access to the current value and the current index, but also the previous value 
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0); //0: the initial value of the accumulator

    // using destructuring to return two values 
    return [sum, sum / arr.length];
}

function reportStreets(s) {
    console.log(`-------STREETS REPORT--------------`);

    //Total and average length of the town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);
    // Classifiy by size
    s.forEach(el => el.classifyStreet()); 
}

reportParks(allParks);
reportStreets(allStreets);
