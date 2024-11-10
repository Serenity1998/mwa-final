const db = require('./db_controller');
const callbackify = require("util").callbackify;

const getDataWithCallify = callbackify(db.getData);
const saveDataWithCallify = callbackify(db.saveData);
const updateDocWithCallify = callbackify(db.updateDoc);

module.exports = {
    getDataWithCallify,
    saveDataWithCallify,
    updateDocWithCallify
}