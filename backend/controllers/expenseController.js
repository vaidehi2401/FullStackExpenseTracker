const sequelize = require('../util/database');
const Expense = require('../models/expenseModel');
const Users = require('../models/userModel')
 exports.postExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { amount, description, category } = req.body.expense;
        
        if (!amount || !description || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userId = req.user.dataValues.id;
        const user = await Users.findByPk(userId); 
        let totalAmount = Number(user.totalAmount) || 0; // Default to 0 if null
        totalAmount += Number(amount);
        const newExpense = await Expense.create(
            { amount, description, category, UserId:userId },
            { transaction: t }
        );
        console.log("New Expense>>>>>>>>>", newExpense.dataValues)
        user.totalAmount = totalAmount;
        await user.save({transaction:t});
        // ✅ Retrieve the newly created expense
        
await t.commit();
        return res.status(201).json(newExpense); // Returning the newly added expense

    } catch(error) {
        await t.rollback();
        console.error("Error adding expense:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getExpense = async(req, res)=>{
    const t = await sequelize.transaction();
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
    const t = await sequelize.transaction();
    const id = req.params.id;
    const userId = req.user.dataValues.id;
try{
const expenseToDelete = await Expense.findByPk(id);
const amountToRemove = Number(expenseToDelete.dataValues.amount);
const user = await Users.findByPk(userId); 
let totalAmount = Number(user.totalAmount) || 0; // Default to 0 if null
totalAmount -= Number(amountToRemove);
user.totalAmount = totalAmount
await user.save({transaction:t});
const response = await Expense.destroy({where:{id:id}, transaction:t});
await t.commit();
return res.status(200).json({ message: "Expense deleted successfully" });
}
catch{
    await t.rollback();
    return res.status(500).json({ error: "Internal Server Error" });
}
}
