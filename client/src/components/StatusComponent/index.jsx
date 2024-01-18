import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getAppByStatus } from "../../services/application-service";

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
    render: () => <a>View Application</a>,

    align: "center",
  },
];
const StatusComponent =({status}) => {
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
          action: (
            <a href={`/hiring-management/applications/${app._id}`}>
              View Application
            </a>
          ),
        }))}
      />
    </>
  );
}

export default StatusComponent;