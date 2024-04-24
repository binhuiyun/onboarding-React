import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Input, Pagination } from "antd";
import SendNotification from "../../components/SendNotification";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByOptThunk, getInProgressProfileThunk } from "../../thunks/profile-thunk";


const VisaHrPage = () => {

  const dispatch = useDispatch();
  const {profiles} = useSelector((state) => state.profile);
  // Table for IN PROGRESS
  const [searchText, setSearchText] = useState("");
  const pagination = {
    pageSize: 5,
  };

  const handlePreview = (record) => {
    console.log("Previewing", record);
    const blob = new Blob([new Uint8Array(record.fileDoc.data)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const columns2 = [
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
        <a onClick={ ()=> handlePreview(record.optReceipt)}>{record.optReceipt.fileName}</a>
      )
    },
    {
      title: "OPT EAD",
      key: "optEAD",
      dataIndex: "optEAD",
      render: (_, record) => (
        <a onClick={ ()=> handlePreview(record.optEad)}>{record.optEAD?.fileName}</a>
      )

    },

    {
      title: "I-983",
      key: "i983",
      dataIndex: "i983",
      render: (_, record) => (
        <a onClick={ ()=> handlePreview(record.i983)}>{record.i983?.fileName}</a>
      )
    },
    {
      title: "I-20",
      key: "i20",
      dataIndex: "i20",
      render: (_, record) => (
        <a onClick={ ()=> handlePreview(record.i20)}>{record.i20?.fileName}</a>
      )

    }
  ];

  const [filter, setFilter] = useState("IN PROGRESS");

  useEffect(() => {
    dispatch(getProfileByOptThunk());
  //  dispatch(getInProgressProfileThunk());
  }, []);

  const filterByStatus = (profile) => {
    const found = profile.uploadedDocuments.find((doc) => doc.status === "pending" && doc.fileType!=="optReceipt") || profile.onboardingStatus === "pending";
    if (found) {
      return "Waiting for HR approval";
    }
    else{
      return "Send Notification";
    }
  }

  const filterByFileType = (profile, fileType) => {
    return profile.uploadedDocuments.filter((doc) => doc.fileType === fileType)[0];
  }
  
  const allOpt = profiles.map((profile) => {
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
  }
  );
  
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
              columns={columns2}
              dataSource={allOpt}
              className="w-[90%]"
              pagination={pagination}
            />
          ) : (
            <Table
              columns={columns2}
              dataSource={allOpt}
              className="w-[90%]"
              pagination={pagination}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VisaHrPage;
