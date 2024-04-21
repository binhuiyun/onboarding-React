import React, { useState, useEffect } from "react";
import ProfileForm from "../../components/ProfileForm";
import { useParams } from "react-router-dom";
import { getProfileThunk } from "../../thunks/profile-thunk";

import { useDispatch, useSelector } from "react-redux";

const EmployeeProfileDetailsPage = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector((state) => state.profile);
  const {u_id} = useParams();
  console.log("u_id", u_id);  


  useEffect(() => {
    dispatch(getProfileThunk(u_id));
  } , [u_id]);

  return (
    <>
      {profile.userId == u_id && <ProfileForm employeeProfile={profile} disabled={true}  />}
    </>
  );
};

export default EmployeeProfileDetailsPage;
