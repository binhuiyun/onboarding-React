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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  optReceipt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
    required: true,
  },
  optEAD: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
    required: true,
  },
  i983: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
    required: true,
  },
  i20: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
    required: true,
  },
});

const visaModel = mongoose.model("visaModel", visaSchema);
module.exports = { optDocModel, visaModel };
