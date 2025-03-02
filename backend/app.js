const userRoutes = require('./routes/userRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const express = require('express');
const bodyParser = require('body-parser');
const User=require('./models/userModel')
const Expense=require('./models/expenseModel')

const sequelize = require('./util/database');
const cors = require('cors'); 
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use('/users', userRoutes);
app.use('/expense', expenseRoutes);
sequelize.sync()
.then(()=>{
    app.listen(3003);
})
.catch((err)=>{
    console.log(err);
})
