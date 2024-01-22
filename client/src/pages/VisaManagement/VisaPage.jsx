//TODO: upload pdf should change icon immediately
import React, { useState, useEffect } from "react";
import FileUploader from "../../components/FileUploader";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { selectForUser, fetchForUser } from "../../redux/visaSlice";

const VisaPage = () => {
  const dispatch = useDispatch();
  // let user = {
  //   id: localStorage.getItem("userID"),
  // };
  const { user } = useSelector((state) => state.user);
  const info = useSelector(selectForUser);
  console.log(info);
  useEffect(() => {
    dispatch(fetchForUser(localStorage.getItem("userID")));
  }, []);

  return (
    <>
      {!info && (
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex grow justify-center items-center">
            <p className="text-geekblue text-6xl">
              Oops! You're not OPT status{" "}
            </p>
          </div>
        </div>
      )}
      {/* TODO: change to real name */}
      {info && (
        <>
          <Header />
          <div className="text-4xl text-slate-400 mx-20 my-5">{`Hi, ${user.username}`}</div>
          <div className="text-3xl text-geekblue mx-20 mb-10">
            Visa Management System
          </div>
          <div className="w-full flex flex-col items-center">
            <FileUploader
              title="OPT Receipt"
              fileType="optReceipt"
              status={
                info.optReceipt ? info.optReceipt.status : "never uploaded"
              }
              feedback={info.optReceipt ? info.optReceipt.feedback : undefined}
              next="OPT EAD"
              prev="approved"
            />

            <FileUploader
              title="OPT EAD"
              fileType="optEAD"
              status={info.optEAD ? info.optEAD.status : "never uploaded"}
              feedback={info.optEAD ? info.optEAD.feedback : undefined}
              next="I-983"
              prev={info.optReceipt ? info.optReceipt.status : "never uploaded"}
            />

            <FileUploader
              title="I-983"
              fileType="I983"
              status={info.I983 ? info.I983.status : "never uploaded"}
              feedback={info.I983 ? info.I983.feedback : undefined}
              next="I-20"
              prev={info.optEAD ? info.optEAD.status : "never uploaded"}
            />

            <FileUploader
              title="I-20"
              fileType="I20"
              status={info.I20 ? info.I20.status : "never uploaded"}
              feedback={info.I20 ? info.I20.feedback : undefined}
              next=""
              prev={info.I983 ? info.I983.status : "never uploaded"}
            />
          </div>
        </>
      )}
    </>
  );
};

export default VisaPage;
