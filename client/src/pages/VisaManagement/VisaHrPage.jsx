import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Input, Pagination } from "antd";
import ReviewAction from "../../components/ReviewAction";
import SendNotification from "../../components/SendNotification";
import { useDispatch, useSelector } from "react-redux";
import { fetchForHr, selectForHr } from "../../redux/visaSlice";
import { getProfileByOptThunk } from "../../thunks/profile-thunk";
import { getAllDocumentThunk } from "../../thunks/document-thunk";

const VisaHrPage = () => {

  const dispatch = useDispatch();
  const {profiles} = useSelector((state) => state.profile);
  const {allDocument} = useSelector((state) => state.document);
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

  const columns1 = [
    {
      title: "Name",
      dataIndex: "allName",
      key: "allName",
    },
    {
      title: "Work Authorization",
      dataIndex: "Work_Authorization",
      key: "Work Authorization",
      width: "40%",
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
    },
    {
      title: "Work Authorization",
      dataIndex: "Work_Authorization",
      key: "Work_Authorization",
      // render: (_, { profile }) => (
      //   <>
      //     <Tag color="geekblue">{`Title : ${profile.workAuthorizationTitle}`}</Tag>
      //     <Tag color="geekblue">{`Start Date : ${profile.startDate}`}</Tag>
      //     <Tag color="geekblue">{`End Date : ${profile.endDate}`}</Tag>
      //     <Tag color="geekblue">{`Remaining : ${profile.remaining} days`}</Tag>
      //   </>
      // ),
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
        console.log("record", record.optReceipt),
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
  const info = useSelector(selectForHr);
  const [filter, setFilter] = useState("IN PROGRESS");

  useEffect(() => {
    dispatch(getProfileByOptThunk());
  }, []);

  useEffect(() => {
    dispatch(getAllDocumentThunk());
  }, []);

  const infoInProgress = info
    .filter((user) => user.Work_Authorization.title === "F1(CPT/OPT)")
    .filter((user) => user.docStatus === "IN PROGRESS");



  const filterByStatus = (profile) => {
    const intersection = allDocument.filter((doc) => profile.uploadedDocuments.includes(doc._id));
    const found = intersection.find((doc) => doc.status === "pending")
    if (found) {
      return "Waiting for HR approval";
    }
    else{
      return "Send Notification";
    }
  }

  
  const filterByFileType = (profile, fileType) => {
    const intersection = allDocument.filter((doc) => profile.uploadedDocuments.includes(doc._id));
    return intersection.filter((doc) => doc.fileType === fileType)[0];
  }
 

  
  const allOpt = profiles.map((profile) => {
    console.log(profile.firstName);
    return {
      key: profile.userId,
      allName: `${profile.firstName} ${profile.lastName}`,
      Work_Authorization: profile.workAuthorizationTitle,
      Next_Step: filterByStatus(profile),
      optReceipt: filterByFileType(profile, "optReceipt"),
      optEad: filterByFileType(profile, "optEAD"),
      i983: filterByFileType(profile, "i983"),
      i20: filterByFileType(profile, "i20"),
    
 
   
  
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
              columns={columns1}
              dataSource={dataSourceInProgress}
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
