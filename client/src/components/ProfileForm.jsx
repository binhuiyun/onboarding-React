import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Table, Space} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentThunk } from "../thunks/document-thunk";

const { TextArea } = Input;

const ProfileForm = ({ employeeProfile, disabled, form, onFinish}) => {
  const { document } = useSelector((state) => state.document);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocumentThunk(employeeProfile.userId));
    console.log("Employee Profile fetching docs");
  }, [employeeProfile.userId]);

  const handlePreview = (record) => {
    console.log("Previewing", record);
    const blob = new Blob([new Uint8Array(record.fileDoc.data)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };


  const columns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          <a onClick={() => handlePreview(record)}>Preview</a>
        </Space>
      ),
    },
  ];

  return (
    employeeProfile && (
      <>
        <div className="flex flex-col items-center mt-6">
          <Form onFinish={onFinish} form={form}
            disabled={disabled}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 12,
            }}
            layout="horizontal"
            style={{
              width: 1000,
            }}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              initialValue={employeeProfile.firstName}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              initialValue={employeeProfile.lastName}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>
            <Form.Item
              label="Middle Name"
              name="middleName"
              initialValue={employeeProfile.middleName}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>
            <Form.Item
              label="Preferred Name"
              name="preferredName"
              initialValue={employeeProfile.preferredName}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>
            <Form.Item
              label="Address"
              name="Address"
              initialValue={[
                employeeProfile.streetAddress,
                ` ${employeeProfile.apt}\n${employeeProfile.city}`,
                ` ${employeeProfile.state} ${employeeProfile.zip}`,
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Cell Phone Number"
              name="cellPhone"
              initialValue={employeeProfile.cellPhone}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Work Phone Number"
              name="workPhone"
              initialValue={employeeProfile.workPhone}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              initialValue={employeeProfile.email}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Social Security Number"
              name="ssn"
              initialValue={employeeProfile.ssn}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="dob"
              initialValue={employeeProfile.dob}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              initialValue={employeeProfile.gender}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>
            <Form.Item
              label="Permanent resident or citizen of the U.S"
              name="citizenship"
              initialValue={employeeProfile.citizenship}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>
            <Form.Item
              label="Work Authorization"
              name="workAuthorizationTitle"
              initialValue={employeeProfile.workAuthorizationTitle}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>
            <Form.Item
              label="Start Date"
              name="startDate"
              initialValue={employeeProfile.startDate}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>
            <Form.Item
              label="End Date"
              name="endDate"
              initialValue={employeeProfile.endDate}
            >
              <Input style={{ textTransform: "capitalize" }} />
            </Form.Item>

            <Form.Item label="Reference">
              <Row gutter={0} style={{ height: 35, visibility: "hidden" }} />
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="referenceFirstName"
                    initialValue={employeeProfile.referenceFirstName}
                  >
                    <Input style={{ textTransform: "capitalize" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="referenceLastName"
                    initialValue={employeeProfile.referenceLastName}
                  >
                    <Input style={{ textTransform: "capitalize" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="phone"
                    name="referencePhone"
                    initialValue={employeeProfile.referencePhone}
                  >
                    <Input style={{ textTransform: "capitalize" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Relationship"
                    name="referenceRelationship"
                    initialValue={employeeProfile.referenceRelationship}
                  >
                    <Input style={{ textTransform: "capitalize" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="Emergency Contact">
              <Row gutter={0} style={{ height: 35, visibility: "hidden" }} />
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="emergencyFirstName"
                    initialValue={employeeProfile.emergencyFirstName}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="emergencyLastName"
                    initialValue={employeeProfile.emergencyLastName}
                  >
                    <Input style={{ textTransform: "capitalize" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="phone"
                    name="emergencyPhone"
                    initialValue={employeeProfile.emergencyPhone}
                  >
                    <Input style={{ textTransform: "capitalize" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Relationship"
                    name="emergencyRelationship"
                    initialValue={employeeProfile.emergencyRelationship}
                  >
                    <Input style={{ textTransform: "capitalize" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
  
     
          </Form>
        <p>Documents</p>
          <Table
            columns={columns}
            dataSource={document.documents}
            pagination={false}
          />

        </div>
      </>
    )
  );
};

export default ProfileForm;
