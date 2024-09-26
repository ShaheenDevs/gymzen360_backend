const express = require("express");
const incomeCtrl = require('../controllers/income');

const router = express.Router();

// Create a new income
router.post('/addIncome', incomeCtrl.addIncome);

// Get all incomes for a specific gym
router.get('/getGymIncomes/:gymId', incomeCtrl.getGymIncomes);

// Update an existing income
router.put('/updateIncome/:id', incomeCtrl.updateIncome);

// Delete an income
router.delete('/deleteIncome/:id', incomeCtrl.deleteIncome);

module.exports = router;
// sequelize model:generate --name Income --attributes gymId:String,title:String,amount:String,description:String,date:Date