function display_message(message, arg) {
    console.log("---------------------------")
    console.log(message, arg || '')
    console.log("---------------------------")
}

module.exports = {
    display_message
}