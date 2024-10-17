const express = require('express');
const router = express.Router();
const authRouter = require('./auth')
const expenseRouter = require('./expense')
const feeRouter = require('./fee')
const incomeRouter = require('./income')
const memberRouter = require('./member')
const dashboardRouter = require('./dashboard')
const imageRouter = require('./image')
const checkAuth = require('../middleware/check_auth')

router.use('/auth', authRouter)
router.use('/expense', checkAuth, expenseRouter)
router.use('/fee', checkAuth, feeRouter)
router.use('/income', checkAuth, incomeRouter)
router.use('/member', checkAuth, memberRouter)
router.use('/dashboard', checkAuth, dashboardRouter)
router.use('/image', checkAuth, imageRouter)

module.exports = router;