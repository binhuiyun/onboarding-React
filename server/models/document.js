const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    fileName: {
        type: String,
        required: true,
    },
    fileDoc:{
        type: Buffer,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Not submitted",
    },
    feedback: {
        type: String,
        required: true,
        default: "",
    },
});

module.exports = mongoose.model('Document', documentSchema);