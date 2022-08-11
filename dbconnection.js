const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const url = "mongodb://localhost:5000/chat";
const connect = mongoose.connect(url, {newUserUrlParser: true});
module.exports = connect;