const express = require("express");
const authCtrl = require('../controllers/auth');

const router = express.Router();

router.get('/', authCtrl.login);

module.exports = router;