import React, { useState, useRef, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ProfileForm = (props) => {
  console.log(props);
  const employeeProfile = props.personalInformation;
  return (
    <>
      <div className="flex flex-col items-center mt-6">
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
          disabled
          style={{
            width: 1000,
          }}
        >
          <Form.Item label="First Name">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.name.firstName}
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.name.lastName}
            />
          </Form.Item>
          <Form.Item label="Middle Name">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.name.middleName}
            />
          </Form.Item>
          <Form.Item label="Preferred Name">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.name.preferredName}
            />
          </Form.Item>
          <Form.Item label="Address">
            <TextArea
              value={[
                employeeProfile.address.streetName,
                ` ${employeeProfile.address.aptNumber}\n${employeeProfile.address.city}`,
                ` ${employeeProfile.address.state} ${employeeProfile.address.zip}`,
              ]}
            />
          </Form.Item>
          <Form.Item label="Cell Phone Number">
            <Input value={employeeProfile.phoneNumber.cellPhoneNumber} />
          </Form.Item>
          <Form.Item label="Work Phone Number">
            <Input value={employeeProfile.phoneNumber.workPhoneNumber} />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={employeeProfile.email} />
          </Form.Item>
          <Form.Item label="Social Security Number">
            <Input value={employeeProfile.ssn} />
          </Form.Item>
          <Form.Item label="Date of Birth">
            <Input value={employeeProfile.dateOfBirth} />
          </Form.Item>
          <Form.Item label="Gender">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.gender}
            />
          </Form.Item>
          <Form.Item label="Permanent resident or citizen of the U.S">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.workAuthorization.citizenship}
            />
          </Form.Item>
          <Form.Item label="Work Authorization">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.workAuthorization.workAuthorizationType}
            />
          </Form.Item>
          <Form.Item label="Start Date">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.workAuthorization.startDate}
            />
          </Form.Item>
          <Form.Item label="End Date">
            <Input
              style={{ textTransform: "capitalize" }}
              value={employeeProfile.workAuthorization.endDate}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ProfileForm;
