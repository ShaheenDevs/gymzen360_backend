const express = require("express");
const memberCtrl = require('../controllers/member');

const router = express.Router();

// Create a new member
router.post('/addMember', memberCtrl.addMember);

// Get single member data
router.get('/getSingleMember/:memberId', memberCtrl.getSingleMember);

// Get all members for a specific gym
router.get('/getGymMembers/:gymId', memberCtrl.getGymMembers);

// Update an existing member
router.put('/updateMember/:id', memberCtrl.updateMember);

// Delete a member
router.delete('/deleteMember/:id', memberCtrl.deleteMember);

module.exports = router;

// sequelize model:generate --name Member --attributes gymId:String,name:String,gender:String,phone:String,cnic:String,address:String,fee:Integer,advance:String,joiningDate:Date,status:String,profileImage:String