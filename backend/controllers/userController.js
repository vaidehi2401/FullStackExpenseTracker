
const sequelize = require('../util/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
function generateAccessToken(id, name){
  return jwt.sign({userId:id, name:name}, '9384098349io3jedkcmsdljtpo4i05-9-20-3lwjdksjhewy')
}
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
 const totalAmount=0;
const user = await User.create({ name, email, password: hashedPassword, totalAmount});
const id = user.id;
res.status(200).json({ message: "User added successfully", token: generateAccessToken(id, name)});
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
          res.status(200).json({ message: "Login successful", token: generateAccessToken(emailExist.id, emailExist.name) });
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