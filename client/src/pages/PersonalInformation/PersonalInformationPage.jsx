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
} from "../../redux/personalInformationSlice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PersonalInformationPage = () => {
  const [height, setHeight] = useState();
  const [openPersonalInfoEditModal, setOpenPersonalInfoEditModal] =
    useState(false);
  const [openContactInfoModal, setOpenContactInfoModal] = useState(false);
  const [openContactInfoEditModal, setOpenContactInfoEditModal] =
    useState(false);
  const [openEmploymentEditModal, setOpenEmploymentEditModal] = useState(false);
  const [openAddFileModal, setOpenAddFileModal] = useState(false);
  const dispatch = useDispatch();
  const personalInformation = useSelector(selectPersonalInformation);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: { firstName: "", lastName: "", middleName: "", preferredName: "" },
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
      workPhoneNumbe: "",
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
  });

  // TODO: Fetch real userID from redux store
  useEffect(() => {
    console.log("Fetching personal information of:");
    dispatch(fetchPersonalInformationByUID(user.id)).then((response) => {
      setFormData(response.payload);
    });
  }, []);

  console.log(formData);
  
  const targetRef = useRef();
  useLayoutEffect(() => {
    console.log(targetRef);
  }, []);

  const handleOk = () => {
    setOpenPersonalInfoEditModal(false);
    setOpenContactInfoModal(false);
  };

  const handleCancel = () => {
    setOpenPersonalInfoEditModal(false);
    setOpenContactInfoModal(false);
  };

  const handleEmploymentEditButtonClick = () => {
    console.log("EmploymentEditButton clicked");
    setOpenEmploymentEditModal(true);
  };

  const handleContactInfoButtonClick = () => {
    console.log("ContactInfoButton clicked");
    setOpenContactInfoModal(true);
  };

  const handlePersonalInfoEditButtonClick = () => {
    console.log("PersonalInfoEditButton clicked");
    console.log(formData);
    setOpenPersonalInfoEditModal(true);
  };

  const handleContactInfoEditButton = () => {
    console.log("ContactInfoEditButton clicked");
    setOpenContactInfoEditModal(true);
  };

  const handleDocumentsEditButtonClick = () => {
    console.log("DocumentsEditButton clicked");
    setOpenAddFileModal(true);
  };

  const [form] = Form.useForm();

  const [employmentData, setEmploymentData] = useState({
    visatitle: "",
    startdate: {
      day: "",
      month: "",
      year: "",
    },
    enddate: {
      day: "",
      month: "",
      year: "",
    },
  });

  const handleSave = (e) => {
    console.log(e);
    setOpenEmploymentEditModal(false);
  };

  const handleChange = (e) => {
    console.log(e.target);
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
      console.log(formData);
    } else if (name == "cellPhoneNumber" || name == "workPhoneNumber") {
      setFormData({
        ...formData,
        phoneNumber: {
          ...formData.phoneNumber,
          [name]: value,
        },
      });
    } else if (name == "visatitle") {
      setEmploymentData({
        ...employmentData,
        visatitle: value,
      });
    } else if (
      name == "startdateday" ||
      name == "startdatemonth" ||
      name == "startdateyear"
    ) {
      setEmploymentData({
        ...employmentData,
        startdate: {
          ...employmentData.startdate,
          [name.slice(9).toLowerCase()]: value,
        },
      });
    } else if (
      name == "enddateday" ||
      name == "enddatemonth" ||
      name == "enddateyear"
    ) {
      setEmploymentData({
        ...employmentData,
        enddate: {
          ...employmentData.enddate,
          [name.slice(7).toLowerCase()]: value,
        },
      });
    } else if (name === "dobDay" || name === "dobMonth" || name === "dobYear") {
      setFormData({
        ...formData,
        dob: {
          ...formData.dob,
          [name.slice(3).toLowerCase()]: value,
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
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <>
      <div className="flex flex-col justify-between overflow-auto">
        <Header />

        <Modal
          title="Your Name"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openContactInfoModal}
          footer={[
            <Button key="cancel">Cancel</Button>,
            <Button key="save">Save</Button>,
          ]}
        >
          <button
            className="text-xl text-blue-500 bold"
            onClick={handleContactInfoEditButton}
          >
            Edit
          </button>
        </Modal>

        <Modal
          title="Add File"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openAddFileModal}
          footer={[
            <Button key="cancel">Cancel</Button>,
            <Button key="save">Save</Button>,
          ]}
        >
          <FileUpload />
        </Modal>

        <Modal
          title="Edit Employment Info"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openEmploymentEditModal}
          footer={[
            <Button key="cancel">Cancel</Button>,
            <Button key="save" name="employmentinfosave" onClick={handleSave}>
              Save
            </Button>,
          ]}
        >
          <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="visatitle" className="block text-sm font-medium">
                Visa Title
              </label>
              <input
                type="text"
                id="visatitle"
                name="visatitle"
                value={employmentData.visatitle}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex flex-row w-full space-x-2">
              <div className="mb-4">
                <label className="block text-sm font-medium">Start Date</label>
                <div className="flex">
                  <select
                    id="startdateday"
                    name="startdateday"
                    value={employmentData.startdate.day}
                    onChange={handleChange}
                    className="mr-1 p-2 border rounded-md"
                  >
                    <option value="">Day</option>
                    {generateDropdownOptions(1, 31)}
                  </select>
                  <select
                    id="startdatemonth"
                    name="startdatemonth"
                    value={employmentData.startdate.month}
                    onChange={handleChange}
                    className="mr-1 p-2 border rounded-md"
                  >
                    <option value="">Month</option>
                    {generateDropdownOptions(1, 12)}
                  </select>
                  <select
                    id="startdateyear"
                    name="startdateyear"
                    value={employmentData.startdate.year}
                    onChange={handleChange}
                    className="p-2 border rounded-md"
                  >
                    <option value="">Year</option>
                    {generateDropdownOptions(2000, 2030)}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">End Date</label>
                <div className="flex">
                  <select
                    id="enddateday"
                    name="enddateday"
                    value={employmentData.enddate.day}
                    onChange={handleChange}
                    className="mr-1 p-2 border rounded-md"
                  >
                    <option value="">Day</option>
                    {generateDropdownOptions(1, 31)}
                  </select>
                  <select
                    id="enddatemonth"
                    name="enddatemonth"
                    value={employmentData.enddate.month}
                    onChange={handleChange}
                    className="mr-1 p-2 border rounded-md"
                  >
                    <option value="">Month</option>
                    {generateDropdownOptions(1, 12)}
                  </select>
                  <select
                    id="enddateyear"
                    name="enddateyear"
                    value={employmentData.enddate.year}
                    onChange={handleChange}
                    className="p-2 border rounded-md"
                  >
                    <option value="">Year</option>
                    {generateDropdownOptions(2000, 2030)}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </Modal>

        <Modal
          title="Edit Contact Info"
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          open={openContactInfoEditModal}
        >
          <form
            className="max-w-md mx-auto mt-8"
            onSubmit={handleSubmit}
          ></form>
        </Modal>

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
            <Button key="save">Save</Button>,
          ]}
        >
          <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
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
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">I do not wish to answer</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <div className="flex">
                <select
                  id="dobDay"
                  name="dobDay"
                  // value={formData.dob.day}
                  onChange={handleChange}
                  className="mr-2 p-2 border rounded-md"
                >
                  <option value="">Day</option>
                  {generateDropdownOptions(1, 31)}
                </select>
                <select
                  id="dobMonth"
                  name="dobMonth"
                  // value={formData.dob.month}
                  onChange={handleChange}
                  className="mr-2 p-2 border rounded-md"
                >
                  <option value="">Month</option>
                  {generateDropdownOptions(1, 12)}
                </select>
                <select
                  id="dobYear"
                  name="dobYear"
                  // value={formData.dob.year}
                  onChange={handleChange}
                  className="p-2 border rounded-md"
                >
                  <option value="">Year</option>
                  {generateDropdownOptions(1900, new Date().getFullYear())}
                </select>
              </div>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                name="zipczipode"
                value={formData.address.zip}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
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
              <img
                src={personalInformation.profilePicture}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[150px] h-[150px] p-1 rounded-full ring-2 ring-gray-300 object-cover"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center space-y-2">
            <span className="text-3xl font-bold">
              {personalInformation.name.firstName}{" "}
              {personalInformation.name.lastName}
            </span>
            {personalInformation.gender == "male" ? (
              <span className="text-xl font-light text-gray-500">He/His</span>
            ) : personalInformation.gender == "female" ? (
              <span className="text-xl font-light text-gray-500">She/Her</span>
            ) : (
              <span className="text-xl font-light text-gray-500">
                They/Their
              </span>
            )}
            <div className="flex flex-col items-center">
              <span className="text-xl font-light text-gray-500">
                {personalInformation.address.streetName}{" "}
                {personalInformation.address.aptNumber}
              </span>
              <span className="text-xl font-light text-gray-500">
                {personalInformation.address.city},{" "}
                {personalInformation.address.state}{" "}
                {personalInformation.address.zip}
              </span>
            </div>
            <button
              className="text-xl text-blue-500 bold"
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
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={handleEmploymentEditButtonClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </div>
            </div>

            <div className="flex m-2 overflow-x-auto">
              <table className="table-fixed w-full text-left">
                <thead className="text-base uppercase bg-[#dedede]">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-1/2">
                      Visa Title
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/4">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/4">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      STEM OPT
                    </th>
                    <td className="px-6 py-4">January 10, 2024</td>
                    <td className="px-6 py-4">January 09, 2026</td>
                  </tr>
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
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </div>
            </div>

            <div className="flex m-2 overflow-x-auto">
              <table className="table-fixed w-full text-left">
                <thead className="text-base uppercase bg-[#dedede]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Relationship
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      Jane
                    </th>
                    <td className="px-6 py-4">Doe</td>
                    <td className="px-6 py-4">281-455-9170</td>
                    <td className="px-6 py-4">Friends</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid divide-y-[3px] divide-gray-500/20 border border-black rounded-3xl xs:w-[288px] sm:w-[576px] md:w-[691px] lg:w-[921px] xl:w-[1152px] 2xl:w-[1382px] 3xl:w-[1728px] h-fit">
            <div className="flex flex-row items-center justify-between">
              <span className="text-2xl font-bold px-8 py-2">Documents</span>
              <div className="px-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={handleDocumentsEditButtonClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </div>
            </div>

            <div className="flex m-2 overflow-x-auto">
              <table className="table-fixed w-full text-left">
                <thead className="text-base uppercase bg-[#dedede]">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-1/2">
                      File Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date Uploaded
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap overflow-clip"
                    >
                      dsaddadsao9d89hsiadoMP4sdsaddadsao9d89hsiadoMP4s.jpg
                    </th>
                    <td className="px-6 py-4">January 10, 2024</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
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
