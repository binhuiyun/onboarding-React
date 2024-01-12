import { React, useLayoutEffect, useRef, useEffect, useState } from "react";

const PersonalInformationPage = () => {
  const [height, setHeight] = useState();
  const targetRef = useRef();
  useLayoutEffect(() => {
    console.log(targetRef);
  }
  , []);

  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-between">
        <header className="flex items-center justify-between bg-[#F0F0F0] px-10 py-4">
          <div className="text-3xl flex items-center">Chuwa America</div>
          <ul className="flex">
            <button className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black">
              Personal Information
            </button>
            <button className="px-2 border-b-2 border-transparent transition duration-300 hover:border-black">
              Visa Status
            </button>
            <div className="pl-6">
              <img
                className="p-0.5 w-[40px] h-[40px] rounded-full ring-2 ring-black object-cover"
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
          </ul>
        </header>

        <div className="flex flex-col h-full content-start items-center">
          <div ref={targetRef} style={height} className="flex flex-col h-[500px]">
            <div className="flex flex-col relative xs:w-[288px] sm:w-[576px] md:w-[691px] lg:w-[921px] xl:w-[1152px] 2xl:w-[1382px] 3xl:w-[1728px] h-fit">
              <div className="flex justify-center xs:h-[72px] sm:h-[144px] md:h-[173px] lg:h-[230px] xl:h-[288px] 2xl:h-[346px] 3xl:h-[432px]">
                <img
                  src="https://cdn.theatlantic.com/thumbor/NiYsHGRQ6iDE2giXWCd0mAiEh2o=/0x1501:4656x4120/1952x1098/media/img/mt/2020/05/LON72718/original.jpg"
                  className="max-w-full rounded-3xl object-cover"
                />
              </div>
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[200px] h-[200px] p-1 rounded-full ring-2 ring-gray-300 object-cover"
              />
            </div>
          </div>

          <div className="mt-10">
            <span className="text-2xl font-bold">John Doe</span>
          </div>
        </div>

        <footer className="flex items-center justify-between bg-[#F0F0F0] px-10 py-6"></footer>
      </div>
    </>
  );
};

export default PersonalInformationPage;
