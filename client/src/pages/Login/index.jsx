import {  useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm";
import { fetchUserByIdThunk, loginThunk } from "../../thunks/auth-thunk";
import { useEffect } from "react";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.error);
  const {user} = useSelector((state)=> state.user);

  const fields = [
    {
      placeholder: "username",
      name: "username",
      type: "text",
    },
    {
      placeholder: "Password",
      name: "password",
      type: "password",
      validateStatus: message ? "error" : null,
      help: message || null,
    },
  ];

  const onSubmit = (data) => {
    dispatch(loginThunk(data)).then(() => {
   //   if (res.payload.token) {
      //  dispatch(fetchUserByIdThunk(res.payload.token));
        if (user.username === "hr") {
          navigate(location.state?.from || "/hiring-management");
        } else {
          navigate(location.state?.from || "/onboarding");
        }
      }
    );
  };

  return (
    <div className="flex flex-col h-screen">
      
      <AuthForm
        buttonText="Log in"
        onSubmit={onSubmit}
        title="Please log in first"
        fields={fields}
      />
      
    </div>
  );
}
