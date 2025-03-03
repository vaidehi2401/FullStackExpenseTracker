

const container = document.getElementById("form-container")
const expenseForm = document.getElementById("expense-form-container")
const expenseButton = document.getElementById("expense-button");
const expensesList = document.getElementById("liste");
expenseButton.addEventListener('click', async(event)=>{
    event.preventDefault();
    const amount = document.getElementById("expense-amount").value.trim();
    const description = document.getElementById("expense-description").value.trim();
    const category = document.getElementById("expense-category").value.trim();
    if(!amount || !description || !category){
        alert("⚠️ All fields are required!");
        return
    }
    const token = localStorage.getItem('token')
   const expense ={amount, description, category};
   try{
    const response = axios.post("http://localhost:3003/expense/add-expense", {expense}, { headers: { "Authorization": token}  });
    alert("Expense added successfully💴");
    renderExpense(expense)
    return;
   }
   catch(err){
    console.log(err);
   }
})
function renderExpense(element){
    const newLi = document.createElement("li");
    newLi.innerHTML=`${element.amount} - ${element.description} - ${element.category}`
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML="Delete";
    deleteBtn.classList.add('btn', 'btn-danger');
    newLi.appendChild(deleteBtn)
    expensesList.appendChild(newLi);
}
async function getExpense(){
    const token = localStorage.getItem('token')
    const response = await axios.get("http://localhost:3003/expense/get-expense", {headers:{"Authorization": token}});
    const expenses = response.data.expenses;
    expenses.forEach(element => {
        const newLi = document.createElement("li");
        newLi.innerHTML=`${element.amount} - ${element.description} - ${element.category}`
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML="Delete";
        deleteBtn.classList.add('btn', 'btn-danger');
        newLi.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', async()=>{
            try{
            const response = await axios.delete(`http://localhost:3003/expense/delete-expense/${element.id}`, 
                {
                    headers: { "Authorization": token }
                }  
            )
            newLi.remove();
            console.log("Deleted!!")
        }
        catch(err){
console.log(err);
        }
        })
        expensesList.appendChild(newLi);
    });
}
window.addEventListener('DOMContentLoaded', getExpense);