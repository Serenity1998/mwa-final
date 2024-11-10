const express = require('express');
const orderRoute = require('./orderlist');
const orderItemRoute = require('./orderItem');
const authRoute = require('./auth');
// const { verify } = require('../controllers/auth_controller');

const router = express.Router();

router.use('/order', orderRoute)
router.use('/items', orderItemRoute)
router.use('/auth', authRoute)

module.exports = router;
