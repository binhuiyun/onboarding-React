import React from "react";
import { Card, Col, Row , Button} from "antd";
import { useNavigate } from "react-router-dom";

const ReviewApplications = () => {
  const navigate = useNavigate();
  const handlePending = () => {
    navigate("pending");
  }
  return (
    <div>
      <h1>ReviewApplications</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Pending" bordered={false}>
            <Button onClick={handlePending}>view</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Rejected" bordered={false}>
          <Button >view</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Approved" bordered={false}>
          <Button >view</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewApplications;
