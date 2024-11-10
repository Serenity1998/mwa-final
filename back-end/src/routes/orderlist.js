const express = require('express');
const order_controller = require("../controllers/orderlist_controller")

const router = express.Router();

router.get('', order_controller.getOrders);
router.get('/create', order_controller.createEmptyOrder);
router.get('/latest', order_controller.getLatestOrder)

module.exports = router;
