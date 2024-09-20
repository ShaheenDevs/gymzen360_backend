const express = require("express");
const expenseCtrl = require('../controllers/expense');

const router = express.Router();

router.post('/addExpense', expenseCtrl.addExpense);
router.get('/getAllExpense', expenseCtrl.getAllExpense);
router.delete('/deleteExpense/:_id', expenseCtrl.deleteExpense);

module.exports = router;