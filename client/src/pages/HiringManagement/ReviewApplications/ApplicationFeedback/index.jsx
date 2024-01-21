import React,{useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Input, Spin } from "antd";
import ProfileForm from "../../../../components/ProfileForm";

const { TextArea } = Input;
import { updateApplicationStatusThunk, fetchApplicationByIdThunk} from "../../../../thunks/application-thunk";

const ApplicationFeedback= () => {
  const {application} = useSelector((state) => state.application);
  const status = useSelector((state) => state.application.status);
  const dispatch = useDispatch();
  const {id} = useParams();
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    dispatch(fetchApplicationByIdThunk(id));
  }
  , [id]);
  
  const handleApprove = () => {
    console.log(id);
    dispatch(updateApplicationStatusThunk({id, payload:{onboardingStatus:"approved"}}));
  }

  const handleReject = () => {
    dispatch(updateApplicationStatusThunk({id, payload:{onboardingStatus:"rejected", feedback}}));
  }

  if (status === "loading" || status === "idle" ) {
    return <Spin />;
  }
  return (
    <>
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