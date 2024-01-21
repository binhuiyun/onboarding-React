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
import { useSelector } from "react-redux";
import PopUp from "./PopUp";
const FileUploader = ({ title, fileType, status, feedback, next, prev }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const { user } = useSelector((state) => state.user);
  console.log("here is file user", user.id);
  const handleUpload = (e) => {
    e.preventDefault();
    setIsPopUp(!isPopUp);
  };

  return (
    <>
      {isPopUp &&
        createPortal(
          <PopUp
            handleUpload={handleUpload}
            fileType={fileType}
            setIsPopUp={setIsPopUp}
          />,
          document.body
        )}
      <div className="w-[60%] py-4 px-4 shadow-md my-4 flex rounded-lg hover:scale-[101%]">
        {status === "pending" && (
          <ClockIcon className="h-8 w-8 text-yellow-500" />
        )}
        {status === "approved" && (
          <CheckCircleIcon className="h-8 w-8 text-geekblue" />
        )}
        {status === "rejected" && (
          <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
        )}
        <div className="px-1 text-xl my-auto">{title}</div>
        <div className="text-gray-500 text-sm grow my-auto text-center">
          {/* TODO: add required message */}
          {fileType === "optReceipt" &&
            status === "pending" &&
            "Waiting for HR to approve your OPT Receipt"}
          {fileType === "optReceipt" &&
            status === "approved" &&
            "Please upload a copy of your OPT EAD"}
          {fileType === "optEAD" &&
            status === "pending" &&
            "Waiting for HR to approve your OPT EAD"}
          {fileType === "optEAD" &&
            status === "approved" &&
            "Please download and fill out the I-983 form"}
          {fileType === "I983" &&
            status === "pending" &&
            "Waiting for HR to approve and sign your I-983"}
          {fileType === "I983" &&
            status === "approved" &&
            "Please send the I-983 along with all necessary documents to your school and upload the new I-20"}
          {fileType === "I20" &&
            status === "pending" &&
            "Waiting for HR to approve your I-20"}
          {fileType === "I20" &&
            status === "approved" &&
            "All documents have been approved"}

          {status === "rejected" && `${feedback}`}
        </div>
        <div className="flex">
          {title === "I-983" && (
            <Popover content="Download Empty Template and Sample Template">
              <a href="http://localhost:4000/api/visa/sample">
                <FolderArrowDownIcon className="h-8 w-8 text-black-100 mr-1" />
              </a>
            </Popover>
          )}
          {prev === "approved" && (
            <Popover content="Upload File">
              <FolderPlusIcon
                className="h-8 w-8 text-geekblue"
                onClick={handleUpload}
              />
            </Popover>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploader;
