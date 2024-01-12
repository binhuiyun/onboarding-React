const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workAuthorizationSchema = new Schema({
    title : {
        type: String,
        required: true,
        default: "Work Authorization",
    },
    startDate : {
        type: Date,
        required: true,
    },
    endDate : {
        type: Date,
        required: true,
    },
    remainingDays : Number
});

const documentSchema = new Schema({
    title : {
        type: String,
        required: true
    }

});

const documentCollectionSchema = new Schema({
    // Or may be profileID?
    emplyeeId : {
        type: Schema.Types.ObjectId,
        ref: "Employee",
    },
    documents : [Schema.Types.Mixed],
});

   
module.exports = mongoose.model("DocumentCollection", documentCollectionSchema) ;
