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
      dataIndex: "Work_Authorization",
      key: "Work Authorization",
    },
    {
      title: "Next Step",
      dataIndex: "Next_Step",
      key: "Next Step",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
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
      dataIndex: "Work_Authorization",
      key: "Work_Authorization",
    },
    {
      title: "Next Step",
      dataIndex: "Next_Step",
      key: "Next_Step",
    },
    {
      title: "Documentation",
      dataIndex: "Documentation",
      key: "Documentation",
    },
  ];
  const mockData = [
    {
      key: "1",
      name: "Ruike Qiu",
      Work_Authorization: "F1(CPT/OPT)",
      Next_Step: "ead",
      Documentation: "abc",
    },
  ];
  const [status, setStatus] = useState("IN PROGRESS");
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div className="mx-10 ">
      <p className="text-3xl text-chuwa-blue my-10">Visa Status Management</p>
      <div className="">
        <input
          type="text"
          placeholder="  Search Employee  "
          className="h-[5vh] w-[40%] mb-8 border-2 rounded-md text-xl text-gray-600"
        />
      </div>
      <div className="">
        <select
          name="status"
          id="status"
          onChange={handleStatusChange}
          className="py-3 px-2 bg-slate-200 text-chuwa-blue rounded-md shadow-md"
        >
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="ALL">ALL</option>
        </select>
      </div>
      <div className=" flex items-center justify-center">
        {status === "IN PROGRESS" ? (
          <Table columns={columns1} dataSource={mockData} className="w-[70%]" />
        ) : (
          <Table columns={columns2} dataSource={mockData} className="w-[70%]" />
        )}
      </div>
    </div>
  );
};

export default VisaHrPage;
