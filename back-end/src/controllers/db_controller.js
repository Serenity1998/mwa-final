require('dotenv').config();
const mongoose = require('mongoose');
const { display_message } = require('../utils/printer');
const static_text = require("../utils/static_texts");
const order_schema = require("../schemas/order_schema");
const order_item_schema = require('../schemas/order_item_schema');
const user_schema = require('../schemas/user_schema');
const db_url = process.env.DB_URL;

const CURRENT_ELEMENT = 1

mongoose.model("Order", order_schema, 'order')
mongoose.model("OrderItem", order_item_schema, 'order')
mongoose.model("User", user_schema, 'user')

mongoose.connect(db_url).catch((err) => display_message('Error occurred during db connection:', err))

mongoose.connection.on("connected", () => {
    display_message('DB connected');
})

mongoose.connection.on("disconnected", () => {
    display_message('DB disconnected');
})

const getData = (name, query) => {
    let result = query?.limit === CURRENT_ELEMENT ? mongoose.model(name).findOne({}) : mongoose.model(name).find({});
    if (query?.id) return mongoose.model(name).findById(query.id).exec();
    if (query?.sort) result.sort({ createdAt: query.sort === 'asc' ? 1 : -1 });
    if (query?.offset) result.skip(query.offset);
    if (query?.limit) result.limit(query.limit);
    return result.exec();
};

const saveData = (name, data) => {
    const model = mongoose.model(name);
    const newData = new model(data);
    return newData.save();
};

const updateDoc = (name, id, updateData) => {
    const model = mongoose.model(name);
    return model.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDoc = (name, id) => {
    const model = mongoose.model(name);
    return model.findByIdAndDelete(id);
};

const deleteNestedDocItem = (name, id, key) => {
    const model = mongoose.model(name);
    const doc = model.findById(id);
    if (!doc) {
        throw new Error('Document not found:', id);
    }
    doc[`${key}`] = doc[`${key}`]?.filter(item => item.itemId !== itemId);
    return doc.save();
};

function close() {
    mongoose.connection.close().then(() => {
        display_message('Requested termination');
        process.exit(0);
    });
}


process.on(static_text.sigint_code, function () {
    close();
});


module.exports = {
    close,
    getData,
    saveData,
    deleteDoc,
    updateDoc,
    deleteNestedDocItem
};
