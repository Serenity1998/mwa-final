require("dotenv")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const util = require('../utils/common')
const saltRounds = 10;

function login(req, res) {
    const response = {
        status: 200,
        data: ""
    }
    const { username, password } = req.body;
    const verification = util.verifyAuth(username, password)
    const model = mongoose.model("User");

    if (!verification.isVerified)
        return res.status(401).send(process.env.ERROR_FILL_AUTH);

    model.findOne({ username: username })
        .then(data => checkExistingUser(data, password))
        .then(result => signToken(result))
        .then(token => response.data = { token })
        .catch(err => {
            response.status = 403;
            response.data = "Error occurred: " + err
        })
        .finally(() => util.sendResponse(res, response))
}

function register(req, res) {
    const response = {
        status: 200,
        data: ""
    }
    const { username, password } = req.body;
    const verification = util.verifyAuth(username, password)
    const model = mongoose.model("User");

    if (!verification.isVerified)
        return res.status(401).send(verification)

    bcrypt.genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => model.create({ username, password: hash }))
        .then(data => signToken(data))
        .then(token => response.data = { token })
        .catch(err => {
            response.status = 500
            response.data = err
        })
        .finally(() => util.sendResponse(res, response));
}

function checkExistingUser(data, password) {
    return new Promise((resolve, reject) => {
        if (!data) reject(process.env.ERROR_USER_NOT_FOUND)
        bcrypt.compare(password, data.password)
            .then(result => {
                if (result) resolve(data)
                else reject(result)
            })
            .catch(err => reject(err));
    });
}

function signToken(data) {
    return new Promise((resolve, reject) => {
        try {
            let token = jwt.sign(
                {
                    username: data.username
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )
            resolve(token)
        } catch (e) {
            reject(e)
        }
    });
}

module.exports = {
    register,
    login
}