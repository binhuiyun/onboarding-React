import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Sider, Content } = Layout;
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { fetchAllEmployees } from "../../redux/employeeProfileSlice";

const EmployeeProfilePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [sortedEmployees, setSortedEmployees] = useState([]);

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };
  const triggerIcon = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
  const dispatch = useDispatch();

  const sortEmployees = (employees) => {
    const sorted = [...employees].sort((a, b) => {
      console.log("a: ", a);
      if (a.name.lastName < b.name.lastName) {
        return -1;
      }
      if (a.name.lastName > b.name.lastName) {
        return 1;
      }
      return 0;
    });
    setSortedEmployees(sorted);
  };

  useEffect(() => {
    console.log("Fetching all employees...");
    dispatch(fetchAllEmployees()).then((res) => {
      console.log("Fetched all employees: ", res.payload);
      setAllEmployees(res.payload);
      sortEmployees(res.payload);
    });
  }, []);

  return (
    <Layout className="w-screen h-screen overflow-auto">
      <Header />
      <Layout>
        <Sider
          trigger={triggerIcon}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleSider}
          width={600} // Set the width when the Sider is open
          collapsedWidth={80} // Set the width when the Sider is collapsed
          style={{ background: "#F0F0F0" }}
        >
          {!collapsed && (
            <div className="flex flex-col my-4 mx-8">
              <div className="flex my-6 text-2xl">Search Employee</div>
              <div className="flex flex-col space-y-2">
                <span className="text-base">Employee Name</span>
                <div className="flex flex-col space-y-10">
                  <div className="flex items-center justify-between bg-white rounded-3xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mx-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>

                    <input
                      className="w-full px-4 rounded-3xl text-base p-4 focus:outline-none"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>
                  <button className="w-full text-base bg-blue-500 rounded-3xl p-4 text-white">
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </Sider>

        <Content
          style={{
            margin: "24px 48px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <label className="text-3xl font-semibold">Employee Profile</label>
          {sortedEmployees.map((employee) => {
            return (
              <div className="flex flex-row bg-[#F0F0F0] rounded-3xl my-10 space-x-8 p-4">
                <div className="flex w-64 items-center justify-center">
                  <img
                    src={employee.profilePicture}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-row w-full space-x-10">
                  <div className="flex flex-col w-full text-base space-y-2">
                    <label className="text-2xl capitalize">
                      {employee.name.firstName} {employee.name.lastName}
                    </label>
                    <label className="">
                      Social Security Number: {employee.ssn}
                    </label>
                    <label className="">
                      Work Authorization Title: {employee.ssn}
                    </label>
                    <label className="">
                      Phone Number: {employee.phoneNumber.cellPhoneNumber}
                    </label>
                    <label className="">
                      Email: <span className="underline">{employee.email}</span>
                    </label>
                    <div className="flex justify-end">
                      <button className="rounded-3xl bg-blue-500 text-white px-20 py-4">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Content>
      </Layout>
    
    </Layout>
  );
};
export default EmployeeProfilePage;
