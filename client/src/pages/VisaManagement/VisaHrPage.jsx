import React, { useState } from "react";
import axios from "axios";
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
      render: (_, { Work_Authorization }) => (
        <>
          <Tag color="geekblue">{Work_Authorization.title}</Tag>
          <Tag color="green">{`Start Date : ${Work_Authorization.start_date}`}</Tag>
          <Tag color="yellow">{`End Date : ${Work_Authorization.end_date}`}</Tag>
          <Tag color="volcano">{`Remaining : ${Work_Authorization.remaining} days`}</Tag>
        </>
      ),
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
  // mock data //
  const mockUser = {
    _id: "qweasdzxc123321",
    firstName: "Ruike",
  };
  const mockData = [
    {
      key: "1",
      name: "Ruike Qiu",
      Work_Authorization: {
        title: "F1(CPT/OPT)",
        start_date: "Jan 1st",
        end_date: "Sept 1st",
        remaining: 25,
      },
      Next_Step: "ead",
      Documentation: "abc",
    },
  ];
  // end of mock data //
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
