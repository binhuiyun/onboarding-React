import React from "react";
import { Card, Col, Row , Button} from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";


const ReviewApplications = () => {
  const navigate = useNavigate();
  const handlePending = () => {
    navigate("pending");
  }
  const handleRejected = () => {
    navigate("rejected");
  }
  const handleApproved = () => {
    navigate("approved");
  }
  return (
    <>
    <Navbar />
      <h1>ReviewApplications</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Pending" bordered={false}>
            <Button onClick={handlePending}>view</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Rejected" bordered={false}>
          <Button onClick={handleRejected}>view</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Approved" bordered={false}>
          <Button onClick={handleApproved}>view</Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReviewApplications;
