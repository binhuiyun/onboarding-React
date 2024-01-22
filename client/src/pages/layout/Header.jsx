import React from "react";
import { useNavigate } from "react-router";
import { fetchPersonalInformationByUID } from "../../redux/personalInformationSlice";
import { fetchUserByIdThunk } from "../../thunks/auth-thunk";
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
import { logOutUser } from "../../redux/userSlice";

const Header = () => {
  const [isHR, setIsHR] = useState(false);
  const u_id = localStorage.getItem("userID");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    dispatch(fetchPersonalInformationByUID(u_id)).then((res) => {
      setAvatar(res.payload.profilePicture);
    });
    dispatch(fetchUserByIdThunk(u_id)).then((res) => {
      console.log("Fetched user:", res.payload);
      setIsHR(res.payload.isHR);
    });
  }, []);

  const handlePersonalInformationButtonClick = () => {
    navigate("/personal-information");
  };

  const handleVisaStatusButtonClick = () => {
    navigate("/visa");
  };

  //TODO: navigate to wrong route?
  const handleEmployeeProfilesButtonClick = () => {
    navigate("/employee-profile");
  };

  const handleVisaStatusManagementButtonClick = () => {
    navigate("/visa-hr");
  };

  const handleHiringManagementButtonClick = () => {
    navigate("/hiring-management");
  };

  const items = [
    {
      key: "1",
      label: <div onClick={() => dispatch(logOutUser())}>Log Out</div>,
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
                  src={
                    avatar && avatar.data.length > 0
                      ? URL.createObjectURL(
                          new Blob([new Uint8Array(avatar.data)], {
                            type: "image/png",
                          })
                        )
                      : ""
                  }
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
              Employee Profile
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
