const express = require("express");
const expenseCtrl = require('../controllers/expense');

const router = express.Router();

router.post('/addExpense', expenseCtrl.addExpense);
router.get('/getAllExpense:_gymId', expenseCtrl.getAllExpense);
router.delete('/deleteExpense/:_id', expenseCtrl.deleteExpense);

module.exports = router;
// sequelize model:generate --name Expense --attributes gymId:String,title:String,amount:String,description:String,date:Date,image:String