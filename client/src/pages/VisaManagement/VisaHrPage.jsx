import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Tag } from "antd";
import ReviewAction from "../../components/ReviewAction";
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
          <Tag color="geekblue">{`Start Date : ${Work_Authorization.start_date}`}</Tag>
          <Tag color="geekblue">{`End Date : ${Work_Authorization.end_date}`}</Tag>
          <Tag color="geekblue">{`Remaining : ${Work_Authorization.remaining} days`}</Tag>
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
      render: (_, { Documentation }) => {
        // Documentation.map((doc) => {
        return <ReviewAction doc={Documentation} filter={status} />;
        // });
      },
    },
  ];
  const [info, setInfo] = useState({});
  const [status, setStatus] = useState("IN PROGRESS");
  const mockUser = {
    _id: "qweasdzxc123321",
    firstName: "Ruike",
  };
  useEffect(() => {
    const fetchDocs = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/visa/${mockUser._id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      setInfo(response.data);
    };
    fetchDocs();
  }, []);
  // mock data //

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
      Documentation: info,
    },
  ];

  // end of mock data //

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div className="mx-10 ">
      <p className="text-3xl text-geekblue my-10">Visa Status Management</p>
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
          className="py-3 px-2 bg-slate-200 text-geekblue rounded-md shadow-md"
        >
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="ALL">ALL</option>
        </select>
      </div>
      <div className=" flex items-center justify-center">
        {status === "IN PROGRESS" ? (
          <Table columns={columns1} dataSource={mockData} className="w-[80%]" />
        ) : (
          <Table columns={columns2} dataSource={mockData} className="w-[80%]" />
        )}
      </div>
    </div>
  );
};

export default VisaHrPage;
