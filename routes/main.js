const express = require('express');
const router = express.Router();
const authRouter = require('./auth')
const expenseRouter = require('./expense')
const feeRouter = require('./fee')
const incomeRouter = require('./income')
const memberRouter = require('./member')

router.use('/auth', authRouter)
router.use('/expense', expenseRouter)
router.use('/fee', feeRouter)
router.use('/income', incomeRouter)
router.use('/member', memberRouter)

module.exports = router;