const sequelize = require('../util/database');
exports.signup= async(req, res)=>{
try{
 const name = req.body.user.name;
 const email= req.body.user.email;
 const password = req.body.user.password;
 if(!name || !email || !password){
    return res.status(400).json({ error: "All fields are required" });
 }
 await sequelize.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", {
    replacements: [name, email, password], 
});
res.status(200).json({ message: "User added successfully"});
}
catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
}
}