const { orderInitilizerData } = require('../utils/common')
const { getDataWithCallify, saveDataWithCallify } = require('./callbackify_function_set')

function getLatestOrder(req, res) {
    let query = { sort: 'desc', limit: 1 };
    getDataWithCallify('Order', query, (err, client) => {
        if (err) return res.status(500).send(err);
        res.send(client);
    })
}

function getOrders(req, res) {
    let query = {};
    if (req.query.sort !== undefined) query = { ...query, sort: req.query.sort };
    getDataWithCallify('Order', query, (err, client) => {
        if (err) return res.status(500).send(err);
        res.send(client);
    })
}

function createEmptyOrder(req, res) {
    console.log(orderInitilizerData)
    saveDataWithCallify('Order', orderInitilizerData, (err, client) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(JSON.stringify(client))
    })
}

module.exports = {
    getOrders,
    createEmptyOrder,
    getLatestOrder
};
