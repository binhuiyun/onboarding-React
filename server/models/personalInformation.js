const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalInformationSchema = new Schema({
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
  profilePicture: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  currentAddress: {
    aptNumber: String,
    streetName: {
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
  },
  cellPhoneNumber: { type: String, required: true },
  workPhoneNumber: String,
  email: { type: String, required: true },
  ssn: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  citizenshipStatus: { type: String, required: true },
  citizenshipType: String,
  workAuthorization: String,

  employment: [
    {
      visaTitle: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  emergencyContact: [
    {
      firstName: String,
      lastName: String,
      middleName: String,
      phone: String,
      email: String,
      relationship: String,
    },
  ],
  documents: {
    type: Schema.Types.ObjectId,
    ref: "DocumentCollection",
  },
});

module.exports = mongoose.model("Profile", personalInformationSchema);
