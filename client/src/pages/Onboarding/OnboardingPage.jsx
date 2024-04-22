import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  submitOnboarding,
  updateOnboarding,
} from "../../redux/onboardingSlice";
import { Document, Page, pdfjs } from "react-pdf";
import FilePreviewer from "../../components/FilePreviewer";
import {
  fetchUserByIdThunk,
  updateCurrentUserThunk,
} from "../../thunks/auth-thunk";
import { updateTokenStatusThunk } from "../../thunks/token-thunk";
import { fetchPersonalInformationByUID } from "../../redux/personalInformationSlice";
import Header from "../layout/Header";
import { updateApplicationStatusThunk } from "../../thunks/application-thunk";

import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Modal,
  Space,
} from "antd";
const { TextArea } = Input;
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ProfileForm from "../../components/ProfileForm";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const OnboardingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRejectedModal, setShowRejectedModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [onboardingStatus, setOnboardingStatus] = useState(null);
  const [optReceipt, setOptReceipt] = useState();
  const u_id = localStorage.getItem("userID");
  const [newEmergencyContact, setNewEmergencyContact] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    relationship: "",
  });
  //const [formData, setFormData] = useState(application);
  const [formData, setFormData] = useState({
    user: u_id,
    name: { firstName: "", lastName: "", middleName: "", preferredName: "" },
    defaultProfilePicture:
      "https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.webp",
    profilePicture: "",
    address: {
      aptNumber: "",
      streetName: "",
      city: "",
      state: "",
      zip: "",
    },
    phoneNumber: { cellPhoneNumber: "", workPhoneNumber: "" },
    email: "", // Assuming email is pre-filled and cannot be edited
    ssn: "",
    dateOfBirth: "",
    gender: "",
    workAuthorization: {
      citizenship: "",
      citizenType: "",
      workAuthorizationType: "",
      startDate: "",
      endDate: "",
    },
    reference: {
      firstName: "",
      lastName: "",
      middleName: "",
      phone: "",
      email: "",
      relationship: "",
    },
    emergencyContact: [],
    //onboardingStatus: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const document = new FormData();

  useEffect(() => {
    console.log("Current user: ", u_id);
    dispatch(fetchUserByIdThunk(u_id)).then((res) => {
      console.log("Fetched user:", res.payload);
      setFormData({ ...formData, email: res.payload.email });
    });
    setFormData({ ...formData, user: u_id });
    dispatch(fetchPersonalInformationByUID(u_id))
      .then((res) => {
        if (res.payload == null) {
          console.log("Failed: No personal information record found");
        } else {
          console.log("Fetched personal information:", res.payload);
          setOnboardingStatus(res.payload.onboardingStatus);
          setFormData(res.payload);
          setNewEmergencyContact(res.payload.emergencyContact[0]);
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (onboardingStatus == "pending") setShowModal(true);
    else if (onboardingStatus == "rejected") setShowRejectedModal(true);
    else if (onboardingStatus == "approved") navigate("/personal-information");
  }, [onboardingStatus]);

  useEffect(() => {
    if (newEmergencyContact === undefined) return;
    console.log("New emergency contact:", newEmergencyContact);
    setFormData({
      ...formData,
      emergencyContact: [newEmergencyContact],
    });
  }, [newEmergencyContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWorkAuthorizationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      workAuthorization: {
        ...formData.workAuthorization,
        [name]: value,
      },
    });
  };

  const handleProfilePictureChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    try {
      await axios
        .post(
          `http://localhost:4000/api/personalInformation/create/profilePicture/${u_id}`,
          data
        )
        .then((res) => {
          console.log("Get uploaded picture buffer:", res.data.buffer);
          setFormData({
            ...formData,
            profilePicture: res.data.buffer,
          });
        });
    } catch (err) {
      console.log(err);
    }
    //addFile(file);
  };

  const handleProfileUploadButtonClick = () => {
    // Trigger the hidden file input using the ref
    fileInputRef.current.click();
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      name: {
        ...formData.name,
        [name]: value,
      },
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      phoneNumber: {
        ...formData.phoneNumber,
        [name]: value,
      },
    });
  };

  const addFile = (file) => {
    setOptReceipt(file);
  };

  const handleReferenceChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      reference: {
        ...formData.reference,
        [name]: value,
      },
    });
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    console.log("Emergency contact:", newEmergencyContact);
    setNewEmergencyContact({
      ...newEmergencyContact,
      [name]: value,
    });
  };
  const handleCancel = () => {
    setShowModal(false);
    setShowRejectedModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onboardingStatus == "rejected") updateInfo(e);
    else createInfo(e);
    dispatch(updateTokenStatusThunk(user.email));
  };

  async function updateInfo(e) {
    e.preventDefault();
    const payload = {
      formData,
      u_id,
      document,
    };
    dispatch(updateOnboarding(payload)).then((res) => {
      console.log("Updated onboarding:", res.payload);
      //navigate("/personal-information");
    });
    dispatch(
      updateApplicationStatusThunk({
        id: formData._id,
        payload: { onboardingStatus: "pending" },
      })
    );
    alert("Your application has been submitted for review");
    navigate("/onboarding");
  }

  async function createInfo(e) {
    e.preventDefault();
    // TODO: MAY NOT BE ANY FILES
    if (
      formData.workAuthorization.citizenship === "no" &&
      formData.workAuthorization.workAuthorizationType === "F1(CPT/OPT)"
    ) {
      document.append("file", optReceipt, optReceipt.name);
      const data = new FormData();
      data.append("file", optReceipt);
      await axios.post(`http://localhost:4000/api/folder/${u_id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully");
    }
    const payload = {
      formData,
      u_id,
      document,
    };
    dispatch(submitOnboarding(payload)).then((res) => {
      navigate("/personal-information");
    });
  }

  if (loading) {
    // Render loading state if data is still being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        title={"Hello " + formData.name.firstName + ","}
        open={showModal}
        onCancel={handleCancel}
        footer={[]}
      >
        <hr style={{ margin: "8px 0" }} />
        <p className="text-lg">
          Please wait for HR to review your application.
        </p>
      </Modal>

      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: "orange" }} />
            Sorry, your application has been rejected
          </Space>
        }
        open={showRejectedModal}
        onCancel={handleCancel}
        footer={[]}
      >
        <hr style={{ margin: "8px 0" }} />
        <p className="text-lg">Please review and update your information.</p>
      </Modal>

      <Header user={user} />
      {onboardingStatus == "pending" && (
        <ProfileForm employeeProfile={formData} />
      )}
      {onboardingStatus != "pending" && (
        <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.name.firstName}
              onChange={handleNameChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block  ">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.name.lastName}
              onChange={handleNameChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Middle Name */}
          <div className="mb-4">
            <label htmlFor="middleName" className="block  ">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.name.middleName}
              onChange={handleNameChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Preferred Name */}
          <div className="mb-4">
            <label htmlFor="preferredName" className="block  ">
              Preferred Name
            </label>
            <input
              type="text"
              id="preferredName"
              name="preferredName"
              value={formData.name.preferredName}
              onChange={handleNameChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Profile Picture */}
          <div className=" flex flex-col mb-4">
            <div className="flex flew-row justify-between">
              <label htmlFor="profilePicture" className="block">
                Profile Picture
              </label>
            </div>
            <div className="relative">
              <img
                src={
                  formData.profilePicture.data &&
                  formData.profilePicture.data.length > 0
                    ? URL.createObjectURL(
                        new Blob(
                          [new Uint8Array(formData.profilePicture.data)],
                          {
                            type: "image/png",
                          }
                        )
                      )
                    : formData.defaultProfilePicture
                }
                alt="Profile"
                className="mt-2 w-32 h-32 object-cover rounded-full mx-auto"
              />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: "none" }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#0373fc"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="absolute w-10 h-10 bottom-0 left-1/2 translate-x-7"
                onClick={handleProfileUploadButtonClick}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>

          {/* Current Address */}
          <div className="mb-4">
            <label className="block">
              Current Address <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="aptNumber"
                name="aptNumber"
                value={formData.address.aptNumber}
                onChange={handleAddressChange}
                placeholder="Apt Number"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                id="streetName"
                name="streetName"
                value={formData.address.streetName}
                onChange={handleAddressChange}
                placeholder="Street Name"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                id="city"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                placeholder="City"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                id="state"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                placeholder="State"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.address.zip}
                onChange={handleAddressChange}
                placeholder="Zip"
                className="mt-1 p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Cell Phone Number */}
          <div className="mb-4">
            <label htmlFor="cellPhoneNumber" className="block  ">
              Cell Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="cellPhoneNumber"
              name="cellPhoneNumber"
              value={formData.phoneNumber.cellPhoneNumber}
              onChange={handlePhoneNumberChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Work Phone Number */}
          <div className="mb-4">
            <label htmlFor="workPhoneNumber" className="block  ">
              Work Phone Number
            </label>
            <input
              type="tel"
              id="workPhoneNumber"
              name="workPhoneNumber"
              value={formData.phoneNumber.workPhoneNumber}
              onChange={handlePhoneNumberChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block  ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="mt-1 p-2 border rounded-md w-full bg-[#e9e9e9]"
            />
          </div>

          {/* SSN */}
          <div className="mb-4">
            <label htmlFor="ssn" className="block  ">
              SSN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ssn"
              name="ssn"
              value={formData.ssn}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block   ">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">I do not wish to answer</option>
            </select>
          </div>

          {/* Citizenship Status */}
          <div className="mb-4">
            <label htmlFor="citizenship" className="block  ">
              Permanent resident or citizen of the U.S.?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="citizenship"
              name="citizenship"
              value={formData.workAuthorization.citizenship}
              onChange={handleWorkAuthorizationChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Rendering based on Citizenship Status */}
          {formData.workAuthorization.citizenship === "yes" && (
            <div className="mb-4">
              <label htmlFor="citizenType" className="block  ">
                Choose your status:
              </label>
              <select
                id="citizenType"
                name="citizenType"
                value={formData.workAuthorization.citizenType}
                onChange={handleWorkAuthorizationChange}
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="greenCard">Green Card</option>
                <option value="citizen">Citizen</option>
              </select>
            </div>
          )}

          {formData.workAuthorization.citizenship === "no" && (
            <div>
              {/* Work Authorization */}

              <div className="mb-4">
                <label htmlFor="workAuthorizationType" className="block">
                  What is your work authorization?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="workAuthorizationType"
                  name="workAuthorizationType"
                  value={formData.workAuthorization.workAuthorizationType}
                  onChange={handleWorkAuthorizationChange}
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="H1-B">H1-B</option>
                  <option value="L2">L2</option>
                  <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
                  <option value="H4">H4</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.workAuthorization.startDate}
                  onChange={handleWorkAuthorizationChange}
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.workAuthorization.endDate}
                  onChange={handleWorkAuthorizationChange}
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              {formData.workAuthorization.workAuthorizationType ===
                "F1(CPT/OPT)" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="workAuthorizationFiles" className="block">
                      Upload a file for work authorization:
                    </label>
                    <FilePreviewer addFile={addFile} />
                  </div>
                </>
              )}
              {formData.workAuthorization.workAuthorizationType === "Other" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="cellPhoneNumber" className="block  ">
                      Visa Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="visaTitle"
                      name="visaTitle"
                      value={formData.phoneNumber.cellPhoneNumber}
                      required
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                </>
              )}
              {/* File Upload for Work Authorization */}
            </div>
          )}

          {/* Reference */}
          <div className="mb-4">
            <label className="block">Reference</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.reference.firstName}
                onChange={handleReferenceChange}
                placeholder="First Name"
                className="mt-1 p-2 border rounded-md"
                required
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.reference.lastName}
                onChange={handleReferenceChange}
                placeholder="Last Name"
                className="mt-1 p-2 border rounded-md"
                required
              />
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.reference.middleName}
                onChange={handleReferenceChange}
                placeholder="Middle Name"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.reference.fetchUserByIdThunkphone}
                onChange={handleReferenceChange}
                placeholder="Phone"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.reference.email}
                onChange={handleReferenceChange}
                placeholder="Email"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                id="relationship"
                name="relationship"
                value={formData.reference.relationship}
                onChange={handleReferenceChange}
                placeholder="Relationship"
                className="mt-1 p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mb-4">
            <label className="block">Emergency Contact</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={newEmergencyContact.firstName}
                onChange={handleEmergencyContactChange}
                placeholder="First Name"
                className="mt-1 p-2 border rounded-md"
                required
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={newEmergencyContact.lastName}
                onChange={handleEmergencyContactChange}
                placeholder="Last Name"
                className="mt-1 p-2 border rounded-md"
                required
              />
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={newEmergencyContact.middleName}
                onChange={handleEmergencyContactChange}
                placeholder="Middle Name"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={newEmergencyContact.phone}
                onChange={handleEmergencyContactChange}
                placeholder="Phone"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="email"
                id="email"
                name="email"
                value={newEmergencyContact.email}
                onChange={handleEmergencyContactChange}
                placeholder="Email"
                className="mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                id="relationship"
                name="relationship"
                value={newEmergencyContact.relationship}
                onChange={handleEmergencyContactChange}
                placeholder="Relationship"
                className="mt-1 p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Feedback */}
          {onboardingStatus == "rejected" && (
            <div className="mb-4">
              <label htmlFor="HRfeedback" className="block">
                Rejected Reason
              </label>
              <TextArea
                readOnly
                id="HRfeedback"
                name="HRfeedback"
                value={formData.HRfeedback}
                rows="3"
                style={{ background: "#f5f5f5", borderColor: "#d9d9d9" }}
                className="mt-1 p-2 rounded-md w-full hover:cursor-not-allowed"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default OnboardingPage;
