const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
  
    fileName: {
        type:String,
        required: true,
     
    },
    fileType: {
        type: String,
        enum: ['optReceipt', 'i20', 'optEAD', 'i983', 'profilePic'],
    },
    fileDoc:{
        type: Buffer,
        required: true,
    },
    status: {
        type: String,
        default: "Not submitted",
    },
    feedback: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model('Doc', docSchema);