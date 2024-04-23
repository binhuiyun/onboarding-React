//TODO: upload pdf should change icon immediately
import React, { useState, useEffect } from "react";
import FileUploader from "../../components/FileUploader";
import { getProfileThunk } from "../../thunks/profile-thunk";
import { getDocumentThunk } from "../../thunks/document-thunk";
import { useSelector, useDispatch } from "react-redux";
import { selectForUser, fetchForUser } from "../../redux/visaSlice";


const VisaPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { profile} = useSelector((state) => state.profile);
  const { document } = useSelector((state) => state.document);
  console.log("visa ", user);
  const info = useSelector(selectForUser);
  const isOpt = profile.workAuthorizationTitle === "F1";
  console.log(info);

  useEffect(() => {
    dispatch(getProfileThunk(user.id));
  }, [user.id]);

  useEffect(() => {
    dispatch(getDocumentThunk(user.id));

  }, [user.id]);
  

  return (
    <>
      {!isOpt && (
        <div className="flex flex-col h-screen">
      
          <div className="flex grow justify-center items-center">
            <p className="text-geekblue text-6xl">
              Oops! You're not OPT status
            </p>
          </div>
        </div>
      )}
      {/* TODO: change to real name */}
      {isOpt && (
        <>
        
          <div className="text-4xl text-slate-400 mx-20 my-5">{`Hi, ${profile.firstName}`}</div>
          <div className="text-3xl text-geekblue mx-20 mb-10">
            Visa Management System
          </div>
          <div className="w-full flex flex-col items-center">
            <FileUploader
              title="OPT Receipt"
              fileType="optReceipt"
              status={profile.onboardingStatus}
              feedback={profile.HRfeedback}
              next="OPT EAD"
           
            />

            <FileUploader
              title="OPT EAD"
              fileType="optEAD"
              status={document?.documents.filter((doc)=> doc.fileType === "optEAD").status}
              feedback={document?.documents.filter((doc)=> doc.fileType === "optEAD").feedback}
              next="I-983"
              prev={profile.onboardingStatus}
            />

            <FileUploader
              title="I-983"
              fileType="i983"
              status={document?.documents.filter((doc)=> doc.fileType === "i983").status}
              feedback={document?.documents.filter((doc)=> doc.fileType === "i983").feedback}
              next="I-20"
              prev={document?.documents.filter((doc)=> doc.fileType === "optEAD").status}
            />

            <FileUploader
              title="I-20"
              fileType="i20"
              status={document?.documents.filter((doc)=> doc.fileType === "i20").status}
              feedback={document?.documents.filter((doc)=> doc.fileType === "i20").feedback}
              next=""
              prev={document?.documents.filter((doc)=> doc.fileType === "i983").status}
            />
          </div>
        </>
      )}
    </>
  );
};

export default VisaPage;
