import React from "react";
import { useNavigate } from "react-router";
import { fetchPersonalInformationByUID } from "../../redux/personalInformationSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Menu, Dropdown, Space } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  TranslationOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

const Header = (props) => {
  const [isHR, setIsHR] = useState(false);
  const u_id = localStorage.getItem("userID");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  useEffect(() => {
    dispatch(fetchPersonalInformationByUID(u_id)).then((res) => {
      setAvatar(res.payload.profilePicture);
    });
    setIsHR(props.user.isHR);
  }, []);

  const handlePersonalInformationButtonClick = () => {
    navigate("/personal-information");
  };

  const handleVisaStatusButtonClick = () => {
    navigate("/visa");
  };

  const handleEmployeeProfilesButtonClick = () => {
    navigate("/personal-information");
  };

  const handleVisaStatusManagementButtonClick = () => {
    navigate("/visa");
  };

  const handleHiringManagementButtonClick = () => {
    navigate("/hiring");
  };

  const items = [
    {
      key: "1",
      label: <a href="">Log Out</a>,
    },
  ];

  return (
    <>
      <header className="flex items-center text-base justify-between bg-[#F0F0F0] px-20 py-4 border-b-2">
        <div className="text-3xl flex items-center">Chuwa America</div>
        {!isHR && (
          <div className="flex flex-row">
            <button
              type="button"
              onClick={handlePersonalInformationButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Personal Information
            </button>
            <button
              type="button"
              onClick={handleVisaStatusButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Visa Status
            </button>
            <div className="pl-14">
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <img
                  className="p-0.5 w-[40px] h-[40px] rounded-full ring-1 ring-black object-cover"
                  src={avatar}
                />
              </Dropdown>
            </div>
          </div>
        )}

        {isHR && (
          <div className="flex flex-row">
            <button
              type="button"
              onClick={handleEmployeeProfilesButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Employee Profiles
            </button>
            <button
              type="button"
              onClick={handleVisaStatusManagementButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Visa Status Management
            </button>
            <button
              type="button"
              onClick={handleHiringManagementButtonClick}
              className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black"
            >
              Hiring Management
            </button>
            <div className="pl-14">
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <img
                  className="p-0.5 w-[40px] h-[40px] rounded-full ring-1 ring-black object-cover"
                  src={avatar}
                />
              </Dropdown>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
export default Header;
