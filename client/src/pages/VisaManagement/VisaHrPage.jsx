import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
const VisaHrPage = () => {
  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Work Authorization",
      dataIndex: "Work Authorization",
      key: "Work Authorization",
    },
    {
      title: "Next Step",
      dataIndex: "Next Step",
      key: "Next Step",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const columns2 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Work Authorization",
      dataIndex: "Work Authorization",
      key: "Work Authorization",
    },
    {
      title: "Next Step",
      dataIndex: "Next Step",
      key: "Next Step",
    },
    {
      title: "Documentation",
      dataIndex: "Documentation",
      key: "Documentation",
    },
  ];
  const [status, setStatus] = useState("IN PROGRESS");
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div className="">
      <p>Visa Status Management</p>
      <div className="">
        <input type="text" placeholder="Search Employee" />
      </div>
      <div className="">
        <select name="status" id="status" onChange={handleStatusChange}>
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="ALL">ALL</option>
        </select>
      </div>
      {status === "IN PROGRESS" ? (
        <Table columns={columns1} />
      ) : (
        <Table columns={columns2} />
      )}
    </div>
  );
};

export default VisaHrPage;
