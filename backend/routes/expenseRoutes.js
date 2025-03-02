const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenseController');
router.post('/add-expense', controller.postExpense);
router.get('/get-expense', controller.getExpense )
module.exports =router;