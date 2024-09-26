const express = require("express");
const feeCtrl = require('../controllers/fee');

const router = express.Router();

router.post('/addFee', feeCtrl.addFee);
router.get('/getMemberFees/:_gymId', feeCtrl.getMemberFees);
router.delete('/deleteFee/:_id', feeCtrl.deleteFee);

module.exports = router;
// sequelize model:generate --name Fee --attributes gymId:String,date:Date,amount:DECIMAL,paymentMethod:String,privateNote:String,status:String