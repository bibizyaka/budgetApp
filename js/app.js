 class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
   
   }// constructor

  //submit budget method
    submitBudgetForm() {

       if (this.budgetInput.value === '' || this.budgetInput.value < 0) {
          this.budgetFeedback.classList.add('showItem');
          this.budgetFeedback.innerHTML = "<p>value cannot be empty or negative!</p>";

          self = this; // important concept
          setTimeout(function() {

             self.budgetFeedback.classList.remove('showItem');  
             self.budgetInput.value = ""; 
          }, 3000);
       } else {

          this.budgetAmount.textContent = this.budgetInput.value;
          this.budgetInput.value = "";
          this.showBalance();

       } //else
    } // submitBudgetForm

    showBalance() {
       
       const expense = this.totalExpense();
       const total = parseInt(this.budgetAmount.textContent) - expense;
       this.balanceAmount.textContent = total;
       
       if (total < 0) {
          this.balance.classList.remove('showGreen', 'showBlack');
          this.balance.classList.add('showRed');   
       } else if (total > 0) {
          this.balance.classList.remove('showred', 'showBlack');
          this.balance.classList.add('showGreen');
       } else {
          this.balance.classList.remove('showred', 'showGreen');
          this.balance.classList.add('showBlack');
       }
    } // showBalance

    //submit Expense
    submitExpenseForm() {

        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
        if (expenseValue === '' || amountValue === '' || amountValue < 0) {

            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
            self = this;
            setTimeout(function() {
                 self.expenseFeedback.classList.remove('showItem');
            },3000);
        } else {

            let amount = parseInt(amountValue);
            this.expenseInput.value = '';
            this.amountInput.value = '';

            let expense = {

               id: this.itemID,
               title: expenseValue,
               amount: amount 
            }
            this.itemID++;
            this.itemList.push(expense);
            this.addExpanse(expense);
            this.totalExpense();
            this.showBalance();
        } //else
    } //submitExpenseForm    
    addExpanse(expense) {

     const div = document.createElement('div');
     div.classList.add('expense'); 
     div.innerHTML = 
     `<div class="expense-item d-flex justify-content-between align-items-baseline">
        <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
        <div class="expense-icons list-item">
           <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
            <i class="fas fa-edit"></i>
           </a>
           <a href="#" class="delete-icon" data-id="${expense.id}">
            <i class="fas fa-trash"></i>
           </a>
        </div>
     </div>
    `;
    this.expenseList.appendChild(div);
}
    //total Expense
    totalExpense() {
       let total = 0;
       if (this.itemList.length > 0) {
          total = this.itemList.reduce((acc, curr) => acc += curr.amount,0); 
            // console.log(total);
       }
       this.expenseAmount.textContent = total;
    return total;
    } //totalExpense

    editExpense(element) {

       // console.log(parseInt(element.getAttribute('data-id')) );
       let id = parseInt(element.dataset.id);
       let parent = element.parentElement.parentElement.parentElement;
       this.expenseList.removeChild(parent);
       //remove from the dom
       let expense = this.itemList.filter(function(item) {
            return item.id === id;
       });
       //show value
       this.expenseInput.value = expense[0].title;
       this.amountInput.value = expense[0].amount; 
       //remove from the list
        let tempList = this.itemList.filter(function(item){
            return item.id != id; // create new list that doesn't contain selected item id
        });
        this.itemList = tempList;
        this.showBalance();

    }//editExpense

    deleteExpense(element) {
       
       let id = parseInt(element.dataset.id);
       let parent = element.parentElement.parentElement.parentElement;
        //remove from dom
       this.expenseList.removeChild(parent);
       //remove from the list
       let tempList = this.itemList.filter(function(item){
          return item.id != id; // create new list that doesn't contain selected item id
       });
       this.itemList = tempList;
       this.showBalance();


    }//deleteExpense

} // class

function eventListener() {

    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    //new instance of UI class
    const ui = new UI();
    //budget form submit
    budgetForm.addEventListener('submit', function(event) {

       event.preventDefault();
       ui.submitBudgetForm();
    });
    //expense form submit
    expenseForm.addEventListener('submit', function(event) {

       event.preventDefault();   
       ui.submitExpenseForm(); 
    });
    //expense click
    expenseList.addEventListener('click', function(event) {
        if (event.target.parentElement.classList.contains("edit-icon")) {
             ui.editExpense(event.target.parentElement);    
            // console.log("Edit pressed: " + event.target.parentElement('data-id').id;
        } else if (event.target.parentElement.classList.contains("delete-icon")) {
            // console.log("Delete pressed: " + event.target.parentElement.data-id);
            ui.deleteExpense(event.target.parentElement);
        }
        
    });
 }; // eventListener

document.addEventListener('DOMContentLoaded', function(){

    eventListener();

})