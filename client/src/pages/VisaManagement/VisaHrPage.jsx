import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Tag } from "antd";
import ReviewAction from "../../components/ReviewAction";

// api : router.get("/hr", getHrSideData);
const VisaHrPage = () => {
  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Work Authorization",
      dataIndex: "Work_Authorization",
      key: "Work Authorization",
      render: (_, { Work_Authorization }) => (
        <>
          <Tag color="geekblue">{`Title : ${Work_Authorization.title}`}</Tag>
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      // render: (_, { action }) => {
      //   // Documentation.map((doc) => {
      //   return <ReviewAction doc={Documentation} filter={status} />;
      //   // });
      // },
    },
  ];
  const columns2 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Work Authorization",
      dataIndex: "Work_Authorization",
      key: "Work_Authorization",
      render: (_, { Work_Authorization }) => (
        <>
          <Tag color="geekblue">{`Title : ${Work_Authorization.title}`}</Tag>
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

      render: (_, { Documentation }) => (
        <>
          <ReviewAction
            file={Documentation.optReceipt}
            fileTitle="OPT Receipt"
            filter={filter}
          />
          <ReviewAction
            file={Documentation.optEAD}
            fileTitle="OPT EAD"
            filter={filter}
          />
          <ReviewAction
            file={Documentation.I983}
            fileTitle="I-983"
            filter={filter}
          />
          <ReviewAction
            file={Documentation.I20}
            fileTitle="I-20"
            filter={filter}
          />
        </>
      ),
    },
  ];
  const [info, setInfo] = useState([]);
  const [filter, setFilter] = useState("IN PROGRESS");
  useEffect(() => {
    const fetchDocs = async () => {
      const response = await axios.get("http://localhost:4000/api/visa/hr");
      setInfo(response.data);
    };
    fetchDocs();
  }, []);
  const dataSourceAll = info.map(
    ({ name, Work_Authorization, Next_Step, Documentation }, index) => {
      return {
        key: index + 1,
        name,
        Work_Authorization,
        Next_Step,
        Documentation,
      };
    }
  );
  console.log(dataSourceAll);
  const dataSourceInProgress = info.map(
    ({ name, Work_Authorization, Next_Step, action, fileToDeal }, index) => {
      return {
        key: index + 1,
        name,
        Work_Authorization,
        Next_Step,
        action,
      };
    }
  );

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
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
          name="filter"
          id="filter"
          onChange={handleFilterChange}
          className="py-3 px-2 bg-slate-200 text-geekblue rounded-md shadow-md"
        >
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="ALL">ALL</option>
        </select>
      </div>
      <div className=" flex items-center justify-center">
        {filter === "IN PROGRESS" ? (
          <Table
            columns={columns1}
            dataSource={dataSourceInProgress}
            className="w-[80%]"
          />
        ) : (
          <Table
            columns={columns2}
            dataSource={dataSourceAll}
            className="w-[80%]"
          />
        )}
      </div>
    </div>
  );
};

export default VisaHrPage;
