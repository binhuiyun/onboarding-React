import React, { useState } from "react";
import { Popover, Upload, message} from "antd";
import { useSelector } from "react-redux";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import {
  FolderArrowDownIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";

const FileUploader = ({ title, fileType, status, feedback, next, prev }) => {
  const user = useSelector((state) => state.user.user);

  const props = {
    name: "file",
    action: `http://localhost:4000/api/document/${user.id}/${fileType}`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }


  return (
    <>
    
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
          {
            status === "pending" &&
            `Waiting for HR to approve your ${title}`}
          { 
            status === "approved" &&
            `Please upload a copy of your ${next}`}
          
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
            <Upload {...props} showUploadList={false}>
              <FolderPlusIcon
                className="h-8 w-8 text-geekblue"
              />
            </Upload>
         
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploader;
