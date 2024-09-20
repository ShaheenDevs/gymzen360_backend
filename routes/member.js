const express = require("express");
const memberCtrl = require('../controllers/member');

const router = express.Router();

router.post('/addMember', memberCtrl.addMember);
router.get('/getAllMember', memberCtrl.getAllMember);
router.delete('/deleteMember/:_id', memberCtrl.deleteMember);

module.exports = router;