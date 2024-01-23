import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, createSearchParams, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, ConfigProvider } from "antd";
const { Sider, Content } = Layout;
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  fetchAllEmployees,
  fetchEmployeeByName,
  getEmployeeProfileByPID,
} from "../../redux/employeeProfileSlice";
import { Navigate } from "react-router";

const EmployeeProfilePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [employeeProfile, setEmployeeProfile] = useState();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const toggleSider = () => {
    setCollapsed(!collapsed);
  };
  const triggerIcon = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
  const dispatch = useDispatch();

  const sortEmployees = (employees) => {
    const sorted = [...employees].sort((a, b) => {
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

  const handleSearchButtonClick = () => {
    console.log("Searching for employees with name: ", searchName);
    dispatch(fetchEmployeeByName(searchName)).then((res) => {
      console.log(`Fetched employees with name ${searchName}: `, res.payload);
      setAllEmployees(res.payload);
      sortEmployees(res.payload);
    });
  };

  async function handleViewProfileButtonClick(p_id) {
    //     console.log("Viewing profile for employee with id: ", p_id);
    //     dispatch(getEmployeeProfileByPID(p_id))
    //       .then((res) => {
    //         console.log(`Fetched employee with p_id ${p_id}: `, res.payload);
    //         setEmployeeProfile(res.payload);

    //         //   setAllEmployees(res.payload);
    //         //   sortEmployees(res.payload);
    //       })
    //       .then(() => {
    //         navigate({
    //           pathname: "/employee-profile/details",
    //           search: `${createSearchParams({
    //             p_id: `${p_id}`,
    //           })}`,
    //           state: { employeeProfile },
    //         });
    //       });

    navigate({
      pathname: "/employee-profile/details",
      search: `${createSearchParams({
        p_id: `${p_id}`,
      })}`,
    });
  }

  return (
    <Layout className="w-screen h-screen overflow-auto">
      <Header user={user} />
      <Layout className="bg-white">
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
                      name="searchName"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSearchButtonClick}
                    className="w-full text-base bg-blue-500 rounded-3xl p-4 text-white"
                  >
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
                    src={
                      employee.profilePicture &&
                      employee.profilePicture.data.length > 0
                        ? URL.createObjectURL(
                            new Blob(
                              [new Uint8Array(employee.profilePicture.data)],
                              {
                                type: "image/png",
                              }
                            )
                          )
                        : employee.defaultProfilePicture
                    }
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-row w-full space-x-10">
                  <div className="flex flex-col w-full text-base space-y-2">
                    <label className="text-2xl font-semibold capitalize">
                      {employee.name.firstName} {employee.name.lastName}
                    </label>
                    <label className="">
                      Social Security Number: {employee.ssn}
                    </label>
                    <label className="capitalize">
                      Work Authorization Title: {employee.workAuthorization.workAuthorizationType =="" ? employee.workAuthorization.citizenType : employee.workAuthorization.workAuthorizationType}
                    </label>
                    <label className="">
                      Phone Number: {employee.phoneNumber.cellPhoneNumber}
                    </label>
                    <label className="">
                      Email: <span className="underline">{employee.email}</span>
                    </label>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="rounded-3xl bg-blue-500 text-white px-14 py-2"
                        onClick={(e) =>
                          handleViewProfileButtonClick(employee._id)
                        }
                      >
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
