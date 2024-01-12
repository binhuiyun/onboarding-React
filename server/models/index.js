const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

module.exports.Employee = require("./employee");
module.exports.Profile = require("./profile");