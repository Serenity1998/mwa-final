function general_error_handler(err, req, res, next) {
    console.log(err)
    res.status(500)
    res.send(err.message || "Error occurred")
}

function not_found(req, res, next) {
    res.status(404)
    res.send("Can't find route")
}

module.exports = {
    general_error_handler,
    not_found
}