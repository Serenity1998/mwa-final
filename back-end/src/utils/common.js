
function sendResponse(res, response) {
    res.status(response.status).json(response.data);
}

function verifyAuth(username, password) {
    const auth_verification = {
        isVerified: true,
        message: 'Success'
    }
    if (username === null || username === undefined || username === '') {
        auth_verification.isVerified = false
        auth_verification.message = 'Username not found'
    }
    if (password === null || password === undefined || password === '') {
        auth_verification.isVerified = false
        auth_verification.message = 'Password not found'
    }
    return auth_verification
}

function createNewOrderNumber() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const randomFourDigits = Math.floor(1000 + Math.random() * 9000).toString();

    return `${month}-${year}-${randomFourDigits}`;
}

const orderInitilizerData = {
    order_num: createNewOrderNumber(),
    total: 0,
    is_ordered: false,
    order_items: []
}

module.exports = {
    createNewOrderNumber,
    orderInitilizerData,
    verifyAuth,
    sendResponse
}