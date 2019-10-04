const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("./helpers/jwt");
const ipFilter = require("express-ipfilter");
const errorHandler = require("./helpers/errorHandler");
const config = require("./config.json");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use(ipFilter(config.whiteListIPs));

// routes
app.use('/user', require('./user/user.controller'));

// global error handler
app.use(errorHandler);

function startServer(callback) {

}

function stopServer() {

}

module.exports = {
  startServer,
  stopServer
}