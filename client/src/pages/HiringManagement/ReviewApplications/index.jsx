import React from "react";
import { Card, Col, Row , Button} from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";


const ReviewApplications = () => {
  const approveStyle ={
    color: "#52c41a",
  }
  const rejectStyle ={
    color: "#f5222d",
  }
  const pendingStyle ={
    color: "#faad14",
  }
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
    <div className="flex justify-center items-center text-3xl text-geekblue mx-20 mb-10 mt-10">
        Review Applications
    </div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title={<div style={pendingStyle}>Pending</div>} >
       
            <Button onClick={handlePending}>view</Button>
          </Card>
        </Col>
        <Col span={8}>
       
          <Card title={<div style={rejectStyle}>
            Rejected</div>} bordered={false}>
          <Button onClick={handleRejected}>view</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<div style={approveStyle}>
          Approved</div>} bordered={false}>
          <Button onClick={handleApproved}>view</Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReviewApplications;
