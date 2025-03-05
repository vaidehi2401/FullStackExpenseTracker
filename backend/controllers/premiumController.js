const { createOrder, getPaymentStatus } = require("../services/cashfreeServices");
const authenticate = require("../middleware/auth");
const sequelize = require('../util/database');
const Membership = require('../models/membershipModel')
const Expenses = require('../models/expenseModel')
const Users = require('../models/userModel');
exports.isPremium= async(req, res)=>{
    const userId = req.user.dataValues.id;
    try{
    const membership = await Membership.findOne({
        where: { userId: userId, membershipStatus: "Success" }
    });
    return res.status(200).json({ isPremium: !!membership });
} catch (error) {
    console.error("Error checking premium membership:", error);
    return res.status(500).json({ error: "Internal Server Error" });
}
}
exports.getPremiumData = async(req, res)=>{
try{
const data = await sequelize.query(`SELECT u.name, SUM(e.amount) AS totalExpense
FROM Users u
JOIN Expenses e ON u.id = e.userId
GROUP BY u.id, u.name
ORDER BY totalExpense DESC;
`)
return res.status(200).json({data: data});
}
catch(err){
return res.status(500).json({ error: "Internal Server Error" });
}
}