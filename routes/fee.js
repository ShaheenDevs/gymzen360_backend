const express = require("express");
const feeCtrl = require('../controllers/fee');

const router = express.Router();

// Create a new fee
router.post('/addFee', feeCtrl.addFee);

// Update an existing fee
router.put('/updateFee/:id', feeCtrl.updateFee);
// Get all fees for a specific gym
router.get('/getMemberFees/:gymId', feeCtrl.getMemberFees); 

// Delete a fee by its ID
router.delete('/deleteFee/:id', feeCtrl.deleteFee);

module.exports = router;

// sequelize model:generate --name Fee --attributes gymId:String,date:Date,amount:DECIMAL,paymentMethod:String,privateNote:String,status:String