const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

//mongoose.connect(process.env.MONGODB_URL);

module.exports.User = require("./user");
module.exports.Profile = require("./personalInformation");
module.exports.Folder = require("./folder");
module.exports.TokenHistory = require("./tokenHistory");