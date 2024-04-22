const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalInformationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: String,
  preferredName: String,

  defaultProfilePicture: {
    type: String,
    default:
      "https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.webp",
  },
  profilePicture: {
    type: Buffer,
  },

  apt: {
    String,
    type: String,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },

  cellPhone: { type: String, required: true },
  workPhone: String,

  email: { type: String, required: true },
  ssn: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  citizenship: { type: String, required: true },
  workAuthorizationTitle: String,
  startDate: String,
  endDate: String,


  referenceFirstName: { type: String, required: true },
  referenceLastName: { type: String, required: true },

  referencePhone: String,

  referenceRelationship: { type: String, required: true },

  emergencyFirstName: { type: String, required: true },
  emergencyLastName: { type: String, required: true },

  emergencyPhone: String,

  emergencyRelationship: { type: String, required: true },

  uploadedDocuments: [{
    type: Buffer,
    fileName: String,

  }],

  onboardingStatus: {
    type: String,
    default: "pending",
  },
  HRfeedback: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Profile", personalInformationSchema);
