const sequelize = require('../util/database');
const Expense = require('../models/expenseModel');
 // Import Expense model

 exports.postExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body.expense;
        
        if (!amount || !description || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userId = req.user.dataValues.id;

        // ✅ Insert data into the database
        const [results] = await sequelize.query(
            "INSERT INTO Expenses (amount, description, category, userId) VALUES (?, ?, ?, ?)",
            { replacements: [amount, description, category, userId] }
        );

        // ✅ Retrieve the newly created expense
        const [newExpense] = await sequelize.query(
            "SELECT * FROM Expenses WHERE id = LAST_INSERT_ID()"
        );

        return res.status(201).json(newExpense[0]); // Returning the newly added expense

    } catch (error) {
        console.error("Error adding expense:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

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
