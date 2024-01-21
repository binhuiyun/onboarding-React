import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Tag, Input } from "antd";
import ReviewAction from "../../components/ReviewAction";
import SendNotification from "../../components/SendNotification";
import Header from "../layout/Header";

// api : router.get("/hr", getHrSideData);

const VisaHrPage = () => {
  // Table for IN PROGRESS
  const [searchText, setSearchText] = useState("");

  const columns1 = [
    {
      title: "Name",
      dataIndex: "allName",
      key: "allName",
      filteredValue: [searchText],
      render: (_, { allName }) => <p>{allName.name}</p>,
      onFilter: (value, record) => {
        return (
          String(record.allName.name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.allName.preferredName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.allName.middleName)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
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
      key: "newAction",
      render: (_, { newAction }) => (
        <>
          {newAction.message === "need review" ? (
            <ReviewAction
              file={newAction.fileToDeal}
              fileTitle={newAction.fileToDealName}
              filter={filter}
              id={newAction.id}
              fileType={newAction.fileType}
            />
          ) : (
            <SendNotification
              email={newAction.email}
              notification={newAction.notification}
            />
          )}
        </>
      ),
    },
  ];
  const columns2 = [
    {
      title: "Name",
      dataIndex: "allName",
      key: "allName",
      filteredValue: [searchText],
      render: (_, { allName }) => <p>{allName.name}</p>,
      onFilter: (value, record) => {
        return (
          String(record.allName.name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.allName.preferredName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.allName.middleName)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
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
          {Documentation.optReceipt.fileDoc && (
            <ReviewAction
              file={Documentation.optReceipt}
              fileTitle="OPT Receipt"
              filter={filter}
            />
          )}
          {Documentation.optEAD.fileDoc && (
            <ReviewAction
              file={Documentation.optEAD}
              fileTitle="OPT EAD"
              filter={filter}
            />
          )}
          {Documentation.I983.fileDoc && (
            <ReviewAction
              file={Documentation.I983}
              fileTitle="I-983"
              filter={filter}
            />
          )}
          {Documentation.I20.fileDoc && (
            <ReviewAction
              file={Documentation.I20}
              fileTitle="I-20"
              filter={filter}
            />
          )}
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

  console.log(info);
  const infoInProgress = info.filter(
    (user) => user.docStatus === "IN PROGRESS"
  );
  const dataSourceAll = info.map(
    (
      {
        name,
        Work_Authorization,
        Next_Step,
        Documentation,
        preferredName,
        middleName,
      },
      index
    ) => {
      let allName = {
        name: name,
        preferredName: preferredName,
        middleName: middleName,
      };
      return {
        key: index + 1,
        allName,
        Work_Authorization,
        Next_Step,
        Documentation,
      };
    }
  );
  const dataSourceInProgress = infoInProgress.map(
    (
      {
        id,
        name,
        Work_Authorization,
        Next_Step,
        action,
        fileToDeal,
        Documentation,
        fileToDealName,
        preferredName,
        middleName,
        email,
      },
      index
    ) => {
      let newAction = {};
      let allName = {
        name: name,
        preferredName: preferredName,
        middleName: middleName,
      };
      if (action === "need review") {
        newAction = {
          message: "need review",
          id: id,
          fileType: fileToDeal,
          fileToDeal: Documentation[fileToDeal],
          fileToDealName: fileToDealName,
        };
      } else if (action === "send notification") {
        newAction = {
          message: "send notification",
          id: id,
          notification: Next_Step,
          email: email,
        };
      }
      return {
        key: index + 1,
        allName,
        Work_Authorization,
        Next_Step,
        newAction,
      };
    }
  );
  console.log(dataSourceInProgress);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      <Header />
      <div className="mx-10 ">
        <p className="text-3xl text-geekblue my-10">Visa Status Management</p>
        <div className="">
          <Input.Search
            type="text"
            placeholder="  Search Employee  "
            className="w-[40%] mb-8 border-2 rounded-md text-xl text-gray-600"
            onSearch={(value) => {
              setSearchText(value);
            }}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="">
          <select
            name="filter"
            id="filter"
            onChange={handleFilterChange}
            className="py-3 px-2 bg-slate-200 text-geekblue rounded-md shadow-md mb-16"
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
              className="w-[90%]"
            />
          ) : (
            <Table
              columns={columns2}
              dataSource={dataSourceAll}
              className="w-[90%]"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VisaHrPage;
