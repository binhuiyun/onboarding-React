import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { registerThunk } from "../../thunks/auth-thunk";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fields = [
    {
      name: "username",
      placeholder: "username",
      prefix: "@",
      rules: [
        {
          required: true,
          message: "Please input your username!",
        },
      ],
    },
    {
      name: "email",
      placeholder: "Email",
      prefix: "@",
      rules: [
        {
          required: true,
          message: "Please input your email!",
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
  ];
  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerThunk(data)).then(() => {
      navigate("/login");
    });
  };
  return (
    <>
      <AuthForm
        buttonText="Register"
        onSubmit={onSubmit}
        title="Register"
        fields={fields}
      />
    </>
  );
}
