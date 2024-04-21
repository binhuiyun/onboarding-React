import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Popconfirm, message } from "antd";
import {
  getProfileThunk,
  updateProfileThunk,
} from "../../thunks/profile-thunk";
import ProfileForm from "../../components/ProfileForm";

const PersonalInformation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const status = useSelector((state) => state.profile.status);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getProfileThunk(id));
  }, [id]);

  console.log("profilestatus", status);
  const toggleEdit = () => {
    setEdit(!edit);
  };
  const onFinish = (values) => {
    console.log(values);
    toggleEdit();
    const updatedProfile = { ...profile, ...values };
    dispatch(updateProfileThunk(updatedProfile));
  };
  const confirm = (e) => {
    console.log(e);
    toggleEdit();
  };
  const cancel = (e) => {
    
    message.error("Click on No");
  };

  return (
    <>
      {status === "success" && (
        <>
          <ProfileForm employeeProfile={profile} disabled={!edit} form={form}
          onFinish={onFinish}/>
          {edit ? (
            <>
              <Button htmlType="submit" className="ml-4" 
                onClick={form.submit}
    >
                Save
              </Button>

              <Popconfirm className="ml-4"
                title="Are you sure you want to cancel?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Cancel</Button>
              </Popconfirm>
            </>
          ) : (
            <Button  htmlType="submit" className="ml-4" onClick={toggleEdit}>
              Edit
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default PersonalInformation;
