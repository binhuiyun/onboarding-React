const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visaSchema = new Schema({
  employee: {
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
  },
});

const visaModel = mongoose.model("visaModel", visaSchema);
module.exports = { visaModel };
