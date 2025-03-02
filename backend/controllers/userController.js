
const sequelize = require('../util/database');
const bcrypt = require('bcrypt');
exports.signup= async(req, res)=>{
try{
 const name = req.body.user.name;
 const email= req.body.user.email;
 const password = req.body.user.password;
 if(!name || !email || !password){
    return res.status(400).json({ error: "All fields are required" });
 }
 const saltRounds = 10;
 const hashedPassword = await bcrypt.hash(password, saltRounds);
 await sequelize.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", {
    replacements: [name, email, hashedPassword], 
});
res.status(200).json({ message: "User added successfully"});
}
catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
}
}


exports.login= async(req, res)=>{
    try{
     const email= req.body.user.email;
     const password = req.body.user.password;
     if(!email || !password){
        return res.status(400).json({ error: "All fields are required" });
     }
     const [emailExist] = await sequelize.query(
        "SELECT * FROM users WHERE email = :email",
        { replacements: { email }, type: sequelize.QueryTypes.SELECT }
      );
  
      if (!emailExist) {
        return res.status(404).json({ error: "User not found" });
      }
      bcrypt.compare(password, emailExist.password , (err, result)=>{
        if(err){
          throw new Error("Something went wrong")
        }
        else if(result===true){
          res.status(200).json({ message: "Login successful", user: emailExist });
        }
        else{
          return res.status(401).json({ error: "Invalid password" });
        }
      }
    ) 
    }
    catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
    }