import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import ProfileForm from "../../components/ProfileForm";
import { useSearchParams, Link } from "react-router-dom";
import { getEmployeeProfileByPID } from "../../redux/employeeProfileSlice";
import { useDispatch } from "react-redux";

const EmployeeProfileDetailsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const p_id = searchParams.get("p_id");
  const [employeeProfile, setEmployeeProfile] = useState(null);

  useEffect(() => {
    console.log(`Fetching ${p_id}'s profile...`);
    dispatch(getEmployeeProfileByPID(p_id)).then((res) => {
      console.log("Fetched employee profile: ", res.payload);
      setEmployeeProfile(res.payload);
    });
  }, [searchParams]);

  return (
    <>
      <Header />
      {employeeProfile && <ProfileForm personalInformation={employeeProfile}/>}
    </>
  );
};

export default EmployeeProfileDetailsPage;
