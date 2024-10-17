const express = require("express");
const dashboardCtrl = require('../controllers/dashboard');

const router = express.Router();

// get dashboard by its GYM_ID
router.get('/:id', dashboardCtrl.getDashboardData);

module.exports = router;

