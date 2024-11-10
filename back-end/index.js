require('dotenv').config();
const express = require('express');
const { general_error_handler, not_found } = require('./src/middlewares/error_handler');
const { display_message } = require('./src/utils/printer');
const static_text = require("./src/utils/static_texts");
const router = require("./src/routes");
const app = express();
const bodyParser = require("body-parser");

const app_port = process.env.APP_PORT;
const app_origin = process.env.APP_ORIGIN;
const allowed_methods = process.env.APP_ALLOWED_METHODS;
const allowed_headers = process.env.APP_CONTENT_TYPE
const api_prefix = process.env.API_PREFIX;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const setHeaders = (req, res, next) => {
    res.header(static_text.access_control_origin, app_origin)
    res.header(static_text.access_control_methods, allowed_methods)
    res.header(static_text.access_control_headers, allowed_headers)
    next();
}
app.use(static_text.middleware_empty_path, setHeaders)

app.use(api_prefix, router)

app.use(general_error_handler);
app.use(not_found);

app.listen(app_port, () => {
    display_message(static_text.server_start_text, app_port);
});
