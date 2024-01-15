import React, { useState, useEffect } from "react";
import FileUploader from "../../components/FileUploader";
import axios from "axios";

const mockUser = {
  _id: "qweasdzxc123321",
  firstName: "Ruike",
};

const mockInfo = {
  fileName: "i983",
  status: "approved",
  feedback: "",
  next: "OPT EAD",
};

const VisaPage = () => {
  const [info, setInfo] = useState(mockInfo);
  useEffect(() => {
    const fetchDocs = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/visa/${mockUser._id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setInfo(response.data);
      } else if (response.status === 204) {
        const res = await axios.post(
          "http://localhost:4000/api/visa",
          {
            employee: mockUser._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data);
          setInfo(res.data);
        }
      }
    };
    fetchDocs();
  }, []);

  return (
    <>
      <div className="text-5xl text-gray-500 mx-5 my-5">{`Hi, ${mockUser.firstName}`}</div>
      <div className="text-3xl text-blue-500 mx-5 mb-10">
        Visa Management System
      </div>
      <div className="w-full flex flex-col items-center">
        <FileUploader
          title={"OPT Receipt"}
          status={mockInfo.status}
          feedback={mockInfo.feedback}
          next={mockInfo.next}
        />
        <FileUploader
          title={"OPT EAD"}
          status={mockInfo.status}
          feedback={mockInfo.feedback}
          next={mockInfo.next}
        />
        <FileUploader
          title={"I983"}
          status={mockInfo.status}
          feedback={mockInfo.feedback}
          next={mockInfo.next}
        />
        <FileUploader
          title={"I20"}
          status={mockInfo.status}
          feedback={mockInfo.feedback}
          next={mockInfo.next}
        />
      </div>
    </>
  );
};

export default VisaPage;
