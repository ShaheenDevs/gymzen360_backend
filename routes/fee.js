const express = require("express");
const feeCtrl = require('../controllers/fee');

const router = express.Router();

router.post('/addFee', feeCtrl.addFee);
router.get('/getMemberFees/:_id', feeCtrl.getMemberFees);
router.delete('/deleteFee/:_id', feeCtrl.deleteFee);

module.exports = router;