import React, { useState, useEffect } from "react";
import FileUploader from "../../components/FileUploader";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const VisaPage = () => {
  const { user } = useSelector((state) => state.user);
  console.log("here is user", user.id);
  const [info, setInfo] = useState({});
  const [optReceiptStatus, setOptReceiptStatus] = useState("never uploaded");
  const [optEADtStatus, setOptEADtStatus] = useState("never uploaded");
  const [I983Status, setI983Status] = useState("never uploaded");
  const [I20Status, setI20Status] = useState("never uploaded");
  useEffect(() => {
    const fetchDocs = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/visa/${user.id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
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
            user: user.id,
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
      {/* TODO: change to real name */}
      <div className="text-4xl text-slate-400 mx-20 my-5">{`Hi, alice`}</div>
      <div className="text-3xl text-geekblue mx-20 mb-10">
        Visa Management System
      </div>
      <div className="w-full flex flex-col items-center">
        <FileUploader
          title="OPT Receipt"
          fileType="optReceipt"
          status={optReceiptStatus}
          feedback={info.optReceipt ? info.optReceipt.feedback : undefined}
          next="OPT EAD"
          prev="approved"
        />

        <FileUploader
          title="OPT EAD"
          fileType="optEAD"
          status={optEADtStatus}
          feedback={info.optEAD ? info.optEAD.feedback : undefined}
          next="I-983"
          prev={optReceiptStatus}
        />

        <FileUploader
          title="I-983"
          fileType="I983"
          status={I983Status}
          feedback={info.I983 ? info.I983.feedback : undefined}
          next="I-20"
          prev={optEADtStatus}
        />

        <FileUploader
          title="I-20"
          fileType="I20"
          status={I20Status}
          feedback={info.I20 ? info.I20.feedback : undefined}
          next=""
          prev={I983Status}
        />
      </div>
    </>
  );
};

export default VisaPage;
