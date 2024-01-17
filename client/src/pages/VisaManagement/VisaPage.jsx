import React, { useState, useEffect } from "react";
import FileUploader from "../../components/FileUploader";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
const mockUser = {
  _id: "qweasdzxc123321",
  firstName: "Ruike",
};

const mockInfo = {
  fileName: "I983",
  status: "approved",
  feedback: "reupload correct one",
  next: "OPT EAD",
};

const VisaPage = () => {
  // const user = useSelector(selectUser);
  const [info, setInfo] = useState(mockInfo);
  const [optReceiptStatus, setOptReceiptStatus] = useState("never uploaded");
  const [optEADtStatus, setOptEADtStatus] = useState("never uploaded");
  const [I983Status, setI983Status] = useState("never uploaded");
  const [I20Status, setI20Status] = useState("never uploaded");
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
        const optData = response.data;
        setInfo(response.data);
        if (optData.optReceipt) {
          setOptReceiptStatus(optData.optReceipt.status);
        }
        if (optData.optEAD) {
          setOptEADtStatus(optData.optEAD.status);
        }
        if (optData.I983) {
          setI983Status(optData.I983.status);
        }
        if (optData.I20) {
          setI20Status(optData.I20.status);
        }
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
      <Header />
      <div className="text-5xl text-gray-500 mx-20 my-5">{`Hi, ${mockUser.firstName}`}</div>
      <div className="text-3xl text-chuwa-blue mx-20 mb-10">
        Visa Management System
      </div>
      <div className="w-full flex flex-col items-center">
        <FileUploader
          title="OPT Receipt"
          fileType="optReceipt"
          status={optReceiptStatus}
          feedback={mockInfo.feedback}
          next="OPT EAD"
          prev="approved"
        />

        <FileUploader
          title="OPT EAD"
          fileType="optEAD"
          status={optEADtStatus}
          feedback={mockInfo.feedback}
          next="I-983"
          prev={optReceiptStatus}
          // disable={mockOptReceipt.status !== "approved"}
        />

        <FileUploader
          title="I-983"
          fileType="I983"
          status={I983Status}
          feedback={mockInfo.feedback}
          next="I-20"
          prev={optEADtStatus}
        />

        <FileUploader
          title="I-20"
          fileType="I20"
          status={I20Status}
          feedback={mockInfo.feedback}
          next=""
          prev={I983Status}
        />
      </div>
    </>
  );
};

export default VisaPage;
