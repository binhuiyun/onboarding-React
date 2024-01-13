import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm";
import { loginThunk } from "../../thunks/auth-thunk";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginThunk(data)).then(() => {
      navigate("/hiring-management");
    });
  };

  return (
    <>
      <AuthForm
        buttonText="Login"
        onSubmit={onSubmit}
        title="Login"
        fields={[
          {
            name: "username",
            placeholder: "Username",
            rules: [
              {
                required: true,
                message: "Please input your username!",
              },
            ],
          },
          {
            name: "password",
            placeholder: "Password",
            type: "password",
            rules: [
              {
                required: true,
                message: "Please input your password!",
              },
            ],
          },
        ]}
      />
      <p>
        New to here? You can <Link to="/signup">sign up</Link> instead.
      </p>
    </>
  );
}
