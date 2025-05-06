const express = require("express");
const subscriptionCtrl = require('../controllers/subscription');
const checkAuth = require('../middleware/check_auth');

const router = express.Router();

// Create new subscription
router.post('/create', checkAuth, subscriptionCtrl.createSubscription);

// Get all subscriptions (admin usage or general listing)
router.get('/all', checkAuth, subscriptionCtrl.getSubscriptions);

// Get subscription by user ID
router.get('/user/:userId', checkAuth, subscriptionCtrl.getSubscriptionByUser);

// Update subscription
router.put('/update', checkAuth, subscriptionCtrl.updateSubscription);

// Delete subscription
router.delete('/delete/:id', checkAuth, subscriptionCtrl.deleteSubscription);

module.exports = router;
