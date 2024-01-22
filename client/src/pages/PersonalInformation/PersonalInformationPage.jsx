import { React, useLayoutEffect, useRef, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  Radio,
  Dropdown,
  Space,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import {
  fetchPersonalInformationByUID,
  selectPersonalInformation,
  savePersonalInformation,
  savePersonalInformationWithEmploymentInformation,
  savePersonalInformationWithEmergencyContact,
} from "../../redux/personalInformationSlice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";

const PersonalInformationPage = () => {
  const didMountRef = useRef(false);
  const fileInputRef = useRef(null);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const u_id = localStorage.getItem("userID");
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState();
  const [documents, setDocuments] = useState();
  const [openPersonalInfoEditModal, setOpenPersonalInfoEditModal] =
    useState(false);
  const [openContactInfoModal, setOpenContactInfoModal] = useState(false);
  const [openContactInfoEditModal, setOpenContactInfoEditModal] =
    useState(false);
  const [openEmploymentAddModal, setOpenEmploymentAddModal] = useState(false);
  const [openAddFileModal, setOpenAddFileModal] = useState(false);
  const [openEmergencyContactAddModal, setOpenEmergencyContactAddModal] =
    useState(false);
  const [employmentData, setEmploymentData] = useState({
    visaTitle: "",
    startDate: "",
    endDate: "",
  });
  const [emergencyContactData, setEmergencyContactData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    relationship: "",
  });
  const [
    formDataWithEmploymentInformation,
    setFormDataWithEmploymentInformation,
  ] = useState();
  const [formDataWithEmergencyContact, setFormDataWithEmergencyContact] =
    useState();
  const [formData, setFormData] = useState({
    name: { firstName: "", lastName: "", middleName: "", preferredName: "" },
    defaultProfilePicture: "",
    profilePicture: "",
    address: {
      aptNumber: "",
      streetName: "",
      city: "",
      state: "",
      zip: "",
    },
    phoneNumber: {
      cellPhoneNumber: "",
      workPhoneNumber: "",
    },
    email: "",
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
    emergencyContact: [
      {
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        relationship: "",
      },
    ],
    employment: [],
  });
  const [clicked, setClicked] = useState(false);
  const [beforeEditFormData, setBeforeEditFormData] = useState();

  useEffect(() => {
    console.log("Current user: ", u_id);
    dispatch(fetchPersonalInformationByUID(u_id)).then((res) => {
      if (res.payload == null) {
        // TODO: Handle error, shouldn't fetch nothing at this point
        console.log("Failed: No personal information record found");
      } else {
        console.log("Fetched personal information:", res.payload);
        setFormData(res.payload);
      }
    });
    // TODO: handle more documents

    if (
      formData.workAuthorization.citizenship === "no" &&
      formData.workAuthorization.workAuthorizationType === "F1(CPT/OPT)"
    ) {
      axios
        .get(`http://localhost:4000/api/visa/${u_id}`)
        .then((res) => {
          setDocuments(res.data.optReceipt);
        })
        .then(() => {
          setTimeout(() => {
            // Set loading to false after 1 second
            setLoading(false);
          }, 1000);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (formDataWithEmploymentInformation == undefined) return;
    const payload = {
      u_id,
      formDataWithEmploymentInformation,
    };
    dispatch(savePersonalInformationWithEmploymentInformation(payload)).then(
      (res) => {
        console.log("Saved personal information:", res.payload);
        setFormData(res.payload);
      }
    );
  }, [formDataWithEmploymentInformation]);

  useEffect(() => {
    if (formDataWithEmergencyContact == undefined) return;
    const payload = {
      u_id,
      formDataWithEmergencyContact,
    };
    dispatch(savePersonalInformationWithEmergencyContact(payload)).then(
      (res) => {
        console.log("Saved personal information:", res.payload);
        setFormData(res.payload);
      }
    );
  }, [formDataWithEmergencyContact]);

  const targetRef = useRef();
  useLayoutEffect(() => {
    //console.log(targetRef);
  }, []);

  const handleOk = () => {
    setOpenPersonalInfoEditModal(false);
    setOpenContactInfoModal(false);
  };

  const handleCancel = () => {
    setOpenPersonalInfoEditModal(false);
    setOpenContactInfoModal(false);
    setOpenContactInfoEditModal(false);
    setOpenEmploymentAddModal(false);
    setOpenAddFileModal(false);
  };

  const handleEmploymentEditButtonClick = () => {
    console.log("AddEmploymentButton clicked");
    setOpenEmploymentAddModal(true);
  };

  const handleContactInfoButtonClick = () => {
    console.log("ContactInfoButton clicked");
    setOpenContactInfoModal(true);
  };

  const handlePersonalInfoEditButtonClick = () => {
    console.log("PersonalInfoEditButton clicked");
    setBeforeEditFormData(formData);
    setOpenPersonalInfoEditModal(true);
  };

  const handleContactInfoEditButton = () => {
    console.log("ContactInfoEditButton clicked");
    setOpenContactInfoModal(false);
    setOpenContactInfoEditModal(true);
  };

  const [form] = Form.useForm();

  const handleEmployeeDataChange = (e) => {
    const { name, value } = e.target;
    setEmploymentData({
      ...employmentData,
      [name]: value,
    });
  };

  const handleEmergencyContactDataChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContactData({
      ...emergencyContactData,
      [name]: value,
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

  const handleAddEmploymentInformationSaveButtonClick = (e) => {
    setClicked(true);
    console.log("AddEmploymentInformationSaveButton Clicked");
    setFormDataWithEmploymentInformation({
      ...formData,
      employment: [...formData.employment, employmentData],
    });
    setOpenEmploymentAddModal(false);
  };

  const handleAddEmergencyContactSaveButtonClick = (e) => {
    console.log("AddEmergencyContactSaveButton Clicked");
    setFormDataWithEmergencyContact({
      ...formData,
      emergencyContact: [...formData.emergencyContact, emergencyContactData],
    });
    setOpenEmergencyContactAddModal(false);
  };

  const handleEditInformationSaveButtonClick = (e) => {
    console.log("EditInformationSaveButton Clicked");
    const payload = {
      u_id,
      formData,
    };
    dispatch(savePersonalInformation(payload)).then((res) => {
      console.log("Saved personal information:", res.payload);
      setFormData(res.payload);
    });
    setOpenPersonalInfoEditModal(false);
  };

  const handleEditContactInfoSaveButtonClick = (e) => {
    console.log("EditContactInfoSaveButton Clicked");
    const payload = {
      u_id,
      formData,
    };
    dispatch(savePersonalInformation(payload)).then((res) => {
      console.log("Saved personal information:", res.payload);
      setFormData(res.payload);
    });
    setOpenContactInfoEditModal(false);
  };

  const handleDocumentClick = (e) => {
    console.log("Document Clicked");
    const blob = new Blob([new Uint8Array(documents.fileDoc.data)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  async function handleDelete(employmentEntry) {
    console.log(
      `Delete Clicked to delete employment ${employmentEntry.visaTitle}:`
    );
    await axios
      .put(
        `http://localhost:4000/api/personalInformation/delete/employment/${employmentEntry.visaTitle}`,
        formData
      )
      .then((res) => {
        console.log("Deleted employment information", res.data);
        setFormData(res.data);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name == "firstName" ||
      name == "lastName" ||
      name == "middleName" ||
      name == "preferredName"
    ) {
      setFormData({
        ...formData,
        name: {
          ...formData.name,
          [name]: value,
        },
      });
    } else if (name == "cellPhoneNumber" || name == "workPhoneNumber") {
      setFormData({
        ...formData,
        phoneNumber: {
          ...formData.phoneNumber,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const generateDropdownOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here, like making an API call to update the user profile
    console.log("Form submitted:", formData);
  };

  const confirm = (e) => {
    setFormData(beforeEditFormData);
  };
  const cancel = (e) => {
    console.log(e);
  };

  const handleProfilePictureClick = () => {
    // Trigger the hidden file input using the ref
    fileInputRef.current.click();
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    try {
      await axios
        .post(
          `http://localhost:4000/api/personalInformation/upload/profilePicture/${u_id}`,
          data
        )
        .then((res) => {
          console.log("Upload profile picture success:", res.data);
          setFormData({
            ...formData,
            profilePicture: res.data.buffer,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmergencyContactAddButtonClick = async (e) => {
    console.log("EmergencyContactAddButton Clicked");
    setOpenEmergencyContactAddModal(true);
  };

  if (loading) {
    // Render loading state if data is still being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-between overflow-auto">
        <Header user={user}/>

        {/* Contact Info Modal*/}
        <Modal
          title="Contact Info"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openContactInfoModal}
          footer={[]}
        >
          <hr style={{ margin: "8px 0" }} />
          <div className="flex flex-col">
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                onClick={handleContactInfoEditButton}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <label className="text-xl font-semibold col-span-7">
                  Phone
                </label>

                <div className="text-lg col-start-2 col-span-7">
                  {formData.phoneNumber.cellPhoneNumber}
                </div>
              </div>

              <div className="grid grid-cols-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <label className="text-xl font-semibold col-span-7">
                  Address
                </label>

                <div className="text-lg col-start-2 col-span-7">
                  {formData.address.streetName}, {formData.address.aptNumber}{" "}
                  <br /> {formData.address.city}, {formData.address.state}{" "}
                  {formData.address.zip}
                </div>
              </div>

              <div className="grid grid-cols-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <label className="text-xl font-semibold col-span-7">
                  Email
                </label>

                <div className="text-lg col-start-2 col-span-7">
                  {formData.email}
                </div>
              </div>

              <div className="grid grid-cols-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <label className="text-xl font-semibold col-span-7">
                  Birthday
                </label>

                <div className="text-lg col-start-2 col-span-7">
                  {formData.dateOfBirth}
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Add Document Modal*/}
        <Modal
          title="Add Document"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openAddFileModal}
          footer={[
            <Button key="cancel">Cancel</Button>,
            <Button key="save">Save</Button>,
          ]}
        >
          <hr style={{ margin: "8px 0" }} />
          <FileUpload />
        </Modal>

        {/* Add Emergency Contact Modal*/}
        <Modal
          title="Add Emergency Contact"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openEmergencyContactAddModal}
          footer={[
            <Button key="cancel">Cancel</Button>,
            <Button
              key="save"
              name="employmentinfosave"
              onClick={handleAddEmergencyContactSaveButtonClick}
            >
              Save
            </Button>,
          ]}
        >
          <hr style={{ margin: "8px 0" }} />
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={emergencyContactData.firstName}
                    onChange={handleEmergencyContactDataChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={emergencyContactData.lastName}
                    onChange={handleEmergencyContactDataChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="middleName"
                    className="block text-sm font-medium"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={emergencyContactData.middleName}
                    onChange={handleEmergencyContactDataChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="relationship"
                    className="block text-sm font-medium"
                  >
                    Relationship
                  </label>
                  <input
                    type="text"
                    id="relationship"
                    name="relationship"
                    value={emergencyContactData.relationship}
                    onChange={handleEmergencyContactDataChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={emergencyContactData.phone}
                  onChange={handleEmergencyContactDataChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={emergencyContactData.email}
                  onChange={handleEmergencyContactDataChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </div>
          </form>
        </Modal>

        {/* Add Employment Information Modal*/}
        <Modal
          title="Add Employment Information"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openEmploymentAddModal}
          footer={[
            <Button key="cancel">Cancel</Button>,
            <Button
              key="save"
              name="employmentinfosave"
              onClick={handleAddEmploymentInformationSaveButtonClick}
            >
              Save
            </Button>,
          ]}
        >
          <hr style={{ margin: "8px 0" }} />
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="visaTitle" className="block text-sm font-medium">
                Visa Title
              </label>
              <input
                type="text"
                id="visaTitle"
                name="visaTitle"
                value={employmentData.visaTitle}
                onChange={handleEmployeeDataChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex space-x-4">
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={employmentData.startDate}
                  onChange={handleEmployeeDataChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4 w-1/2">
                <label htmlFor="endDate" className="block text-sm font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={employmentData.endDate}
                  onChange={handleEmployeeDataChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </div>
          </form>
        </Modal>

        {/* Edit Contact Info Modal*/}
        <Modal
          title="Edit Contact Info"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openContactInfoEditModal}
          footer={[
            <Popconfirm
              title="Discard changes?"
              description="Are you sure to discard all your changes?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger key="cancel">
                Cancel
              </Button>
            </Popconfirm>,
            <Button key="save" onClick={handleEditContactInfoSaveButtonClick}>
              Save
            </Button>,
          ]}
        >
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber.cellPhoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="pronoun"
                className="block text-sm font-medium text-gray-600"
              >
                Date of Birth
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

            <div className="mb-4">
              <label
                htmlFor="streetName"
                className="block text-sm font-medium text-gray-600"
              >
                Street Address
              </label>
              <input
                id="streetName"
                name="streetName"
                value={formData.address.streetName}
                onChange={handleAddressChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="aptNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Apt, suite, etc.
              </label>
              <input
                id="aptNumber"
                name="aptNumber"
                value={formData.address.aptNumber}
                onChange={handleAddressChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-600"
              >
                State
              </label>
              <input
                id="state"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="zip"
                className="block text-sm font-medium text-gray-600"
              >
                Zip Code
              </label>
              <input
                id="zip"
                name="zip"
                value={formData.address.zip}
                onChange={handleAddressChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
          </form>
        </Modal>

        {/* Edit Information Modal*/}
        <Modal
          title="Edit Information"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openPersonalInfoEditModal}
          footer={[
            <Popconfirm
              title="Discard changes?"
              description="Are you sure to discard all your changes?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger key="cancel">
                Cancel
              </Button>
            </Popconfirm>,
            <Button key="save" onClick={handleEditInformationSaveButtonClick}>
              Save
            </Button>,
          ]}
        >
          <hr style={{ margin: "8px 0" }} />
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.name.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.name.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="middleName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.name.middleName}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="preferredName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Preferred Name
                </label>
                <input
                  type="text"
                  id="preferredName"
                  name="preferredName"
                  value={formData.name.preferredName}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="ssn"
                className="block text-sm font-medium text-gray-600"
              >
                Social Security Number
              </label>
              <input
                type="text"
                id="ssn"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="pronoun"
                className="block text-sm font-medium text-gray-600"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">I do not wish to answer</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="pronoun"
                className="block text-sm font-medium text-gray-600"
              >
                Date of Birth
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

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <label
                  htmlFor="cellPhoneNumber"
                  className="block text-sm font-medium text-gray-600"
                >
                  Cell Phone
                </label>
                <input
                  id="cellPhoneNumber"
                  name="cellPhoneNumber"
                  value={formData.phoneNumber.cellPhoneNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="workPhoneNumber"
                  className="block text-sm font-medium text-gray-600"
                >
                  Work Phone
                </label>
                <input
                  id="workPhoneNumber"
                  name="workPhoneNumber"
                  value={formData.phoneNumber.workPhoneNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <label
                  htmlFor="streetName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Street Address
                </label>
                <input
                  id="streetName"
                  name="streetName"
                  value={formData.address.streetName}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="aptNumber"
                  className="block text-sm font-medium text-gray-600"
                >
                  Apt, suite, etc.
                </label>
                <input
                  id="aptNumber"
                  name="aptNumber"
                  value={formData.address.aptNumber}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-600"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-600"
                >
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-600"
                >
                  Zip Code
                </label>
                <input
                  id="zip"
                  name="zip"
                  value={formData.address.zip}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </div>
          </form>
        </Modal>

        <div className="flex flex-col h-full content-start items-center my-12 space-y-6">
          <div
            ref={targetRef}
            style={height}
            className="flex flex-col xs:h-[138px] sm:h-[200px] md:h-[225px] lg:h-[275px] xl:h-[325px] 2xl:h-[375px] 3xl:h-[451px]"
          >
            <div className="flex flex-col relative xs:w-[288px] sm:w-[576px] md:w-[691px] lg:w-[921px] xl:w-[1152px] 2xl:w-[1382px] 3xl:w-[1728px] h-fit">
              <div className="flex justify-center xs:h-[63px] sm:h-[125px] md:h-[150px] lg:h-[200px] xl:h-[250px] 2xl:h-[300px] 3xl:h-[376px]">
                <img
                  src="https://cdn.theatlantic.com/thumbor/NiYsHGRQ6iDE2giXWCd0mAiEh2o=/0x1501:4656x4120/1952x1098/media/img/mt/2020/05/LON72718/original.jpg"
                  className="max-w-full rounded-3xl object-cover"
                />
              </div>
              <div>
                {/* TODO: NEED TO REFRESH FOR UPLODED PICTURE */}
                <img
                  src={
                    formData.profilePicture &&
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
                  className="hover:cursor-pointer absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[150px] h-[150px] p-1 rounded-full ring-2 ring-gray-300 object-cover"
                  onClick={handleProfilePictureClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  id="fileInput"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center space-y-2">
            <span className="text-3xl font-bold">
              {formData.name.firstName} {formData.name.lastName}
            </span>
            {formData.gender == "male" ? (
              <span className="text-xl font-light text-gray-500">He/His</span>
            ) : formData.gender == "female" ? (
              <span className="text-xl font-light text-gray-500">She/Her</span>
            ) : (
              <span className="text-xl font-light text-gray-500">
                They/Their
              </span>
            )}
            <div className="flex flex-col items-center">
              <span className="text-xl font-light text-gray-500">
                {formData.address.streetName}
                {", "}
                {formData.address.aptNumber}
              </span>
              <span className="text-xl font-light text-gray-500">
                {formData.address.city}, {formData.address.state}{" "}
                {formData.address.zip}
              </span>
            </div>
            <button
              className="text-xl text-blue-500 bold hover:underline"
              onClick={handleContactInfoButtonClick}
            >
              Contact Info
            </button>
          </div>
          <button
            type="button"
            className="text-base mt-6 bg-black text-white px-16 py-3 rounded-full"
            onClick={handlePersonalInfoEditButtonClick}
          >
            Edit
          </button>

          <div className="grid divide-y-[3px] divide-gray-500/20 border border-black rounded-3xl xs:w-[288px] sm:w-[576px] md:w-[691px] lg:w-[921px] xl:w-[1152px] 2xl:w-[1382px] 3xl:w-[1728px] h-fit">
            <div className="flex flex-row items-center justify-between">
              <span className="text-2xl font-bold px-8 py-2">Employment</span>
              <div className="px-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 hover:cursor-pointer"
                  onClick={handleEmploymentEditButtonClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>

            <div className="flex m-2 overflow-x-auto">
              <table className="table-fixed w-full text-left">
                <thead className="text-base uppercase bg-[#dedede]">
                  <tr>
                    <th scope="col" className="px-12 py-3 w-2/5">
                      Visa Title
                    </th>
                    <th scope="col" className="px-12 py-3 w-1/4">
                      Start Date
                    </th>
                    <th scope="col" className="px-12 py-3 w-1/4">
                      End Date
                    </th>
                    <th scope="col" className="px-12 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.employment.map((employmentEntry, index) => (
                    <tr key={index} className="border-b-2">
                      <th
                        scope="row"
                        className="px-12 py-4 font-medium whitespace-nowrap"
                      >
                        {employmentEntry.visaTitle}
                      </th>
                      <td className="px-12 py-4">
                        {new Date(employmentEntry.startDate).toLocaleDateString(
                          "en-US"
                        )}
                      </td>
                      <td className="px-12 py-4">
                        {new Date(employmentEntry.endDate).toLocaleDateString(
                          "en-US"
                        )}
                      </td>
                      <td className="px-12 py-4">
                        <div className="flex justify-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 hover:cursor-pointer"
                            onClick={(e) => handleDelete(employmentEntry)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid divide-y-[3px] divide-gray-500/20 border border-black rounded-3xl xs:w-[288px] sm:w-[576px] md:w-[691px] lg:w-[921px] xl:w-[1152px] 2xl:w-[1382px] 3xl:w-[1728px] h-fit">
            <div className="flex flex-row items-center justify-between">
              <span className="text-2xl font-bold px-8 py-2">
                Emergency Contact
              </span>
              <div className="px-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 hover:cursor-pointer"
                  onClick={handleEmergencyContactAddButtonClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>

            <div className="flex m-2 overflow-x-auto">
              <table className="table-fixed w-full text-left">
                <thead className="text-base uppercase bg-[#dedede]">
                  <tr>
                    <th scope="col" className="px-12 py-3">
                      First Name
                    </th>
                    <th scope="col" className="px-12 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="px-12 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-12 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-12 py-3">
                      Relationship
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.emergencyContact.map(
                    (emergencyContactEntry, index) => (
                      <tr key={index} className="border-b-2">
                        <th
                          scope="row"
                          className="px-12 py-4 font-medium whitespace-nowrap"
                        >
                          {emergencyContactEntry.firstName}
                        </th>
                        <td className="px-12 py-4">
                          {emergencyContactEntry.lastName}
                        </td>
                        <td className="px-12 py-4">
                          {emergencyContactEntry.phone}
                        </td>
                        <td className="px-12 py-4">
                          {emergencyContactEntry.email}
                        </td>
                        <td className="px-12 py-4">
                          {emergencyContactEntry.relationship}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid divide-y-[3px] divide-gray-500/20 border border-black rounded-3xl xs:w-[288px] sm:w-[576px] md:w-[691px] lg:w-[921px] xl:w-[1152px] 2xl:w-[1382px] 3xl:w-[1728px] h-fit">
            <div className="flex flex-row items-center justify-between">
              <span className="text-2xl font-bold px-8 py-2">Documents</span>
            </div>

            <div className="flex m-2 overflow-x-auto">
              <table className="table-fixed w-full text-left">
                <thead className="text-base uppercase bg-[#dedede]">
                  <tr>
                    <th scope="col" className="px-12 py-3 w-1/2">
                      File Name
                    </th>
                    <th scope="col" className="px-12 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-12 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th
                      scope="row"
                      className="px-12 py-4 font-medium whitespace-nowrap overflow-clip"
                      onClick={handleDocumentClick}
                    >
                      <span className="cursor-pointer hover:text-blue-500 transition duration-300">
                        {documents && documents.fileName}
                      </span>
                    </th>
                    <td className="px-12 py-4">
                      <span className="capitalize">
                        {documents && documents.status}
                      </span>
                    </td>
                    <td className="px-12 py-4">
                      <div className="flex justify-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 hover:cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PersonalInformationPage;
