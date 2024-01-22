//TODO :refeence and emergency contact render and document upload
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import axios from "axios";

const ProfileForm = ({ employeeProfile }) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/visa/${employeeProfile.user}`)
      .then((res) => {
        setDocuments(res.data.optReceipt);
        console.log("Documents:", res.data);
      });
  }, []);

  const handleDocumentClick = (e) => {
    console.log("Document Clicked");
    console.log(documents);
    const blob = new Blob([new Uint8Array(documents.fileDoc.data)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    employeeProfile && (
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

            <Form.Item label="Reference">
              <Row gutter={0} style={{ height: 35, visibility: "hidden" }} />
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input
                      style={{ textTransform: "capitalize" }}
                      value={employeeProfile.reference.firstName}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <Input
                      style={{ textTransform: "capitalize" }}
                      value={employeeProfile.reference.lastName}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Middle Name">
                    <Input
                      style={{ textTransform: "capitalize" }}
                      value={employeeProfile.reference.middleName}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input value={employeeProfile.reference.email} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Relationship">
                    <Input
                      style={{ textTransform: "capitalize" }}
                      value={employeeProfile.reference.relationship}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            {employeeProfile.emergencyContact.map((entry, index) => (
              <Form.Item label="Emergency Contact">
              <Row gutter={0} style={{ height: 35, visibility: "hidden" }} />
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item label="First Name">
                      <Input
                        style={{ textTransform: "capitalize" }}
                        value={entry.firstName}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Last Name">
                      <Input
                        style={{ textTransform: "capitalize" }}
                        value={entry.lastName}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Middle Name">
                      <Input
                        style={{ textTransform: "capitalize" }}
                        value={entry.middleName}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Email">
                      <Input value={entry.email} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Relationship">
                      <Input value={entry.relationship} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            ))}

            <Form.Item label="Documents">
              <span
                className="cursor-pointer hover:text-blue-500 transition duration-300"
                onClick={handleDocumentClick}
              >
                {documents && documents.fileName}
              </span>
            </Form.Item>
          </Form>
        </div>
      </>
    )
  );
};

export default ProfileForm;
