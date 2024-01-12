const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: String,
  prefferedName: String,
  picture: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  address: {},
  cellNumber: {
    type: String,
    required: true,
  },
  documents :{
    type: Schema.Types.ObjectId,
    ref: "DocumentCollection"
  }
});

module.exports = mongoose.model("Profile", profileSchema);
