import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Input, Spin, message} from "antd";
import ProfileForm from "../../../../components/ProfileForm";
import { fetchUserByIdThunk, updateCurrentUserThunk } from "../../../../thunks/auth-thunk";
import { updateProfileThunk, getProfileThunk } from "../../../../thunks/profile-thunk";
const { TextArea } = Input;

const ApplicationFeedback = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const application = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.profile.status);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  //const docs = application.uploadedDocuments;
  //const doc = docs.find((doc) => doc.fileType === "optReceipt");


  useEffect(() => {
    dispatch(getProfileThunk(id));
    dispatch(fetchUserByIdThunk(id));

   // console.log("application feedback", docId);

  }, [id]);

  const handleApprove = () => {
    console.log("approve", user);
    messageApi.open({
      type: "success",
      content: "Application approved",
      duration: 2,
    });

  const updatedProfile = { ...application, onboardingStatus: "approved" };
    dispatch(updateProfileThunk(updatedProfile));
    
  const updatedUser = { ...user, onboardingStatus: "approved" };
    dispatch(updateCurrentUserThunk(updatedUser))
  };
  
  const handleReject = () => {
    console.log("reject", user)
    const updatedProfile = { ...application, onboardingStatus: "rejected", HRfeedback: feedback };
    dispatch(
      updateProfileThunk(updatedProfile)
    );
    const updatedUser = { ...user, onboardingStatus: "rejected" };
    dispatch(updateCurrentUserThunk(updatedUser));
  
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
