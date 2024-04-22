const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visaSchema = new Schema({
  user: {
    // type: Schema.Types.ObjectId,
    type: String,
    required: true,
  },
  optReceipt: {
    fileName: {
      type: String,
    },
    fileDoc: {
      type: Buffer,
    },
    status: {
      type: String,
    },
    feedback: {
      type: String,
    },
  },
  optEAD: {
    fileName: {
      type: String,
    },
    fileDoc: {
      type: Buffer,
    },
    status: {
      type: String,
    },
    feedback: {
      type: String,
    },
  },
  I983: {
    fileName: {
      type: String,
    },
    fileDoc: {
      type: Buffer,
    },
    status: {
      type: String,
    },
    feedback: {
      type: String,
    },
  },
  I20: {
    fileName: {
      type: String,
    },
    fileDoc: {
      type: Buffer,
    },
    status: {
      type: String,
    },
    feedback: {
      type: String,
    },
  },
});

module.exports = mongoose.model("visaModel", visaSchema);

