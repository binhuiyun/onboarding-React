import React, {useState } from "react";
import { Table, Button } from "antd";
import { set } from "mongoose";

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
];

export default function HiringManagement() {
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const onRowClick = (record) => {
    setSelectedRowKey(record.key);
    setSelectedEmail(record.email);
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys: selectedRowKey,
    onChange: (selectedRowKeys,selectedRows) => {
      setSelectedRowKey(selectedRowKeys[0]);
      setSelectedEmail(selectedRows[0]?.email || "");
    },
  };

  const handleSendEmail = () => {
    console.log(selectedEmail);
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
      <Button type="primary" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
    onClick={handleSendEmail}>Generate token and send email</Button>
    </div>
  );
}
