const express = require("express");
const expenseCtrl = require('../controllers/expense');

const router = express.Router();

// Create a new expense
router.post('/addExpense', expenseCtrl.addExpense);

// Get all expenses for a specific gym
router.get('/getGymExpenses/:gymId', expenseCtrl.getGymExpenses);

// Update an existing expense
router.put('/updateExpense/:id', expenseCtrl.updateExpense);

// Delete an expense
router.delete('/deleteExpense/:id', expenseCtrl.deleteExpense);

module.exports = router;

// sequelize model:generate --name Expense --attributes gymId:String,title:String,amount:String,description:String,date:Date,image:String