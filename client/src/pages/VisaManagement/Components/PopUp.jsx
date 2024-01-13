import React from "react";
import { FolderPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

const PopUp = (props) => {
  return (
    <div className="w-[25%] h-[40vh] flex flex-col items-center justify-center shadow-xl relative rounded-3xl left-[35%] top-[15vh]">
      <XMarkIcon
        className="h-5 w-5 absolute top-10 right-8 text-gray-500"
        onClick={props.handleUpload}
      />
      <FolderPlusIcon className="text-blue-500 h-10 w-10 mb-10" />
      <div className="text-gray-500 mx-3 mb-5 flex flex-col items-center">
        <p>DRAG AND DROP</p>
        <p>OR</p>
        <p>CHOOSE A FILE FROM YOUR COMPUTER</p>
      </div>
      <button className="bg-blue-500 text-white my-2 px-8 py-2 rounded-md hover:scale-[103%]">
        Upload
      </button>
    </div>
  );
};

export default PopUp;
