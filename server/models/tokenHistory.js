const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenHistorySchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    // name:{
    //     type: String,
    //     required: true,
    // },
    link:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: "Not submitted",

    }
    });

module.exports = mongoose.model("TokenHistory", tokenHistorySchema);