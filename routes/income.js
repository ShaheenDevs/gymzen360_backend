const express = require("express");
const incomeCtrl = require('../controllers/income');

const router = express.Router();

router.post('/addIncome', incomeCtrl.addIncome);
router.get('/getAllIncome', incomeCtrl.getAllIncome);
router.delete('/deleteIncome/:_id', incomeCtrl.deleteIncome);

module.exports = router;