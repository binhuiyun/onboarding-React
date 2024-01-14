const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

module.exports.User = require("./user");
module.exports.Profile = require("./profile");
module.exports.DocumentCollection = require("./documentCollection");
module.exports.TokenHistory = require("./tokenHistory");