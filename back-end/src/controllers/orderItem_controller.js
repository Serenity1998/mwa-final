require("dotenv")
const { getDataWithCallify, updateDocWithCallify, saveDataWithCallify } = require('./callbackify_function_set');
const { orderInitilizerData } = require('../utils/common')


function markItem(req, res) {
    let query = { sort: 'desc', limit: 1 };
    if (req.query.id === undefined) return res.status(500).send(process.env.ERROR_NOT_DEFINED);
    const item_id = req.query.id;

    getDataWithCallify('Order', query, (err, client) => {
        if (err) return res.status(500).send(err);
        const order_items = [...client.order_items].map((item) =>
            item.id === item_id ? { ...item._doc, is_checked: !item.is_checked } : item,
        );
        const merged_order_items = { ...client._doc, order_items: [...order_items] }
        updateDocWithCallify('Order', client._id, merged_order_items, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(JSON.stringify(result));
        });
    });
}

function addOrderItem(req, res) {
    if (req.body.data === undefined) return res.status(500).send(process.env.ERROR_PROVIDE_DATA);
    let query = { sort: 'desc', limit: 1 };
    getDataWithCallify('Order', query, (err, clientData) => {
        if (err) return res.status(500).send(err);
        if (clientData === null) saveDataWithCallify('Order', orderInitilizerData, (err, client) => {
            if (err) return res.status(500).send(err);
            const merged_order_items = { ...client._doc, order_items: [...client.order_items, req.body.data] }
            updateDocWithCallify('Order', client._id, merged_order_items, (err, result) => {
                if (err) return res.status(500).send(err);
                res.status(200).send(JSON.stringify(result));
            });
        })
        else {
            const merged_order_items = { ...clientData._doc, order_items: [...clientData.order_items, req.body.data] }
            updateDocWithCallify('Order', clientData._id, merged_order_items, (err, result) => {
                if (err) return res.status(500).send(err);
                res.status(200).send(JSON.stringify(result));
            });
        }
    });
}

function removeOrderItem(req, res) {
    let query = { sort: 'desc', limit: 1 };
    if (req.query.id === undefined) res.status(500).send(process.env.ERROR_NOT_DEFINED)
    const item_id = req.query.id;
    getDataWithCallify('Order', query, (err, client) => {
        if (err) return res.status(500).send(err);
        const order_items = [...client.order_items].filter((item) => item.id !== item_id);
        const merged_order_items = { ...client._doc, order_items }
        updateDocWithCallify('Order', client._id, merged_order_items, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(JSON.stringify(result));
        })
    });
}

function getLeftItemsOfOrder(req, res) {
    let query = {};
    if (req.query.sort !== undefined) query = { ...query, sort: req.query.sort };
    if (req.query.id !== undefined) query = { ...query, id: req.query.id };

    getDataWithCallify('Order', query, (err, data) => {
        if (err) throw new Error(err);
        res.send(data.order_items);
    })
}

function getItem(req, res) {
    let query = {};
    if (req.query.id === undefined) return res.send("Error");
    query = { id: req.query.id };

    getDataWithCallify('Order', query, (err, data) => {
        if (err) throw new Error(err);
        res.send(data.order_items);
    })
}

function deleteItem(req, res) {
    let query = {};
    if (req.query.id === undefined) return res.send("Error");
    query = { id: req.query.id };

    getDataWithCallify('Order', query, (err, data) => {
        if (err) throw new Error(err);
        res.send(data.order_items);
    })
}

module.exports = {
    addOrderItem,
    markItem,
    removeOrderItem,
    getLeftItemsOfOrder,
    getItem,
    deleteItem
};
