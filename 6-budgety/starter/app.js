// Module pattern - data encapsulation 
// BUDGET CONTROLLER
var budgetController = (function() {
    /**
     * Code Explanation and Demo
     * ---------------------------
    //both x and the add function are not accessible from the outside scope
    var x = 23;
    var add = function(a) {
        return x + a;
    }1
    return {
        //only publicTest is exposed to the public (API)
        //publicTest will still have the access to x and add() after the IIFE is executed because of closure 
        publicTest: function(b) {
            return add(b);
        }
    }
    */
    
    //function constructor
    //NOTE (As stated in the previous lecture): 'new' keyword that is used with the function constructor creates a new empty object and then calls the function constructor(Expense in this case) and points to this keyword of that function to the new object that was created. this.id = id sets the id of the new object. 
    var Expense = function(id, description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    //Function prototype to calculate percentage of expense value over income 
    Expense.prototype.calcPercentage = function(totalIncome) {
        // to prevent divide by zero error
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    // Getter function to retrieve percentage
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    // Function constructor for Income 
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // sums up all the value in exp/inc array
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value; //cur is Expense/Income object
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 // usually use -1 to denote something that is non-existent
    };
    
    return {
        addItem: function(type, des, val) {  

            var newItem, ID;
            // ID will be the id of the last item + 1
            // only increment if the id is greater than 0 
            ID = (data.allItems[type].length > 0) ? data.allItems[type][data.allItems[type].length-1].id + 1 : 0; 
            //Create new item based on 'inc' or 'exp' type
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if(type == 'inc') {
                newItem = new Income(ID, des, val); 
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new item
            return newItem;
        },

        deleteItem: function(type, id) {

            var ids, index;
            // Array.map(): similar to Array.forEach(). Difference is map() returns a brand new array while foreach() mutates the existing stuff. Here, ids will be an array of same length as data.allItems[type] but it only contains the id and not the object. Eg: ids = [1 2 4 6 8]
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            // get the index of the id to be deleted. Eg: if id = 4 then the index will be 2 (refering to the example above). Note: indexOf() will return -1 if the item is not found 
            index = ids.indexOf(id);
            
            if(index !== -1){
                //new method: splice() - used to remove elements, slice() - used to create a copy. splice() first argument: the position number at which we want to start deleting. second args: the number of elements that we want to delete. 
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function() {
            
            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we spent (Only calculate when inc more than 0 to prevent divide by zero error)
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage =  -1;
            }
        }, 

        // calculate the percentage for all of the object in the list
        calculatePercentages: function() {
           data.allItems.exp.forEach(function(cur) {
               cur.calcPercentage(data.totals.inc);
           });
        },

        // get the percentages array
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        // Returns the data needed to populate the UI
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        // to log the data to console
        testing: function() {
            console.log(data);
        }
    }
})();

//UI CONTROLLER 
//UIController and budgetController are independent of each other (Separation of concerns)
var UIController = (function() {
    //TIPS: Store static strings in an object for easier maintenance
    //private object variable to store the class and id names (DOM Strings)
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber =  function(num, type) {
        var numSplit, int, dec, type;
        /**
        * + or - before number 
        * exactly 2 decimal points
        * comma separating the thousands
        * 2310.4567 -> +2,310.46
        * 2000 -> + 2,000.00
        */

        // 1. remove the signs 
        num = Math.abs(num);
        // 2. Take care of decimal numbers
        //Note: toFixed() is not part of the Math function but instead is part of the Number wrapper class. Primitive data types will also have their own methods because of wrapper class. (will be converted to objects). toFixed() will round the number to the nth decimal place where n is the arugment.   
        num = num.toFixed(2); 

        // 3. Split the number into integer part and decimal part
        numSplit = num.split('.');
        //integer part of the number
        int = numSplit[0];
        //decimal part of the number
        dec = numSplit[1];

        // puts in the comma for thousands
        if(int.length > 3) {
            int = int.substr(0, int.length-3) + ',' + int.substr(int.length-3, 3); //input 2310, output 2,310
        }

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
        
    };

    // create a own custom method forEach() for the NodeList 
    // First class functions concept(IMPORTANT!)
    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
            // params for callback function is
            // 1. current - the current object that is being iterated
            // 2. index - the current index of the object that is being iterated
            callback(list[i], i);
        }
    }

    return {
        //read data from our UI
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                //Converts the string number to number
                //parseFloat parses a string to a decimal
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        // Updates the UI with the newest item added
        addListItem: function(obj, type) {
            var html, newHTML, element;
            //1. Create HTML string with placeholder text
            if(type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //2. Replace placeholder text with actual data
            //new function: string.replace
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description); 
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

            //3. Insert the HTML into the DOM
            //new function: element.insertAdjacentHTML()
            //insertAdjacentHTML() parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.A DOMString representing the position relative to the element; must be one of the following strings:'beforebegin': Before the element itself.'afterbegin': Just inside the element, before its first child.'beforeend': Just inside the element, after its last child.'afterend': After the element itself.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        deleteListItem: function(selectorID) {
            // javascript only allows to removechild so need to backtrack one level to its parent node. 
            // selector id is the item id. Eg: inc-0
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            // querySelectorAll: accepts parameter string
            // returns a list (similar to an array but dont have functions for array) of all the elements selected
            var fields,fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            //convert the list into an array using slice
            fieldsArr = Array.prototype.slice.call(fields);
            //accepts 3 param: cur - value of the array that is currently being processed, index: the number going from zero to length -1 and array: the array itself
            // Loops over all the fields value and clears them
            fieldsArr.forEach(function(curr, index, array) {
                curr.value = "";
            });
            //return the focus back to the first field (which is the description)
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {

            // if the budget is > 0 then prepend '+' else prepend '-' ("inc" is + "exp" is -)
            var type;
            type = (obj.budget >= 0) ? "inc" : "exp";
            
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            //always + for income
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            //always - for expenses
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            //if percentage is - (i.e. only expenses or only income) then change the textContent to '---' 
            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }

        },

        // display percentages in an array. percentages arugment will be an array.
        displayPercentages: function(percentages) {
            // querySelector will only select the first item__percentage node, so use querySelectorAll to select all of them.
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel); //Returns a NodeList
            console.log(fields);

            //use custom made function for NodeList to iterate
            nodeListForEach(fields, function(current, index) {
                //textContent used to change the content of a html element
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function() {
            var now, year, month, months;
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            now = new Date();
            //different way
            //var christmas = Date(2018, 11, 25); // will return a date with christmas(not often used)
            year = now.getFullYear(); //will return the year
            month = now.getMonth(); //will return the month
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changeType: function() {
            var fields = document.querySelectorAll(DOMStrings.inputType + ',' +
            DOMStrings.inputDescription + ',' +
            DOMStrings.inputValue);
            nodeListForEach(fields, function(current) {
                //toggle adds the class if it is not there, and removes it when it is there
                //The Element.classList is a read-only property which returns a live DOMTokenList collection of the class attributes of the element.
                current.classList.toggle('red-focus');
            });

            //change the color of the butten to red
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
        },

        // expose DOMStrings via a public function (API)
        getDOMStrings: function() {
            return DOMStrings;
        }
    }
})();

// GLOBAL APP CONTROLLER
// pass in two other controllers as arguments
var controller = (function(budgetCtrl, UICtrl) {

    // setup event listeners
    var setupEventListeners = function(){
        // Get DOMStrings from UICtrl
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        
        //happens on the global webpage so no need querySelector
        document.addEventListener('keypress', function(event) {
            //Keycode(ASCII) for enter is 13 
            //console.log(event);
            //'which' is used for older browsers
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        //Event delegation: set event listener in the parent element and wait for the event to bubble up. Then, in the callback function, use event.target to identify the target element and proceed from there.
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        //add Event listener to the combobox to listen whenever the value changes
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    }

    /**    
    //can simply use budgetController here, but breaks encapsulation rule. Solution: pass in budgetController and UIController as arugments
    //Here, z is the value returned from add() above
    var z = budgetController.publicTest(5); 
    return {
        anotherPublic: function() {
            console.log(z); //again, z is accessible because of closure
        }
    }
    **/

    var updatePercentages = function() {
       
        // Calculate percentages
        budgetCtrl.calculatePercentages();

        // Read precentages from the budget controller 
        var percentages = budgetCtrl.getPercentages();
        //console.log(percentages);

        // Update the UI with the new percentages 
        UICtrl.displayPercentages(percentages);
    };

    var updateBudget =  function() {
        //5. Calculate the budget
        budgetCtrl.calculateBudget();
        //6. Return the budget 
        var budget = budgetCtrl.getBudget();
        //7. Display the budget on the UI
        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem = function() {
        var input, newItem;
        //TODO: 
        //1. Get the field input data
        input = UICtrl.getInput();

        //isNaN: returns true if the argument is a number, false otherwise
        //checks whether the description is not empty and the value is not empty and > 0
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }
    };

    //callback function for event listener always has access to event object
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, ID;
        //target element where the event is fired(the location of the id is hardcoded here)
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; 
        console.log(itemID); //will be in the format of inc-1
        // will be coerced to true if defined
        if(itemID) {
            // itemID in format inc-1
            // will be split into an array the inc/exp will be splitID[0] and the id will be splitID[1]
            splitID = itemID.split('-');
            type = splitID[0];
            //convert the string integer that is split into integer
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new total (budget)
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }
  
    };

    return {
        //code that will be executed straight when the application starts
        init: function() {
            console.log("Application started!");
            //display the month and year via Date object
            UICtrl.displayMonth();            
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners(); //setup event listeners during initialisation
        }
    }
})(budgetController, UIController); //pass in the arguments for the IIFE

//only line of code that is placed outside of the controllers
controller.init();
