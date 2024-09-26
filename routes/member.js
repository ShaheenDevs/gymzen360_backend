const express = require("express");
const memberCtrl = require('../controllers/member');

const router = express.Router();

router.post('/addMember', memberCtrl.addMember);
router.get('/getAllMember/:_gymId', memberCtrl.getAllMember);
router.delete('/deleteMember/:_id', memberCtrl.deleteMember);

module.exports = router;
// sequelize model:generate --name Member --attributes gymId:String,name:String,gender:String,phone:String,cnic:String,address:String,fee:Integer,advance:String,joiningDate:Date,status:String,profileImage:String