const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  onboardingStatus: {
    type: String,
    default: "Never submitted",
  },
  isHR: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);