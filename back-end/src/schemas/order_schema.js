const order_item_schema = require('./order_item_schema')

const mongoose = require("mongoose")

const order_schema = new mongoose.Schema({
    order_num: {
        type: String,
        required: true
    },
    total: Number,
    order_items: [order_item_schema],
    is_ordered: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = order_schema