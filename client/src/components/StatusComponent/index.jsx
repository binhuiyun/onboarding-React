import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getAppByStatus } from "../../services/application-service";
import { Link } from "react-router-dom";


const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    align: "center",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (text, record) => (
      <Link to={`/applications/${record.key}`}>View Application</Link>
    ),

    align: "center",
  },
];
const StatusComponent = ({ status }) => {
  const [applications, setApplications] = useState([]);
  const uppercaseStatus = status.charAt(0).toUpperCase() + status.slice(1);

  useEffect(() => {
    getAppByStatus(status).then((res) => {
      console.log("res", res);
      setApplications(res);
    });
  }, [status]);

  return (
    <>

    <div className="flex justify-center items-center text-3xl text-geekblue mx-20 mb-10 mt-10">
      {uppercaseStatus} Applications</div>
      <Table
        columns={columns}
        dataSource={applications.map((app) => ({
          key: app._id,
          name: app.firstName,
          email: app.email,
    
        }))}
      />
    </>
  );
};

export default StatusComponent;
