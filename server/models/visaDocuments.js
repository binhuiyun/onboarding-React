const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visaSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  optReceipt: {
    fileName: {
      type: String,
      required: true,
    },
    fileDoc: {
      type: Buffer,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: false,
    },
  },
  optEAD: {
    fileName: {
      type: String,
      required: true,
    },
    fileDoc: {
      type: Buffer,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: false,
    },
  },
  i983: {
    fileName: {
      type: String,
      required: true,
    },
    fileDoc: {
      type: Buffer,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: false,
    },
  },
  i20: {
    fileName: {
      type: String,
      required: true,
    },
    fileDoc: {
      type: Buffer,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: false,
    },
  },
});

module.exports = mongoose.model("Visa", visaSchema);
