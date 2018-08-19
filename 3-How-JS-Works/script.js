///////////////////////////////////////
// Lecture: Hoisting

/* 
calculateAge(1990);
//still works if called func before func declaration (func statement)
//hoisting only works for function declaration
function calculateAge(year) {
    console.log(2016 - year);
}


//retirement(1990);
//doesnt work if function is called before
//func declaration(func expressions)
//reason is the variable of retirement is //undefined at the time of execution 
var retirement = function(year) { 
    console.log(65 - (2016 - year));
}

//Hoisting also happens with variables but //with a different way
//in the creation phase, the code is scanned for variable objects and then set to undefined
//if you console.log(age) without declaring age then it will throw the error age is not defined
//console.log(age); //undefined
var age = 23;
//console.log(age);

function foo() {
    console.log(age); //undefined
    var age = 65;
    console.log(age); //this age points to the age variable in the execution context object of foo
}
foo();
console.log(age); //this age points to the age variable global execution context
 */












///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
//output Hello!Hi!Hey!
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(c); //c is not defined
    //function third can only access variable a and d
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword
// Regular function call: the this keyword // points at the global object(the window // object, in the browser)
// Method call: the this keyword points to
// the object that is calling the method
//
//console.log(this);/
calculateAge(1990);
function calculateAge(year) {
    console.log(2016 - year);
    console.log(this); //this points to window in this case
}
var john = {
    name: "John",
    yearOfBirth: "1990",
    calculateAge: function() { 
        console.log(2016 - this.yearOfBirth);
        console.log(this); //points to the john object

/*         function innerFunction() {
            console.log(this); //points to the window object(?) because it is a regular function written inside a method
        }
        innerFunction(); */
    }
}

john.calculateAge();

var mike = {
    name: "Mike",
    yearOfBirth: 1984,

};

//method borrowing
//this keyword is not assigned a value until a function where it is defined is actually called
mike.calculateAge = john.calculateAge;
mike.calculateAge();





