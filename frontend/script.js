const toggleForm = document.getElementById('toggle-form');
const formTitle = document.getElementById('form-title');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const signUpButton = document.getElementById('signup-btn');
const loginButton = document.getElementById('login-btn');
const container = document.getElementById("form-container")
const expenseForm = document.getElementById("expense-form-container")
const expenseButton = document.getElementById("expense-button");
const expensesList = document.getElementById("liste");
toggleForm.addEventListener('click', () => {
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        formTitle.textContent = 'Login';
        toggleForm.textContent = "Don't have an account? Sign up";
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        formTitle.textContent = 'Sign Up';
        toggleForm.textContent = "Already have an account? Login";
    }
});

signUpButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form from submitting
    console.log("signup");

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Enter all fields");
        return;
    }

    const user = { name, email, password };

    try {
        const response = await axios.post("http://localhost:3003/users/signup", { user });
        console.log("Signup successful", response.data);
    } catch (error) {
        alert("Email ID already registered!");
    }
});
loginButton.addEventListener('click', async(event)=>{
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    if(email=="" || password==""){
        alert("⚠️ All fields are required!");
        return;
    }
    const user ={email, password};
    
    try {
        const response = await axios.post("http://localhost:3003/users/login", { user });
        console.log("Login successful", response.data);
       container.style.display="none";
       expenseForm.style.display="block"
       getExpense();
    } catch (error) {
        const status = error.response.status;
        const message = error.response.data.error; 
        if (status === 400) {
            alert("⚠️ All fields are required!");
        } else if (status === 404) {
            alert("❌ User not found! Please register first.");
        } else if (status === 401) {
            alert("🔑 Invalid password! Please try again.");
        } else {
            alert("⚠️ Something went wrong: " + message);
        }
    }

})
expenseButton.addEventListener('click', async(event)=>{
    event.preventDefault();
    const amount = document.getElementById("expense-amount").value.trim();
    const description = document.getElementById("expense-description").value.trim();
    const category = document.getElementById("expense-category").value.trim();
    if(!amount || !description || !category){
        alert("⚠️ All fields are required!");
        return
    }
   const expense ={amount, description, category};
   try{
    const response = axios.post("http://localhost:3003/expense/add-expense", {expense});
    alert("Expense added successfully💴");
    return;
   }
   catch(err){
    console.log(err);
   }
})
async function getExpense(){
    const response = await axios.get("http://localhost:3003/expense/get-expense");
    const expenses = response.data.expenses;
    expenses.forEach(element => {
        const newLi = document.createElement("li");
        newLi.innerHTML=`${element.amount} - ${element.description} - ${element.category}`
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML="Delete";
        deleteBtn.classList.add('btn', 'btn-danger');
        newLi.appendChild(deleteBtn)
        expensesList.appendChild(newLi);
    });
}