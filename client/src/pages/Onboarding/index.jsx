import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, Upload, Radio, Cascader } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const Onboarding = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values from form: ", values);
  };
  const { user } = useSelector((state) => state.user);
  //     const [profile, setProfile] = useState({
  //     user: user.id,
  //     firstName: "",
  //      astName: "",
  //      middleName: "",
  //     preferredName: "" ,
  //       aptNumber: "",
  //       streetName: "",
  //       city: "",
  //       state: "",
  //       zip: "",
  //     cellPhoneNumber: "",
  //     workPhoneNumber: "" ,
  //     email: "", // Assuming email is pre-filled and cannot be edited
  //     ssn: "",
  //     dateOfBirth: "",
  //     gender: "",

  //       citizenship: "",
  //       citizenType: "",
  //       workAuthorizationType: "",
  //       startDate: "",
  //       endDate: "",

  //     reference: {
  //       firstName: "",
  //       lastName: "",
  //       middleName: "",
  //       phone: "",
  //       email: "",
  //       relationship: "",
  //     },
  //     emergencyContact: [],
  //     //onboardingStatus: "",
  //   });

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
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item
          label="Profile Picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
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
          style={{ display: "inline-block", width: "calc(70% - 8px)" }}
        >
          <Input placeholder="Street Address" />
        </Form.Item>
        <Form.Item
          label="Apt"
          name="apt"
          rules={[{ required: true, message: "Please input your apt!" }]}
          style={{
            display: "inline-block",
            width: "calc(30% - 8px)",
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
          name="homePhone"
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
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="SSN" />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: "Please input your dob!" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input placeholder="Date of Birth" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="femele">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Citizenship"
          name="citizenship"
          rules={[{ required: true, message: "Please select" }]}
        >
          <Cascader
            options={[
              {
                value: "yes",
                label: "Yes",
                children: [
                  {
                    value: "citizen",
                    label: "Citizen",
                  },
                  {
                    value: "greenCard",
                    label: "Green Card",
                  },
                ],
              },
              {
                value: "no",
                label: "No",
                children: [
                  {
                    value: "h1b",
                    label: "H1B",
                  },
                  {
                    value: "l2",
                    label: "L2",
                  },
                  {
                    value: "f1",
                    label: "F1",
                  },
                  {
                    value: "h4",
                    label: "H4",
                  },

                  {
                    value: "other",
                    label: "Other",
                  },
                ],
              },
            ]}
            placeholder="Are you a US Citizen or permenent resident?"
          />
        </Form.Item>
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
          label="relationship"
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
          label="relationship"
          name="emergencyRelationship"
          rules={[{ required: true, message: "Please input relationship!" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Onboarding;
