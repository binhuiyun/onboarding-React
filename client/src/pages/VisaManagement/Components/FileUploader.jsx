import React from "react";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import {
  FolderArrowDownIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
const FileUploader = ({ title, status, feedback, next }) => {
  return (
    <>
      <div className="w-[60%] py-4 px-4 shadow-xl flex rounded-md hover:[animate-hoveranimation]">
        {status === "pending" && (
          <ClockIcon className="h-6 w-6 text-yellow-500" />
        )}
        {status === "approved" && (
          <CheckCircleIcon className="h-6 w-6 text-blue-500" />
        )}
        {status === "rejected" && (
          <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
        )}
        <div className="px-1">{title}</div>
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
        <div className="">
          <FolderPlusIcon className="h-6 w-6 text-blue-500" />
          {title === "i983" && (
            <FolderArrowDownIcon className="h-6 w-6 text-blue-500" />
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploader;
