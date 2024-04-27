import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileByOptThunk,
  getInProgressProfileThunk,
} from "../../thunks/profile-thunk";
import { updateDocumentThunk } from "../../thunks/document-thunk";
import RejectFeedback from "../../components/RejectFeedback";

const VisaHrPage = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profile);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [filter, setFilter] = useState("IN PROGRESS");

  useEffect(() => {
    if (filter === "IN PROGRESS") {
      dispatch(getInProgressProfileThunk());
    } else {
      dispatch(getProfileByOptThunk());
    }
  }, [filter]);

  useEffect(() => {
    const filteredList = profiles.filter((employee) => {
      const { firstName, lastName, preferredName } = employee;
      const searchString = `${firstName} ${lastName} ${preferredName}`.toLowerCase();
      return searchString.includes(searchText.toLowerCase());
    });
    setFilteredEmployees(filteredList);
  }, [searchText, profiles]);

  const handlePreview = (record) => {
    console.log("Previewing", record);
    const blob = new Blob([new Uint8Array(record.fileDoc.data)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleApprove = (doc) => {
    console.log("Approving");
    message.open({
      type: "success",
      content: "File approved",
      duration: 2,
    });
    const updatedDoc = { ...doc, status: "approved" };
    dispatch(updateDocumentThunk(updatedDoc));
  };

  const toBeApproved = (profile) => {
    return (
      profile.uploadedDocuments.find(
        (doc) => doc.status === "pending" && doc.fileType !== "optReceipt"
      ) || profile.onboardingStatus === "pending"
    );
  };
  const column1 = [
    {
      title: "Name",
      dataIndex: "allName",
      key: "allName",
    },
    {
      title: "Work Authorization",
      dataIndex: "Work_Authorization",
      key: "Work_Authorization",
      render: (_, record) => (
        <>
          <Tag color="geekblue">{`Title : ${record.Work_Authorization.workAuthorizationTitle}`}</Tag>
          <Tag color="geekblue">{`Start Date : ${record.Work_Authorization.startDate}`}</Tag>
          <Tag color="geekblue">{`End Date : ${record.Work_Authorization.endDate}`}</Tag>
          <Tag color="geekblue">{`Remaining : ${record.Work_Authorization.remaining} days`}</Tag>
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
      dataIndex: "Action",
      key: "Action",
      render: (_, record) => (
        //  console.log("record in action", toBeApproved(record.Action))
        <>
          {record.Next_Step === "Waiting for HR approval" ? (
            <Space size="middle">
              <a onClick={() => handlePreview(toBeApproved(record.Action))}>
                {toBeApproved(record.Action).fileName}
              </a>
              <a onClick={() => handleApprove(toBeApproved(record.Action))} className="text-green-500">
                Approve
              </a>
              <RejectFeedback doc={toBeApproved(record.Action)} />
            </Space>
          ) : (
            <p>Send Email</p>
          )}
        </>
      ),
    },
  ];
  const column2 = [
    {
      title: "Name",
      dataIndex: "allName",
      key: "allName",
    },
    {
      title: "Work Authorization",
      dataIndex: "Work_Authorization",
      key: "Work_Authorization",
      render: (_, record) => (
        <>
          <Tag color="geekblue">{`Title : ${record.Work_Authorization.workAuthorizationTitle}`}</Tag>
          <Tag color="geekblue">{`Start Date : ${record.Work_Authorization.startDate}`}</Tag>
          <Tag color="geekblue">{`End Date : ${record.Work_Authorization.endDate}`}</Tag>
          <Tag color="geekblue">{`Remaining : ${record.Work_Authorization.remaining} days`}</Tag>
        </>
      ),
    },
    {
      title: "Next Step",
      dataIndex: "Next_Step",
      key: "Next_Step",
    },
    {
      title: "OPT Receipt",
      dataIndex: "optReceipt",
      key: "optReceipt",
      render: (_, record) => (
        console.log("record", record),
        (
          <a onClick={() => handlePreview(record.optReceipt)}>
            {record.optReceipt.fileName}
          </a>
        )
      ),
    },
    {
      title: "OPT EAD",
      key: "optEAD",
      dataIndex: "optEAD",
      render: (_, record) => (
        <a onClick={() => handlePreview(record.optEad)}>
          {record.optEAD?.fileName}
        </a>
      ),
    },

    {
      title: "I-983",
      key: "i983",
      dataIndex: "i983",
      render: (_, record) => (
        <a onClick={() => handlePreview(record.i983)}>
          {record.i983?.fileName}
        </a>
      ),
    },
    {
      title: "I-20",
      key: "i20",
      dataIndex: "i20",
      render: (_, record) => (
        <a onClick={() => handlePreview(record.i20)}>{record.i20?.fileName}</a>
      ),
    },
  ];

 

  const filterByStatus = (profile) => {
    const found = toBeApproved(profile);
    if (found) {
      return "Waiting for HR approval";
    } else {
      return "Send Notification";
    }
  };

  const filterByFileType = (profile, fileType) => {
    return profile.uploadedDocuments.filter(
      (doc) => doc.fileType === fileType
    )[0];
  };

  const allOpt = filteredEmployees.map((profile) => {
    console.log(profile.firstName);
    return {
      key: profile.userId,
      allName: `${profile.firstName} ${profile.lastName}`,
      Work_Authorization: profile,
      Next_Step: filterByStatus(profile),
      optReceipt: filterByFileType(profile, "optReceipt"),
      optEAD: filterByFileType(profile, "optEAD"),
      i983: filterByFileType(profile, "i983"),
      i20: filterByFileType(profile, "i20"),
    };
  });
  const optInprogress = filteredEmployees.map((profile) => {
    return {
      key: profile.userId,
      allName: `${profile.firstName} ${profile.lastName}`,
      Work_Authorization: profile,
      Next_Step: filterByStatus(profile),
      Action: profile,
    };
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      <div className="mx-10 ">
        <p className="text-3xl text-geekblue my-10">Visa Status Management</p>
        <div>
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
        <div>
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
              columns={column1}
              dataSource={optInprogress}
              pagination={false}
            />
          ) : (
            <Table
              columns={column2}
              dataSource={allOpt}      
              pagination={false}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VisaHrPage;
