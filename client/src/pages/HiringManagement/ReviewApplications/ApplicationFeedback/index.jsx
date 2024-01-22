import React,{useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Input, Spin, message } from "antd";
import ProfileForm from "../../../../components/ProfileForm";
import { updateCurrentUserThunk } from "../../../../thunks/auth-thunk";

const { TextArea } = Input;
import { updateApplicationStatusThunk, fetchApplicationByIdThunk} from "../../../../thunks/application-thunk";
import Navbar from "../../../../components/Navbar";

const ApplicationFeedback= () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {application} = useSelector((state) => state.application);
  const status = useSelector((state) => state.application.status);
  const dispatch = useDispatch();
  const {id} = useParams();
  const [feedback, setFeedback] = useState("");
  const u_id = localStorage.getItem("userID");

  useEffect(() => {
    dispatch(fetchApplicationByIdThunk(id));
  }
  , [id]);
  
  const handleApprove = () => {
    console.log(id);
    messageApi.open({
      type: "success",
      content: "Application approved",
      duration: 2,
      
    });
    dispatch(updateApplicationStatusThunk({id, payload:{onboardingStatus:"approved"}}));
    dispatch(updateCurrentUserThunk({id: u_id, data:
      {
       onboardingStatus: "approved" }}));
     } ;
   
    

  const handleReject = () => {
    dispatch(updateApplicationStatusThunk({id, payload:{onboardingStatus:"rejected", feedback}}));
    messageApi.open({
      type: "warning",
      content: "Application rejected",
      duration: 2,
    
    });
  };

  if (status === "loading" || status === "idle" ) {
    return <Spin />;
  }
  return (
    <>
    <Navbar />
      {contextHolder}
      {application && (
        <>
      <ProfileForm employeeProfile={application}/>
      {application.onboardingStatus === "pending" && (
        <div>
        
      <Button onClick={handleApprove}>Approve</Button>
      <Button onClick={handleReject}>Reject</Button>
      <TextArea 
      rows={4}
       value={feedback}
        onChange={(e)=>setFeedback(e.target.value)}
        />
      </div>
      )}
    </>
  )};
    </>
  );
}

export default ApplicationFeedback;