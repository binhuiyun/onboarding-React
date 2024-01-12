import React from "react";
import FileUploader from "./Components/FileUploader";

const mockInfo = {
  title: "OPT Receipt",
  status: "approved",
  feedback: "",
  next: "OPT EAD",
};
const VisaPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center ">
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
