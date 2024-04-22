import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Upload, Select, DatePicker, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createProfileThunk } from "../../thunks/profile-thunk";
const { Option } = Select;


const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const Onboarding = () => {
  const {user }= useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [citizenship, setCitizenship] = useState("");
  const [visaType, setVisaType] = useState("");
  const [dob, setDob] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  const [uploadedfiles, setUploadedfiles] = useState([]);

  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    const profile = {...values, dob, userId: user.id};
    dispatch(createProfileThunk(profile) );

  };

  const onChange = (date, dateString) => {
    console.log("current user", user.id);
    console.log(date, dateString);
    setDob(dateString);
  };

  const handleFileUpoad = (info) => {
    console.log("info", info.file);
    if (info.file.status === "done") {
      setUploadedfiles([...uploadedfiles, info.file.name]);
    }
  };

  const handleSelect = (value) => {
   setCitizenship(value);
  }
  const handleVisaType = (value) => {
    setVisaType(value);
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <Form style={{ maxWidth: 600 }}
      form = {form}
      onFinish={onFinish}>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Middle Name" name="middleName">
          <Input />
        </Form.Item>
        <Form.Item label="preferred Name" name="preferredName">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" initialValue={user.email}>
          <Input disabled={true}/>
        </Form.Item>

        <Form.Item
          label="Profile Picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action={`http://localhost:4000/api/personalInformation/create/profilePicture/${user.id}`}
           listType="picture-card"
           onChange={handleFileUpoad}>
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Street Address"
          name="streetAddress"
          rules={[
            { required: true, message: "Please input your street address!" },
          ]}
          style={{ display: "inline-block", width: "calc(75% - 8px)" }}
        >
          <Input placeholder="Street Address" />
        </Form.Item>
        <Form.Item
          label="Apt"
          name="apt"
          rules={[{ required: true, message: "Please input your apt!" }]}
          style={{
            display: "inline-block",
            width: "calc(25% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="Apt" />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
          style={{ display: "inline-block", width: "calc(33% - 8px)" }}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please input your state!" }]}
          style={{
            display: "inline-block",
            width: "calc(40% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="State" />
        </Form.Item>
        <Form.Item
          label="Zip"
          name="zip"
          rules={[{ required: true, message: "Please input your zip!" }]}
          style={{ display: "inline-block", width: "calc(27% - 8px)" }}
        >
          <Input placeholder="Zip" />
        </Form.Item>
        <Form.Item
          label="Cell Phone"
          name="cellPhone"
          rules={[{ required: true, message: "Please input your cellphone!" }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="Cell Phone" />
        </Form.Item>
        <Form.Item
          label="Work Phone"
          name="workPhone"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input placeholder="Work Phone" />
        </Form.Item>
        <Form.Item
          label="SSN"
          name="ssn"
          rules={[{ required: true, message: "Please input your ssn!" }]}
          style={{
            display: "inline-block",
            width: "calc(40% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="SSN" />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: "Please input your dob!" }]}
          style={{ display: "inline-block", width: "calc(60% - 8px)" }}
        >
          <DatePicker 
          onChange={onChange}/>
        </Form.Item>

        <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder="select your gender"
  >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

        <Form.Item 
          label="Citizenship"
          name="citizenship"
          rules={[{ required: true, message: "Please select" }]}
         
        >
          <Select onChange={handleSelect}
          placeholder="Are you a US Citizen or permenent resident?" >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
             </Form.Item>
        {citizenship === "yes" && (
          <Form.Item
          label="Citizen Type"
          name="workAuthorizationTitle"
          >
            <Select placeholder="Select citizen type">
              <Option value="citizen">Citizen</Option>
              <Option value="permanent resident">Permanent Resident</Option>
            </Select>
          </Form.Item>
        )
        }
        {citizenship === "no" && (
          <>
          <Form.Item
          label="Visa Type"
          name="workAuthorizationTitle"
          rules={[{ required: true, message: "Please input visa type!" }]}
          >
            <Select placeholder="Select visa type"
            onChange={handleVisaType}>
              <Option value="H1B">H1B</Option>
              <Option value="F1">F1(OPT/CPT)</Option>
              <Option value="J1">H4</Option>
              <Option value="L1">L1</Option>
              <Option value="Other">Other</Option>
            </Select>

          </Form.Item>
          {visaType === "Other" && (
          <Form.Item
          name="workAuthorizationTitle"
          >
            <Input placeholder="Please specify" />
            </Form.Item>
          )}
          {visaType === "F1" && (
             <Form.Item
             label="OPT Receipt"
             getValueFromEvent={normFile}
             
           >
             <Upload action={`http://localhost:4000/api/document/${user.id}/optReceipt`} 
             listType="picture-card"
             onChange={handleFileUpoad}>
               <button
                 style={{
                   border: 0,
                   background: "none",
                 }}
                 type="button"
               >
                 <PlusOutlined />
                 <div
                   style={{
                     marginTop: 8,
                   }}
                 >
                   Upload
                 </div>
               </button>
             </Upload>
           </Form.Item>
           )}
        <Form.Item
          label = "Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please input your start date!" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
          <DatePicker onChange={(date, dateString)=> setStartDate(dateString)}/>
          </Form.Item>
            <Form.Item className="ml-4"
            label = "End Date"
            name = "endDate"
            rules={[{ required: true, message: "Please input your end date!" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
            <DatePicker onChange={(date, dateString)=> setEndDate(dateString)}/>
            </Form.Item>
            </>
        )}

        
        
        <p>Reference</p>
        <Form.Item
          label="First Name"
          name="referenceFirstName"
          rules={[{ required: true, message: "Please input first name!" }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="referenceLastName"
          rules={[{ required: true, message: "Please input last name!" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Relationship"
          name="referenceRelationship"
          rules={[{ required: true, message: "Please input relationship!" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        <p>Emergency Contact</p>
        <Form.Item
          label="First Name"
          name="emergencyFirstName"
          rules={[{ required: true, message: "Please input first name!" }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="emergencyLastName"
          rules={[{ required: true, message: "Please input last name!" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Relationship"
          name="emergencyRelationship"
          rules={[{ required: true, message: "Please input relationship!" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>

        {uploadedfiles.length > 0 && (
          <List
            header={<div>Summary of Uploaded Documents</div>}
            bordered
            dataSource={uploadedfiles}
            renderItem={(item) => (
              <List.Item>
                <div>{item}</div>
              </List.Item>
            )}
          />
        )}

        <Form.Item className="mt-4">
          <Button size="large"  htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Onboarding;
