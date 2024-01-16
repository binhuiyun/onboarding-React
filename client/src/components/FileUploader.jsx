import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Popover } from "antd";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import {
  FolderArrowDownIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import PopUp from "./PopUp";
const FileUploader = ({ title, fileType, status, feedback, next }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const handleUpload = (e) => {
    e.preventDefault();
    setIsPopUp(!isPopUp);
  };

  return (
    <>
      {isPopUp &&
        createPortal(
          <PopUp handleUpload={handleUpload} fileType={fileType} />,
          document.body
        )}
      <div className="w-[60%] py-4 px-4 shadow-md my-4 flex rounded-lg hover:scale-[101%]">
        {status === "pending" && (
          <ClockIcon className="h-8 w-8 text-yellow-500" />
        )}
        {status === "approved" && (
          <CheckCircleIcon className="h-8 w-8 text-blue-500" />
        )}
        {status === "rejected" && (
          <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
        )}
        <div className="px-1 text-xl my-auto">{title}</div>
        <div className="text-gray-500 text-sm grow my-auto text-center">
          {status === "pending" &&
            `Waiting for HR to approve your
${title}`}
          {status === "approved" &&
            (next
              ? `Please upload a copy of your
${next}`
              : "All documents have been approved")}
          {status === "rejected" && `${feedback}`}
        </div>
        <div className="flex">
          {title === "I-983" && (
            <Popover content="Download Empty Template and Sample Template">
              <FolderArrowDownIcon className="h-8 w-8 text-blue-500 mr-1" />
            </Popover>
          )}
          <Popover content="Upload File">
            <FolderPlusIcon
              className="h-8 w-8 text-blue-500"
              onClick={handleUpload}
            />
          </Popover>
        </div>
      </div>
    </>
  );
};

export default FileUploader;
