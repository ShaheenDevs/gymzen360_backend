const express = require("express");
const incomeCtrl = require('../controllers/income');

const router = express.Router();

router.post('/addIncome', incomeCtrl.addIncome);
router.get('/getAllIncome:_gymId', incomeCtrl.getAllIncome);
router.delete('/deleteIncome/:_id', incomeCtrl.deleteIncome);

module.exports = router;
// sequelize model:generate --name Income --attributes gymId:String,title:String,amount:String,description:String,date:Date