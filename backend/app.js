const userRoutes = require('./routes/userRoutes')
const express = require('express');
const bodyParser = require('body-parser');
const User=require('./models/userModel')
const sequelize = require('./util/database');
const cors = require('cors'); 
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use('/users', userRoutes);
sequelize.sync()
.then(()=>{
    app.listen(3003);
})
.catch((err)=>{
    console.log(err);
})
