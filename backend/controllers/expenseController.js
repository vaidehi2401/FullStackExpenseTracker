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
const userId = req.user.dataValues.id;
await sequelize.query(
    "INSERT INTO Expenses (amount, description, category, userId) VALUES (?, ?, ?, ?)",
    {replacements:[amount, description, category, userId]}
)
return res.status(201).json({ message: "Expense added successfully"});
} catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ error: "Internal Server Error" });
}
}
exports.getExpense = async(req, res)=>{
    try{
const expenses = await Expense.findAll({where: {userId:req.user.dataValues.id}});
console.log(expenses)
return res.status(200).json({expenses});
    }
    catch(err){
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.deleteExpense= async(req, res)=>{
    const id = req.params.id;
try{
const response = await Expense.destroy({where:{id:id}});
return res.status(200).json({ message: "Expense deleted successfully" });
}
catch{
    return res.status(500).json({ error: "Internal Server Error" });
}
}
