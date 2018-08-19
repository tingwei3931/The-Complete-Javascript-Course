//Everything is an object. (Almost everything)
//Two types of variables, primitives and objects
//Primitives:
//Number
//String
//Boolean
//Null
//Undefined

//Objects:
//Basically everything else..
//Arrays
//Functions
//Objects
//Dates
//Wrappers for Numbers, Strings and Booleans

//Object-Oriented Programming
//Objects interacting with one another through methods and properties
//Used to store data, strcture applications into modules and keeping code clean.
//Class in other programming languages are called constructor/prototype
//Constructor acts like a blueprint

//Inheritance
//When one object is based on another object
//When one object gets access to another object's properties and methods
//Eg: Person <--- Athlete
//Inheritance is made possible by a prototype property that all object possesses
/** 
//Function constructor
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

//Very common javascript patttern
var Person  = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

//Putting the function inside the prototype property so that it can be inherited by child objects
Person.prototype.calculateAge = function() {
    console.log(2016 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

//Instantiate an object of Person
//When we use the new keyword, a brand new empty object is created
//The constructor function will be called with the argument specified
//Calling a new function creates a new execution context
//in a regular function call, this points to the global object
//new keyword makes the this keyword points to the empty object created
var john = new Person('John', 1990, 'teacher');
var jane = new Person("Jane", 1969, 'designer');
var mark = new Person("Mark", 1948, "retired");

john.calculateAge();
jane.calculateAge();
mark.calculateAge();
console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

// Object.create demo
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
};

//personProto: prototype of the object to be created
var john2 = Object.create(personProto);
john2.name = 'John';
john2.yearOfBirth = '1990';
john2.job = 'teacher';

//another way to use object.create
var jane = Object.create(personProto,
{
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});

//Difference between Object.create and function constructor pattern is that Object.create builds an object that inherits directly from the one that we passed into the first argument. For function constructor, the newly created object inherits from the constructor's prototype property. One of the biggest benefits of Object.create is that it allows us to implement complex inheritance structures in an easier way than function constructors because it allows us to directly specify which object should be a prototype.


//Primitives versus. Objects
//Only 5 primitives:
//a. numbers
//b. null
//c. undefined
//d. strings
//e. booleans
//Everything else are objects
//Differences between Primitives and Objects
//1. Variables containing primitives actually hold the data inside of the variable itself. Variables associated with objects do not actually contain the object itself, but instead they contain a reference to the place in memory where the object is stored. 

// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a); //a == 46
console.log(b); //b == 23

// Objects
var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age); //obj1.age == 30
console.log(obj2.age); //obj2.age == 30

// Functions 
var age = 27;
var obj = { 
    name: "Jonas",
    city: "Lisbon"
};

function change(a, b) {
    a = 30;
    b.city = "San Francisco";
}
change(age, obj);
console.log(age); // 27
console.log(obj.city); // San Francisco
//TL;DR: primitives PASS BY VALUE, objects PASS BY REFERENCE

//First class functions:
//Functions are also objects
//Function is an instance of the Object type
//Behaves like any other object
//store functions in a variable
//pass a function as an argument to another function
//return a function from a function 
var years = [1990, 1965, 1937, 2005, 1997];

//fn is also called callback function
function arrayCalc(arr, fn) {
    var arrRes = [];
    for(var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(year) {
    return 2016 - year;
}

function isFullAge(age) {
    return age >= 18;
}

// Calculating maximum heart rate
// only valid for people between 18 and 81 ages
function maxHeartRate(age) {
    if (age >= 18 && age <= 81) {
        return Math.round(206.9 - (0.67 * age));
    } else {
        return -1;
    }
}


var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(fullAges);
console.log(rates);


// Function returning functions
function interviewQuestion(job) {
    if(job === 'designer') {
        // an anonymous function
        return function(name) {
            console.log(name + ", can you please explain what UX design is?");
        }
    } else if (job === 'teacher'){
        return function(name) {
            console.log(name + ", what subject do you teach?");
        }
    } else {
        return function(name) {
            console.log("Hello " + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion("John");
designerQuestion("John");

// can do like this
interviewQuestion('teacher')("John");

// Immediately Invoked Function Expressions(IIFE)
//Normal approach
/** 
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
*/

//can no longer access score variable from the outside (data privacy)
(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();
//console.log(score); //score not defined outside of function scope

//IIFE with arguments
(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);

//IIFE is not used to create a piece of reusable code, just to create a new scope that is hidden from the outside scope


// Closures (Hardest to understand for beginners)
function retirement(retirementAge) {
    var a = " years left until retirement.";
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

//retirement age for us
var retirementUS = retirement(66);
var retirementGermany = 
retirement(65);
var retirementIceland = retirement(67);
retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);
//alternative method
//retirement(66)(1990);
// var a is still available even if the function retirement is popped off from the execution stack

// Closures Summary: IMPORTANT!
// An inner function has always access to the variables and parameters of its outer function, even after the outer function has returned.

// Interview Question functions rewritten using closures (cleaner code)
function interviewQuestion(job) {
    return function(name) {
        if(job === 'designer') {
            console.log(name + ", can you please explain what UX design is?");
        } else if (job === 'teacher') {
            console.log(name + ", what subject do you teach?");
        } else {
            console.log("Hello " + name + ', what do you do?');
        }
    }
}
// Inner function can access the argument job because of closures
interviewQuestion("teacher")("John");

// Lecture: Bind, call and apply
// Allow us to call a function and set the this variable manually. 
// Example: 
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentleman! I\'m ' + this.name +
        ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up?  I\'m ' + this.name +
            ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. ' +
            'Have a nice ' + timeOfDay + ',');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');
// emily object use the function from john
//params: this keyword, function arguments
john.presentation.call(emily, 'friendly', 'afternoon');
// also called method borrowing

// apply: same as call but accepts the function arguments as an array
//john.presentation.apply(emily, ['friendly', 'afternoon']); //doesnt work since presentation accepts two arguments but not one
// bind: very similar to call, the difference is bind does not invoke the function immediately and just creates a copy of it

var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning'); //first argument already set
johnFriendly('night');
// IMPORTANT: Binding allows us to present arguments in the function. (Also called carrying)
// Carrying: A technique in which we create a function based on another function but with some preset arguments

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');



var years = [1990, 1965, 1937, 2005, 1997];

//fn is also called callback function
function arrayCalc(arr, fn) {
    var arrRes = [];
    for(var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(year) {
    return 2016 - year;
}

function isFullAge(limit, age) {
    return age >= limit;
}

var ages = arrayCalc(years, calculateAge);
// Carrying function for Japan
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);


///////////////////////////////////////////// CODING CHALLENGE 7

// enclosing all the code with IIFE so that all the code is private and doesnt interfere with other code

(function () {
    var Question = function(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for(var i = 0; i < this.answers.length;i++) {
            console.log(i + ": " + this.answers[i]);
        }
    } 
    
    Question.prototype.checkAnswer = function(ansGiven, callback){
        var sc;
        if(this.correctAnswer === ansGiven) {
            console.log("Correct Answer!");
            sc = callback(true); //increments the score
        } else {
            console.log("Wrong Answer! Try Again!");
            // updates and returns the current score from keepScore
            sc = callback(false); // do nothing to the score
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score) {
        console.log("Your current score is : " + score);
        console.log('======================');
    }
    
    var q1 = new Question("Ting Wei is the best?", ["Yes", "No"],
    0);
    
    var q2 = new Question("Name the seventh planet from the sun. ", ["Uranus", "Ur Momma"],
    0);
    
    var q3 = new Question("Who played Neo in The Matrix?  ", ["Keanu Reeves" , "Ting Wei", "Obama"],
    0);
    
    var questionBank = [q1, q2, q3];

    function score() {
        var score = 0;
        return function(isCorrect) {
            if (isCorrect) {
                score++;
            }
            return score;
        }
    }

    var keepScore = score(); //still can access the variable score because of closure
    function nextQuestion() {
        var n = Math.floor(Math.random() * questionBank.length); //floor to remove decimals
        questionBank[n].displayQuestion();
        var answer = prompt("Please select the correct answer:"); //converts string to a number
        if(answer !== 'exit') {
            questionBank[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }      
    }

    nextQuestion();

})();
