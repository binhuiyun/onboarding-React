const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

module.exports.User = require("./user");
module.exports.Profile = require("./profile");