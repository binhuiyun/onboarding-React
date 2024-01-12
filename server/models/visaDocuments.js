const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const optDocSchema = new Schema({
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
  },
  fileType: {
    type: String,
    required: true,
  },
});
const optDocModel = mongoose.model("optDocModel", optDocSchema);

const visaSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  optReceipt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
  },
  optEAD: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
  },
  i983: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
  },
  i20: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
  },
});

const visaModel = mongoose.model("visaModel", visaSchema);
module.exports = { optDocModel, visaModel };
