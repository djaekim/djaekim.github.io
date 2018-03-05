// module pattern = ARCHITECTURE OF THE APPLICATION
// IIFE creates new scope that is not accessible from outside scope
// the secret of module pattern is that it returns object that we want to be public

//BUDGETCONTROLLER
//  ======= [5] ============
var budgetController = (function(){
 // we need data model for income and expanses
// we want distinguish between different income and expanses by unique id = use object
// if we need lots of object = we can use function constructor
/* also if we need methods for the function constructor below we can put it in their prototypes
  so all object will inherit these methods  from prototype
  - below are private functions if you were to put this outsid you will get error

  - also when you are using f(x) constructor = to create a new functions
  you have ot use new keyword = creates new empty object - and then calls the
  function then pt the "this" of the functions to the new objet that is crated
  .. so when you set "this" it is set on new object

  - data structure of budget controller - namely, if the user put 10 incomes
  , then we create 10 income object ... so you can store them into an array



  =============================
*/
   var Expense = function(id, description, value){
       this.id = id;
       this.description = description;
       this.value = value;
       this.percentage = -1;
   }
   Expense.prototype.calcPercentage = function(totalIncome){
       if (totalIncome > 0){
          this.percentage = Math.round((this.value / totalIncome)* 100);
       } else { 
           this.percentage = -1;
       }
       
   };
   Expense.prototype.getPercentage = function(){
       return this.percentage;
   }
    var Income = function(id, description, value){
       this.id = id;
       this.description = description;
       this.value = value;
   }
   /*
  ===================== [5] ============================
   var allExpenses = [];
   var allIncomes = [];
   var totalExpenses = 0;

   you could do the above, but not an ideal solution because if we could aggregate
   the data each time it's a better solution - there's too many things to keepm track of
   - nnot good to have random variable flsoating around
   - thus, create var data..

   
   var data = {
         allExpenses: [],
         allIncomes: [],
         totalExpenses: 0,
         totalIncome: 0
   }


   // but above is stil not good
   we can do better since both allExpenses and income are array that store instances of
   income and expenses
   so we can do  

     var data = {
         allItems: {
             exp: [],
             inc: []
         },
         total:{
             exp: 0,
             inc: 0
         }
   }


   */
  var calculateTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(cur){
       sum = sum + cur.value;
    });
    //console.log("sum: " + sum);
    data.total[type] = sum;
  };
  // next time when someone creates a new object everything is stored in here..
  // ===================== [5] ============================
 
  var data = {
         allItems: {
             exp: [],
             inc: []
         }, 
         total:{
             exp: 0,
             inc: 0
         },
         budget: 0,
         percentage: -1 // value used to say something is nonexistance
   }
   
     /* ===================== [5] ============================
      - a public method in budget contorller that allow other module to add item
    to our data structure
    - we return an object that contains all of our pulic methods that has access 
    to either data or functions that we want to use

 
        ===================== [5] ============================  */
   return {
       addItem: function(type, des, val){
          var newItem; 
          /* ID is a unique number that we want to assign in the new item
           for expense and income
           - length of the existing array and +1
           namely, if you have [1,2,3].. adding next element would mean 4
           , but there is a big problem when you start deleting array  you will get
           [1,3,5,6,7] //if you want to say next Id is 6 this is not ideal = not unqiue
           */
          /*
          better solution would be - ID = lastId + 1..
          to find lastId = findIndex, then find its ID then +1

          */
          // create new ID
          if (data.allItems[type].length > 0){
             var ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
          } else {
              ID = 0;
          }
        
           // (1) to add somethign we have to know whether it's an income or an expenses
         
          // note that type comes from getInput, which is "inc" vs "exp"
          if (type === "exp"){
              newItem = new Expense(ID, des, val);
             
             
          } else if (type === "inc"){
              newItem = new Income(ID, des, val);
          }
           data.allItems[type].push(newItem);
         
           
           return newItem; // all other module has direct access to the item we created


            
       },
       deleteItem: function(type, id){ 
           var ids, index;
           // both and exp identified by unique id = type and id
      /*     var ids= data.allItems[type].map(function(current){ // map returns a brand new array this is the difference between a map and a forEAch
               return 2; // this returns array of same length with 2 in all elements
           })*/ 
           var ids = data.allItems[type].map(function(current){
               return current.id;
           })
           index = ids.indexOf(id);
           // remove if index exists
           if (index != -1){
               // remove 
               // slice is used to remove element, 
                // position no. we want to start deleting
                 data.allItems[type].splice(index, 1);

           }

       },
       calculateBudget: function(){
           //we calculate total income and total expenses
           calculateTotal('exp');
           calculateTotal('inc');
           // (1) calculate budget which will be income - expenses
           data.budget = data.total["inc"] - data.total["exp"];
           // (2) calculate the % of income that we spent
           if (data.total.inc > 0){
             data.percentage = Math.round((data.total["exp"] / data.total["inc"]) * 100);
             console.log(data.percentage);
           } else {
               data.percentage = -1;
           }
           /*
            Eg: Expense  = 100 and income = 200, spent 50% .. then 100 / 200 * 100 = 50
           */
        
       },
       calculatePercentages: function(){
           /*
            a = 20
            b = 10
            c= 50

            total income = 100

            then expense percentage of a  = 20/100 * 100 = 
           */
           data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.total.inc);
           });
       },
       
       getPercentages: function(){
          var allPercentage =  data.allItems.exp.map(function(current){
               return current.getPercentage();
           });
           return allPercentage;
       },

       getBudget: function(){ // create method for returning so that you get to use of having f(x) of 1 purpose
          return {
             budget: data.budget,
             percentage: data.percentage,
             totalInc: data.total.inc,
             totalExp: data.total.exp
          }
       },
       testing: function(){
          console.log(data);
       }
   };

   

})();



/* ==================== [7] =============
- we learn a technique for adding big chunks of HTML into DOM...
- how to replace parts of strings
- how to do DOM manipulation using the insertAdjacentHTML method

- 


================== [7] ================
*/
 /* ============ [9] Clearing_inputField_8 ===========
    - how to clear HTML fields
    - how to use querySelectorAll
    - how to convert a list to an array
    - a better way to loop over an array then for loops: for each method
  */ 
/*  ========== [11] ===========
 - we will see budget updating in user interface
we need to add new methods to UI controllerand call it displayBudget

*/
//UICONTROLLER
var UIController = (function(){
    var DOMstrings = {

        budgetValue: '.budget__value',
        budgetIncome: '.budget__income--value',
        budgetIncomePercentage: 'budget__income--percentage',
        budgetExpense: '.budget__expenses--value',
        budgetExpensePercentage: '.budget__expenses--percentage',

        inputType:'.add__type',
        descriptionType:'.add__description',
        valueType:'.add__value',
        inputBtn:'.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',

        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'

    }
    var formatNumber =  function(num, type){
            var numSplit, int, dec;
            // (1) +/- before the number

            // (2) exactly 2 decimal points
            num = Math.abs(num);
            num = num.toFixed(2); // taking care of decimal number is toFixe()
            //toFixed is a method of the number prototype
            // strings a
            // (3) comma separatnig 2000
            numSplit = num.split("."); // split returns a string
            
            int = numSplit[0]; // string so use lenght property
           

            if (int.length > 3){
             //   int = int.substr(0,1) + ","  + int.substr(1,3); hardcoded but dynamic needed
               int = int.substr(0,int.length-3) + ","  + int.substr(int.length-3,3);
            }
             dec = numSplit[1];

            return (type === 'exp'? '-' : '+') + ' '+ int + '.' + dec;
             

    // if we don't use a function outside of a module make it private... 
    // since we don't have to return as we are not using it for anything else


        }
           var nodeListForEach = function(list, callback){
                 for (var i = 0; i < list.length; i++) // node list has length properties
                 {
                     callback(list[i], i);
                 }
              }
    return {
        getinput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.descriptionType).value,
                value: parseFloat(document.querySelector(DOMstrings.valueType).value)
            }
        },
        addListitem: function(obj, type){
          var html, newHTML, element;
          // create HTML strings with placeholder text 
          // JS is not to write HTML
          /* inside of the single quoet we have double quotes
          - JS doesn't inteerpret this as end of the string - because we began as single
          

          */
           if (type === "inc"){
             element = DOMstrings.incomeContainer;
             html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           }
           else if (type === "exp"){
             element = DOMstrings.expensesContainer;
             html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           }
          // replace the placeholder text with the actual data
          // html is  string and it has bunch of methodsfor the string
          newHTML = html.replace('%id%', obj.id);
          newHTML = newHTML.replace("%description%", obj.description);
          newHTML = newHTML.replace("%value%", formatNumber(obj.value, type));
        
          // insert the html into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
          
 
         
            
        },
        deleteListItem: function(selectorID){
            // in js you can onlyremove a child
            document.getElementById(selectorID).parentNode.removeChild( document.getElementById(selectorID));

  
        },
        clearFields: function(){
           var fields, fieldsArray;
            //two separate 2 strings we use a comma
            // querySelectorAll returns not an array, but a list
            // list is similar to array but don't have methods for arrays

            // solution is to convert list to an array, using array method slice
           fields = document.querySelectorAll(DOMstrings.descriptionType + ', ' + 
           DOMstrings.valueType);

           /* usually this method takes an array and return an array, but
            we can trick it being an array and return an array
            how??  = var fieldsArray = Array.prototype.slice.call(fields);
           */ 
           fieldsArray = Array.prototype.slice.call(fields); // this will be an array
           /* 
           - you can now loop through array asnd clear fields
           - apply call back function into this forEAch and it will be applied 
           to each of elements of the array
           - can receive up to 3 arguments;
           currentelement being processed,  index being processed, entire array
           */ 
           fieldsArray.forEach(function(current, index, array){
              current.value = ""; // then the fields is cleared
           });
           


        },
        displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetValue).textContent =  formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.budgetIncome).textContent =   formatNumber(obj.totalInc, 'inc');
          //  document.querySelector(DOMstrings.budgetIncomePercentage) = obj.percentage;
            document.querySelector(DOMstrings.budgetExpense).textContent =   formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMstrings.budgetExpensePercentage).textContent =  obj.percentage + "%";
            if (obj.percentage > 0){
             document.querySelector(DOMstrings.budgetExpensePercentage).textContent =  obj.percentage + "%";
            } else {
             document.querySelector(DOMstrings.budgetExpensePercentage).textContent =  "---";
            }
        },
        displayPercentages: function(percentagesArray){
              var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
              // returns a nodeList becuase each element in dom is called node
              /* fieldsArray = Array.prototype.slice.call(fields); // this will be an array
                 is the hack but we can create our own forEach..
              */
           
              nodeListForEach(fields, function(current, index){
               // do some stuff
               if (percentagesArray[index] > 0){
                 current.textContent = percentagesArray[index] + '%';
               }
               else {
                 current.textContent = "---";
               }
              })

        },
        displayMonth: function(){
            var now, year,months,month,date;
            now = new Date(); // if you don't put anything - it vill return todays'date
            // var christmas = new Date(2016,11,25); // christmas date..
           
            //year
            year = now.getFullYear();
            months = ['January', 'February', 'March', 'April', 'May','June','July', 'August',
            'September', 'October', 'November', 'December'];
            date = now.getDate();

            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month-1] + ', ' + date + ', ' +  year;
        },
        changeType:  function (){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.descriptionType + ',' +
                DOMstrings.valueType
            );
            nodeListForEach(fields, function(current){
                current.classList.toggle('red-focus');
            }); 
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    }

})();
/* =======[10] === updating_budgetbycnotroller_9.js =======
- challenge isf
1) how to convert field inputs to numbers
2) how to prevent false inputs

- in ctrlAddItem function - that will handle budget updates
- we move this to separate functions because they are related
, and we have to this again when we delete an item

- we create updateBudgets

- we use isNaN to check whether it was a number

- querySelector returns a string to convert it to int just parseInt 


*/
//GLOBAL APPCONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    // f(x) in which all our event listener will be placed
    
    var setupEventListener = function(){
        var DOM = UICtrl.getDOMstrings();
         document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        // key doesn't happen on specific element but happens on anywhere in document
        document.addEventListener("keypress", function(event){
           if (event.keyCode == 13 || event.which == 13){ // you could also use .which = older browser
              ctrlAddItem();
           }
        }); 
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType); 
    }
   /*  =================== [8]  ================
   ctrlAddItem = this the control centre of apps

   */


/* ==================== [11] calcuating budgets =============
-we learn how and why to create a simple, reusable function with only one purpose
- how to summ all elements of an array using forEach method

- to calcaulte budget we create a public method in budget controller
================== [11] ================
*/
 

    var updateBudget = function (){
       // (1) calculate the budget
       budgetCtrl.calculateBudget();
       // (2) returns the budget and does nothing else because he wants
       var budget = budgetCtrl.getBudget();
       // practice the fact that each function has a specific task //getter

       // (3) display the budget on UI = method on UI controller
       UICtrl.displayBudget(budget);
    };
    var updatePercentages = function (){
      //1) calculate the percentages
      budgetCtrl.calculatePercentages();
      //2) read them from the budget controller
      var percentages = budgetCtrl.getPercentages();
      //3) finally update the user interface with new interface
      UICtrl.displayPercentages(percentages);
      //console.log(percentages);
    }
    // ctrl to the f(x) name, because may be f(x) with similar name
    var ctrlAddItem = function(){
       var input, newItem;
       // (1) get the field input data
       input = UICtrl.getinput(); 

       if (input.description !== "" && !(isNaN(input.value)) && input.value > 0){
       // (2) add item to budgetcontroller
       
       newItem =  budgetCtrl.addItem(input.type, input.description, input.value);
       // budgetCtrl.testing();
        // (3) add new item to user interface
       UICtrl.addListitem(newItem, input.type);

       // (4)clear fieldss
       UICtrl.clearFields();
      
       // (5) calculate and updaet the budget
       updateBudget();
       // (6) calculate and update the percentages
       updatePercentages();
       }
      
       
    }
    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        // console.log(event.target.parentNode);// target property returns HTML node
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //this returns a string..
       // console.log(itemID);

        if (itemID){ // this is coerces to true if it exists
            //inc-1
            //so we need a way to split this up = string function called "split"
            // why does all string have access ot this method when string is prim not object?
            /* as soon as you call method on string, JS put wrapper around the string
            and convert to object
            - numbers also have methods because it transforms prim to obj so we can use methods on them
            */
            splitID = itemID.split('-'); // it then returns an array
            type = splitID[0];
            ID = parseInt(splitID[1]); 
            console.log(type + ", " + ID);
            // 1. delete item from data structure
            budgetCtrl.deleteItem(type, ID);
            // 2. delete item from UI
            UICtrl.deleteListItem(itemID);
            // 3. we update and show new totals
            updateBudget();
            // (6) calculate and update the percentages
            updatePercentages();
            

        }
    };
    // [5](a) = event listener is only going to be set up when you call init()
    // this is the only line of the code that is 
    return {
        init: function(){
            console.log("application has started");
            UICtrl.displayBudget({
                budget: 0,
                percentage: 0,
                totalInc: 0,
                totalExp: 0
            });
            setupEventListener();
            UICtrl.displayMonth();
        }
    };
  
    
 

})(budgetController,UIController);

//init is the only line of code placed outside
controller.init(); // without this code nothing is evre going ot happen

// because of this line - when we mousedown - then we seen
/*
Eg: application has started
> {type; "inc"}
*/
// if it's removed then nothing happens..



/* [4] - creating_an_initialization
- how and why to create an initialization function
  - used to organize our controller
  - before our event listener f(x) was just hanging around freely so we 
  made a f(x) called setEventListener and all the event listeners in
  - after we did this now we have 2 f(x)s that are private
  - but the f(x)s are not called yet so it's not running yet - this was not a problem
  before because when it  was floating in IEFE it was executed right away but now
  we have to call them manually because it's private
  - best way to do this is to create a  ********* public initialization f(x)
  this is seen above figure (a)

*/
/* [5] - think about how we store income and expanse data in the budget controller
- we will learn how to choose function constructor that meet oru app's need
- how to set up a proper data structure for our budget controller


*/

/* ============== [6] ====================== 
- we are talking about user input data to create new data in our budget controllre data
structure
- to do this we will learn how to avoid conflicts in our data structure
- how and why to pass data from one module to another 

- we create a public method in budget controller that allow other module to add new
item to our data sturcture 
 ============== [6] ====================== */




