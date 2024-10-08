const express = require("express");
const authCtrl = require('../controllers/auth');

const router = express.Router();


router.post('/signIn', authCtrl.signIn);
router.post('/signUp', authCtrl.signUp);
router.delete('/delUser/:_id', authCtrl.delUser);

module.exports = router;