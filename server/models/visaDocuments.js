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
    // opt receipt / opt ead / i983 / i20
  },
});
const optDocModel = mongoose.model("optDocModel", optDocSchema);

const visaSchema = new Schema({
  employee: {
    // TODO: change it back to ObjectId for user
    // type: Schema.Types.ObjectId,
    type: String,
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
  I983: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
  },
  I20: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "optDocModel",
  },
});

const visaModel = mongoose.model("visaModel", visaSchema);
module.exports = { optDocModel, visaModel };
