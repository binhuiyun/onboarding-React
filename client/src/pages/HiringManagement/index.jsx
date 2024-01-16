import React, { useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const data = [
  {
    key: "1",
    name: "Huiyun",
    email: "bin.h@northeastern.edu",
  },
  {
    key: "2",
    name: "Alice",
    email: "alice@gmail.com",
  },
  {
    key: "3",
    name: "Bob",
    email: "bob@gmail.com",
  }
];

export default function HiringManagement() {
  const navigate = useNavigate();
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const onRowClick = (record) => {
    setSelectedRowKey(record.key);
    setSelectedEmail(record.email);
    setSelectedName(record.name);
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys: selectedRowKey,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKey(selectedRowKeys[0]);
      setSelectedEmail(selectedRows[0]?.email || "");
      setSelectedName(selectedRows[0]?.name || "");
    },
  };

  const handleSendToken = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/tokenHistory", {
        email: selectedEmail,
        name: selectedName,
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  const handleReviewApplications = () => {
    navigate("applications");
  };

  return (
    <div>
      <h1>Hiring Management</h1>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            onRowClick(record);
          },
        })}
        pagination={false}
      />
      <br />
      <Button onClick={handleSendToken}>Generate token and send email</Button>
      <br />
      <br />
      <Button onClick={handleReviewApplications}>View Applications</Button>
      <br />
      <br />
      <Button onClick={()=> navigate("token")}> View Token History</Button>
    </div>
  );
}
