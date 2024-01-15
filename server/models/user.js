const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  // onboardingStatus: {
  //   type: String,
  //   default: "Never submitted",
  // },
  isHR: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.comparePassword =  function (candidatePassword, next) {

    const isMatch =  candidatePassword === this.password;
    return isMatch;
 
};

module.exports = mongoose.model("User", userSchema);
