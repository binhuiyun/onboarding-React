import React from "react";
import { useNavigate } from "react-router";
import { fetchPersonalInformationByUID } from "../../redux/personalInformationSlice";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, Dropdown, Space } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  TranslationOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { fetchApplicationByIdThunk } from "../../thunks/application-thunk";

const Header = ({ user }) => {
  // const u_id = localStorage.getItem("userID");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { appliction } = useSelector((state) => state.application);

  // useEffect(() => {
  //   dispatch(fetchApplicationByIdThunk
  // }, []);

  const handlePersonalInformationButtonClick = () => {
    navigate("/personal-information");
  };

  const handleVisaStatusButtonClick = () => {
    navigate("/visa");
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
            {/* <Dropdown menu={{ items }} placement="bottom" arrow>
              <img
                className="p-0.5 w-[40px] h-[40px] rounded-full ring-1 ring-black object-cover"
                src={avatar}
              />
            </Dropdown> */}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
