
import UserMenu from "./UserMenu";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleEmployeeProfilesButtonClick = () => {
    navigate("/employee-profile");
  };
  
  const handleVisaStatusManagementButtonClick = () => {
    navigate("/visa-hr");
  };
  
  const handleHiringManagementButtonClick = () => {
    navigate("/hiring-management");
  };
  

  return (
    <>
      <header className="flex items-center text-base justify-between bg-[#F0F0F0] px-20 py-4 border-b-2">
        <div className="text-3xl flex items-center">Chuwa America</div>
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
            <UserMenu mode="horizontal" />
      
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;

