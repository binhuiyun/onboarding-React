import React, { useState } from "react";
import { FolderPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useSelector } from "react-redux";

const PopUp = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const { user } = useSelector((state) => state.user);
  // console.log("here is popup user", user.id);
  let user = {};
  user = {
    id: localStorage.getItem("userID"),
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    const storeFile = async () => {
      const response = await axios.post(
        `http://localhost:4000/api/visa/${user.id}/${props.fileType}`,
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(response);
    };
    storeFile();
    console.log(selectedFile);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black z-10">
      <div className="w-[26%] h-[40%] flex flex-col items-center justify-center shadow-xl relative rounded-3xl left-[37%] top-[30%] bg-white opacity-100 z-20">
        <XMarkIcon
          className="h-5 w-5 absolute top-10 right-8 text-white-500"
          onClick={props.handleUpload}
        />
        <FolderPlusIcon className="text-blue-500 h-10 w-10 mb-10" />
        <div className="text-gray-500 mx-3 mb-5 flex flex-col items-center">
          <p>DRAG AND DROP</p>
          <p>OR</p>
          <p>CHOOSE A FILE FROM YOUR COMPUTER</p>
        </div>
        <input type="file" className="w-1/2" onChange={onFileChange} />
        <button
          className="bg-blue-500 text-white my-4 px-8 py-2 rounded-md hover:scale-[103%]"
          disabled={selectedFile === null}
          onClick={onFileUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default PopUp;
