const express = require('express');
const item_controller = require('../controllers/orderItem_controller');

const router = express.Router();

router.get('', item_controller.getLeftItemsOfOrder)
router.post('/add_item', item_controller.addOrderItem);
router.get('/mark_item', item_controller.markItem);
router.delete('/remove_item', item_controller.removeOrderItem);
router.get('/get_item', item_controller.getItem);

module.exports = router;
