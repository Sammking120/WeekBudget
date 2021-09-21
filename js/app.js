//Classes

class Budget {
  constructor(budget){
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }

  substractFromBudget(amount){
    return this.budgetLeft -=amount;

  }

}

//Everything related to the UI
class HTML{

  //Insert the budget when the user submits it
  insertBudget(amount){
    
    //insert into Html
    budgetTotal.innerHTML =`${amount}`
    budgetLeft.innerHTML =`${amount}`
  }
  printMessage(message, className){
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('text-center','alert',className);
    messageWrapper.appendChild(document.createTextNode(message));

    //insert Into HTML
    document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

    //create the error Message
    setTimeout(function(){
      document.querySelector('.primary .alert').remove();
      addExpenseForm.reset();
    },3000)
  }

  addExpenseToList(name, amount){
    const expensesList = document.querySelector('#expenses ul');

    //create a li
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    //create the Template
    li.innerHTML =`
    ${name}
    <span class="badge badge-primary badge-pill">Ksh. ${amount}</span>`
  
    //Insert into the HTML
    expensesList.appendChild(li);
  }

  trackBudget(amount){
    const budgetLeftDollars =budget.substractFromBudget(amount);
    budgetLeft.innerHTML = `${budgetLeftDollars}`;
    
    //Check When 25% is Left
    if ((budget.budget /4 )>budgetLeftDollars){
      budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
      budgetLeft.parentElement.parentElement.classList.add('alert-danger');

    }//if the budget is less Than 50%
    else if ((budget.budget /2 )>budgetLeftDollars){
      budgetLeft.parentElement.parentElement.classList.remove('alert-success');
      budgetLeft.parentElement.parentElement.classList.add('alert-warning');
    }
  }
}


//Variables
const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft =document.querySelector('span#left');


let budget, userBudget;

//Instansiate the HTML class
const html = new HTML();

//EventListeners
eventListeners();

function eventListeners(){

  //App Init
  document.addEventListener('DOMContentLoaded', function(){
    //Ask the visitor for His Weekly Budget
    userBudget = prompt("what\'s Your Weekly Budget?");
    
    //validate the UserBudget
    if(userBudget === null || userBudget == '' || userBudget === 0 || userBudget === '0'){
      window.location.reload();
    }else{

      //Budget is Valid the Instatiate the Budget Class
      budget = new Budget(userBudget);

      //instatiate the Html Class
      html.insertBudget(budget.budget);


    }
  });

    //When a new expense is added
    addExpenseForm.addEventListener('submit', function(e){
      e.preventDefault();
    
      //Read the Input Values
      const expenseName = document.querySelector('#expense').value;
      const amount = document.querySelector('#amount').value;
    
      if(expenseName === '' || amount === ''){
        console.log(html);
        html.printMessage(' There was an Error, All the fields are Mandatory','alert-danger');
      }else {
        //Add the expenses into the List
        html.addExpenseToList(expenseName, amount);
        html.trackBudget(amount);
        html.printMessage('Added...', 'alert-success');

      }
    
    
    });

}



