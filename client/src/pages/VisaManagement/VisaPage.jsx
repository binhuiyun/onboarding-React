import React from "react";
import FileUploader from "./Components/FileUploader";

const mockUser = {
  firstName: "Ruike",
};
const mockInfo = {
  title: "i983",
  status: "approved",
  feedback: "",
  next: "OPT EAD",
};
const VisaPage = () => {
  return (
    <>
      <div className="text-5xl text-gray-500 mx-5 my-5">{`Hi, ${mockUser.firstName}`}</div>
      <div className="text-3xl text-blue-500 mx-5 mb-10">
        Visa Management System
      </div>
      <div className="w-full flex flex-col items-center">
        <FileUploader
          title={mockInfo.title}
          status={mockInfo.status}
          feedback={mockInfo.feedback}
          next={mockInfo.next}
        />
        <FileUploader
          title={mockInfo.title}
          status={mockInfo.status}
          feedback={mockInfo.feedback}
          next={mockInfo.next}
        />
        <FileUploader
          title={mockInfo.title}
          status={mockInfo.status}
          feedback={mockInfo.feedback}
          next={mockInfo.next}
        />
        <FileUploader
          title={mockInfo.title}
          status={mockInfo.status}
          feedback={mockInfo.feedback}
          next={mockInfo.next}
        />
      </div>
    </>
  );
};

export default VisaPage;
