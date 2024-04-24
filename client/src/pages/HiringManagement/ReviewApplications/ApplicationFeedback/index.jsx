import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Input, Spin, message} from "antd";
import ProfileForm from "../../../../components/ProfileForm";
import { updateCurrentUserThunk } from "../../../../thunks/auth-thunk";

const { TextArea } = Input;
import { updateProfileThunk, getProfileThunk } from "../../../../thunks/profile-thunk";

const ApplicationFeedback = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const application = useSelector((state) => state.profile.profile);
  const {user} = useSelector((state) => state.user);
  const status = useSelector((state) => state.profile.status);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");


  useEffect(() => {
    dispatch(getProfileThunk(id));
    console.log("id",   id)
  }, [id]);

  const handleApprove = () => {
    console.log(id);
    messageApi.open({
      type: "success",
      content: "Application approved",
      duration: 2,
    });
    const updatedProfile = { ...application, onboardingStatus: "approved" };
    dispatch(updateProfileThunk(updatedProfile));
    
    const updatedUser = { ...user, onboardingStatus: "approved" };
    dispatch(updateCurrentUserThunk(updatedUser))};
    

  const handleReject = () => {
    const updatedProfile = { ...application, onboardingStatus: "rejected" };
    dispatch(
      updateProfileThunk(updatedProfile)
    );
    messageApi.open({
      type: "warning",
      content: "Application rejected",
      duration: 2,
    });
  };

  if (status === "loading" || status === "idle") {
    return <Spin />;
  }
  return (
    <>
    
      {contextHolder}
     
      {application.userId == id && (
        <>
    
            <ProfileForm employeeProfile={application} disabled={true} />
            {application.onboardingStatus === "pending" && (
              <div className="flex flex-col space-y-1 justify-center items-center">
              <p className="text-2xl text-geekblue mt-2">Feedback</p>
                <TextArea size="small"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="flex flex-row space-x-5">
                  
                  <Button type="primary" 
                  style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
                  onClick={handleApprove}>Approve</Button>
                  <Button type= "primary" danger="true"
              

                  onClick={handleReject}>Reject</Button>

                </div>
              </div>
            )}
  
        </>
      )}
      
    </>
  );
};

export default ApplicationFeedback;
