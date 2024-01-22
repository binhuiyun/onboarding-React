import React from "react";
import{useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import UserMenu from "./UserMenu";
import {useNavigate} from "react-router-dom";
import { logOutUser } from "../../redux/userSlice";

const Navbar = () => {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmployeeProfilesButtonClick = () => {
    navigate("/employee-profile");
  };
  
  const handleVisaStatusManagementButtonClick = () => {
    navigate("/visa-hr");
  };
  
  const handleHiringManagementButtonClick = () => {
    navigate("/hiring-management");
  };
  
  // useEffect(() => {
  //   dispatch(fetchUserByIdThunk(user.id))
  // }, [user.id]);

  const handlePersonalInformationButtonClick = () => {
    navigate("/personal-information");
  };

  const handleVisaStatusButtonClick = () => {
    navigate("/visa");
  };


  return (
    <>
    <header className="flex items-center text-base justify-between bg-[#F0F0F0] px-20 py-4 border-b-2">
      <div className="text-3xl flex items-center">Chuwa America</div>
      {user.username !== 'hr' && (
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
            <UserMenu mode="in-line" />
           

          </div>
        </div>
      )}

      {user.username === "hr" && (
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
              {/* <img
                className="p-0.5 w-[40px] h-[40px] rounded-full ring-1 ring-black object-cover"
                src={avatar}
              />
               */}
      
            <UserMenu mode="in-line" />
          </div>
        </div>
      )}
    </header>
  </>
);
};
export default Navbar;

