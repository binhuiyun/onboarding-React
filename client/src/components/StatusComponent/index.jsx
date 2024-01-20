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

  useEffect(() => {
    getAppByStatus(status).then((res) => {
      console.log("res", res);
      setApplications(res);
    });
  }, [status]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={applications.map((app) => ({
          key: app._id,
          name: app.name.firstName,
          email: app.email,
    
        }))}
      />
    </>
  );
};

export default StatusComponent;
