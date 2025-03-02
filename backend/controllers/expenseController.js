const sequelize = require('../util/database');
const Expense = require('../models/expenseModel');
exports.postExpense = async(req, res)=>{
try{
const amount = req.body.expense.amount;
const description = req.body.expense.description;
const category = req.body.expense.category;
if(!amount || !description || !category){
    return res.status(400).json({ error: "All fields are required" });
}
const newExpense = await Expense.create({
    amount,
    description,
    category
});
return res.status(201).json({ message: "Expense added successfully", expense: newExpense });
} catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ error: "Internal Server Error" });
}
}
exports.getExpense = async(req, res)=>{
    try{
const expenses = await Expense.findAll();
console.log(expenses)
return res.status(200).json({expenses});
    }
    catch(err){
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
