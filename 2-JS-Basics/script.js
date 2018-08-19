/* var name = "John";
console.log(name);

//camel case (string)
var lastName = "Smith";
console.log(lastName);

//Lecture: variables
//number
var age = 26;
console.log(age);

//boolean 
var fullAge = false;
console.log(fullAge);

//undefined
var a;
console.log(a);

//null
var b = null;
console.log(b);

//Primitive Javascript Data Tyoes
//Number: Floating point numbers, for decimals and integers
//String: Sequence of characters, used for text
//Boolean: Logical data type that can only be true or false
//Undefined: Data type of a variable which does not have a value yet
//Null: Also means 'non-existent'


//Javascript always have floating point numbers. Eg: 5 is 5.0
//undefined is assigned if you do not assign it to anything
//null: more specific
//Javascript has dynamic typing

//////////////////////////////////////////////////
//Lecture: Variables 2 
//string + age = string
//Type coercion
//Automatically converts on the fly when it needs it 
var name = "John";
var age = 26;

//console.log(name + age);
//console.log(age + age);

//define more than one variable
var job, isMarried;

//console.log(job); //undefined
job = 'teacher';
isMarried = true;
//type coercion works here
console.log(name + " is a " + age + " years old " + job + ". Is he married? " + isMarried + ".");

age = 'thirty six';
job = 'driver';

console.log(name + " is a " + age + " years old " + job + ". Is he married? " + isMarried + ".");

//get data from console
var lastName = prompt("What is the last name? ");
console.log(lastName);

//alert window
alert(name + " is a " + age + " years old " + job + ". Is he married? " + isMarried + "."); */

/* 
/////////////////////////////////////////
//Lecture: operators
var now = 2016;
var birthYear = now - 26;
birthYear = now - 26 * 2;
//2016 - 52
//1964
console.log(birthYear);
//Operator Precedence
//Operator Precedence Table
//Associativity: if there are two operators with the same precedence, associativity determines whether the operators are excecuted from left to right or vice versa.

var ageJohn = 30;
var ageMark = 30;
ageJohn = ageMark = (3 + 5) * 4 - 6;
//to override precedence use parentheses
ageJohn++; //or ageJohn += 1
ageMark *= 2; //ageMark = ageMark * 2;
console.log(ageJohn);
console.log(ageMark); 

// 2018 COURSE UPDATE
var now = 2018;
var yearJohn = 1989;
var fullAge = 18;

var isFullAge = now - yearJohn >= fullAge;
console.log(isFullAge); // returns true
//operator minus is evaluated first before greater than operator
var ageJohn = now - yearJohn;
var ageMark = 35;
var average = (ageJohn + ageMark) / 2; //divide will be evaluated first
console.log(average);

// Multiple assignments
var x, y;
x = y = (3 + 5) * 4 - 6; // 8 * 4 6 // 32 - 6 // 26
console.log(x,y);

// More operators
x = x * 2;
x *= 2;
console.log(x);
x += 10;
console.log(x);
// increment operators
x++;
console.log(x);
x--;
console.log(x);

*/
/*****************************
* CODING CHALLENGE 1
*/

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 
GOOD LUCK 😀
*/

/** MY ANSWER 
var massMark = 10;
var massJohn = 20;
var heightMark = 150;
var heightJohn = 180;
var bmiMark = massMark / (heightMark * heightMark);
var bmiJohn = massJohn / (heightJohn * heightJohn);

var isBMIHigher = bmiMark > bmiJohn;
console.log("Is Mark's BMI higher than John's? " + isBMIHigher);
*/
//////////////////////////////////////////////////////
//Lecture: if/else statements
/*
var name = "John";
var age = 26;
var isMarried = "yes";

if (isMarried === "yes") {
    console.log(name + ' is married!');
} else {
    console.log(name + ' will hopefully marry soon :)');
}

isMarried = false;

if (isMarried) {
    console.log("YES!");
} else {
    console.log("NO!");
}

//NOTE: double equal does type coercion and the triple equal does not
//In practice always use triple equals
if (23 == "23") { //returns true after type coercion
    console.log("Something to print");
}

if (!(23 === "23")){ //return false
    console.log("Does not do type coercion");
}
 */

/* 
/////////////////////////////////////////////
//Lecture: Boolean logic and switch
var age = 20;
if (age < 20) {
    console.log("John is a teenager.");
} else if (age >= 20 && age < 30) {
    console.log("John is a young man.");
}  else {
    console.log("John is a man.");
}

var job = 'teacher';

job = prompt("What does john do?");

switch(job){
    case 'teacher':
        console.log("John teaches kids.");
        break;
    case 'driver':
        console.log("John drives a cab in Lisbon.");
        break;
    case 'cop':
        console.log("John helps fight crime.");
        break;
    default:
        console.log("John does something else.");
} */

/*
/////////////////////////////////////////////
//Lecture: Truthy and Falsy values and equality operators
// Falsy value is a value that is considered false when evaluated in an if/else statement condition.

// Falsy values in Javascript: undefined, null, 0, '', NaN
// Truthy values: NOT falsy values
var height = ''; 
if (height || height === 0) {
    console.log('Variable is defined');
} else {
    console.log("Variable has NOT been defined");
} 
*/



/* 
///////////////////////////////////////
// Coding Challenge 1
var heights1 = 175;
var heights2 = 150;
var heights3 = 186;
var age1 = 12;
var age2 = 18;
var age3 = 25;
var score1 = heights1 + 5 * age1;
var score2 = heights2 + 5 * age2;
var score3 = heights3 + 5 * age3;
if(score1 > score2 && score1 > score3){
    console.log("Player 1 wins! Score: " + score1);
} else if (score2 > score1 && score2 > score3){
    console.log("Player 2 wins! Score: " + score2);
} else if (score3 > score1 && score3 > score2){
    console.log("Player 3 wins! Score: " + score3);
} else {
    console.log("It's a draw! Score: " + score1);
}
 */

/*
///////////////////////////////////////
// Coding Challenge 2
var avgJohn = (116 + 94 + 123) / 3;
var avgMike = (116 + 94 + 123) / 3;
var avgMary = (97 + 134 + 400) / 3;
console.log(avgJohn, avgMary, avgMike);
if (avgJohn > avgMike && avgJohn > avgMary) {
    console.log("Winner is John! Average: " + avgJohn);
} else if (avgJohn < avgMike && avgMary < avgMike) {
    console.log("Winner is Mike! Average: " + avgMike);
} else if(avgJohn < avgMary && avgMike < avgMary) {
    console.log("Winner is Mary! Average: " + avgMary);
} else {
    console.log("It's a draw! Average: " + avgJohn);
}
*/


/* 
////////////////////////
//Lecture: Functions 
//return value
function calculateAge(yearOfBirth) {
    var age = 2016 - yearOfBirth;
    return age;
}

var ageJohn = calculateAge(1990);
var ageMike = calculateAge(1969);
var ageMary = calculateAge(1948);

//doesnt return value
function yearsUntilRetirement(name, yearOfBirth) {
    var age = calculateAge(yearOfBirth);
    var retirement = 65 - age;
    if (retirement >= 0)
        console.log(name + ' has ' + retirement + ' years left until retirement.');
    else
        console.log(name + ' is already retired.');
}

yearsUntilRetirement('John', 1990);
yearsUntilRetirement('Mike', 1969);
yearsUntilRetirement('Mary', 1948); */

/* 
////////////////////////////////////////
//Lecture: Statements and expressions
//function statement
function someFun(par) {
    //code
}

//function expression
var someFun = function(par) {
    //code
}

//difference between a statement and a expression is that expression produces a value and outcome while statement performs an action

//Expressions
3 + 4;
var x = 3;

//statements
if (x === 5){
    //do something
} */

/* 
////////////////////////////////////
//Lecture: Arrays
var names = ['John', 'Jane', 'Mark'];
var years = new Array(1990, 1969, 1948);

console.log(names[1]);
names[1] = "Ben";
console.log(names);

var john = ['John', 'Smith', 1990, 'designer', false];
//add to the end of array
john.push('blue');
//add to the front of array
john.unshift('Mr.');
//remove last index
john.pop(); 
//remove first index
john.shift();
console.log(john);
alert(john.indexOf("Smith")); //returns -1 if not found

if(john.indexOf('teacher') === -1) {
    console.log("John is not a teacher.");
}
 */

/*
///////////////////////////////////////
// Coding Challenge 3
var bills = [124, 48, 268];
var tips = [];
var paidAmount = [];
function calculateTip(bills) {
    for(var bill of bills) {
        var tip;
        if (bill < 50) {
            tip = bill * 0.2;
        } else if(bill >= 50 && bill <= 200) {
            tip = bill * 0.15;
        } else {
            tip = bill * 0.1;
        }
        tips.push(tip);
        paidAmount.push(bill + tip);
    }
    console.log("Tips: " + tips);
    console.log("Amount Paid: " + paidAmount);
}

calculateTip(bills);
*/


/*
///////////////////////////////////////
//Lecture: Objects
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false
};

console.log(john.lastName);
console.log(john['lastName']);

var xyz = 'job';
console.log(john[xyz]);

john.lastName = 'Miller';
john['job'] = 'programmer';

console.log(john);


var jane = new Object();
jane.name = 'Jane';
jane.lastName  = 'Smith';
jane['year'] = 1969;
jane['job'] = 'retired';
jane['isMarried'] = true;

console.log(jane); */

///////////////////////////////////
//Lecture: Objects and methods
//Ver. 1.0
/* 
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false,
    family: ['Mary','Jane', 'Bob'],
    //function expressions not statement
    calculateAge: function() {
        //this refers to the object john
        return 2017 - this.yearOfBirth;
    }
};

console.log(john.calculateAge());

var age = john.calculateAge();
john.age = age;
console.log(john);

//v2.0
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false,
    family: ['Mary','Jane', 'Bob'],
    //function expressions not statement
    calculateAge: function() {
        //this refers to the object john
        //return 2017 - this.yearOfBirth;
        this.age = 2017 - this.yearOfBirth;
    }
};

john.calculateAge();
console.log(john);
*/

/*
///////////////////////////////////////
// Coding Challenge 4
var john = {
    fullname: 'John',
    mass: 70,
    height: 170,
    calculateBMI: function() {
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
};

var mark = {
    fullname: 'Mark',
    mass: 50,
    height: 160,
    calculateBMI: function() {
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
};

if(mark.calculateBMI() > john.calculateBMI()) {
    console.log("Mark has highest BMI! BMI: " + mark.BMI);
} else if (mark.BMI < john.BMI) {
    console.log("John has the highest BMI! BMI: " + john.BMI);
} else {
    console.log("Same BMI! BMI: " + mark.BMI);
}
*/

//////////////////////////////////
//Lecture: Loops

/* for (var i = 0; i < 10; i++) {
    console.log(i);
}
 */

/*
0, true, print 0, update i to 1
1, true, print 1, update i to 2
.
.
.
9, true, print 9, update i to 10
10, False, end loop!
*/

/* var names = ['John', 'Jane', 'Mark', 'Mary', 'Bob']; */

/* 
//loop array
for (var i = 0; i < names.length; i++) {
    console.log(names[i]);
}

///reverse order
for (var i = names.length-1; i >= 0; i--){
    console.log(names[i]);
} */

/* 
//while loops
var i = 0;
while(i < names.length) {
    console.log(names[i]);
    i++;
}

//for/of loops
//print the item of the array
for(var name of names)
    console.log(name);

//for/in loops
//print the index of the array
for(var name in names)
    console.log(name);

for (var i = 1; i <= 5; i++){
    if (i === 3){
        //skips the body of the loop and
        //proceeds to the next iteration
        continue;
    }
    console.log(i);
} */

/*
//////////////////////////
//Coding Challenge 2

var printFullAge = function(yearsBorn) {
    var ages = [];
    for (var year of yearsBorn){
        ages.push(2017 - year);
    }
    var isLegal = [];
    for (var age of ages){
        if (age >= 18) {
            console.log("Full age. Age: " + age);
            isLegal.push(true);
        } else {
            console.log("Not full age. Age: " + age);
            isLegal.push(false);
        }
    }
    return isLegal;
};

var a1 = [1965, 2008, 1992];
var a2 = [1454, 1234, 2000];

var full_1 = printFullAge(a1);
var full_2 = printFullAge(a2);
console.log(full_1);
console.log(full_2);
*/


///////////////////////////////////////
// Coding Challenge 5
var john = {
    fullName: "John Smith",
    bills: [124, 48, 268, 188, 42],
    calcTips: function (){
        this.tips = [];
        this.finalValues = [];

        for(var bill of this.bills) {
            // Determine percentage based on the rules
            var percentage;
            if(bill < 50) {
                percentage = .2;
            } else if (bill >= 50 && bill < 200) {
                percentage = .15;
            } else {
                percentage = .1;
            }
            // Add results to the corresponding arrays
            this.tips.push(bill * percentage);
            this.finalValues.push(bill + bill * percentage);
        }
    }
}

var mark = {
    fullName: "Mark Miller",
    bills: [77, 475, 110, 45],
    calcTips: function (){
        this.tips = [];
        this.finalValues = [];

        for(var bill of this.bills) {
            // Determine percentage based on the rules
            var percentage;
            if(bill < 100) {
                percentage = .2;
            } else if (bill >= 100 && bill < 300) {
                percentage = .1;
            } else {
                percentage = .25;
            }
            // Add results to the corresponding arrays
            this.tips.push(bill * percentage);
            this.finalValues.push(bill + bill * percentage);
        }
    }
}

function calcAverage(tips) {
    var sum = 0;
    for(var i = 0; i < tips.length; i++) {
        sum += tips[i];
    }
    //return sum / tips.length;
    //Alternative
    return tips.reduce(function(total, next) {
        return total + next;
    }) / tips.length;
}

john.calcTips();
mark.calcTips();
//console.log(calcAverage(john.tips));
//console.log(calcAverage(mark.tips));
john.average = calcAverage(john.tips);
mark.average = calcAverage(mark.tips);
console.log(john, mark);

if(john.average > mark.average) {
    console.log("John average higher");
} else if (mark.average > john.average) {
    console.log("Mark average higher");
} else {
    console.log("Draw");
}