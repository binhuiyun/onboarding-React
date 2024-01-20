import React from "react";
import { fetchPersonalInformationByUID } from "../../redux/personalInformationSlice";
import { useEffect } from "react";

const Header = () => {
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  useEffect(() => {
    console.log("dsADADA...");
    dispatch(fetchPersonalInformationByUID(id)).then((res) => {
      setAvatar(res.payload.profilePicture);
    });
  },[]);

  return (
    <>
      <header className="flex items-center justify-between bg-[#F0F0F0] px-20 py-4">
        <div className="text-3xl flex items-center">Chuwa America</div>
        <div className="flex flex-row">
          <button className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black">
            Personal Information
          </button>
          <button className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black">
            Visa Status
          </button>
          <div className="pl-14">
            <img
              className="p-0.5 w-[40px] h-[40px] rounded-full ring-2 ring-black object-cover"
              src={avatar}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
