const mongoose = require("mongoose")

const order_item_schema = new mongoose.Schema({
    name: String,
    color: String,
    description: String,
    price: Number,
    link: String,
    priority: Number,
    is_checked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = order_item_schema