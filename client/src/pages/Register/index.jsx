import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { registerThunk } from "../../thunks/auth-thunk";
import axios from "axios";


export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const fields = [
    {
      name: "username",
      placeholder: "username",
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
      type: "email",
      prefix: "@",
      rules: [
        {
          required: true,
          message: "Please input your email!",
        },
        {
          validator: (_, value) => {
            if (value && !value.includes('@')) {
              return Promise.reject('Email must contain "@" symbol!');
            }
            return Promise.resolve();
          },
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

  // useEffect(() => {
  //   if (token) {
  //     axios.post('http://localhost:4000/api/auth/verify', null, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then(res => {
  //       console.log("res", res);
  //     }).catch(err => {
  //       console.log("post failed", err);
  //       navigate("/not-found");
  //     });
  //     console.log("token", token);
  //   }
  //   else {
  //     // TODO: navigate to error page
  //     console.log("no token");
  //   }
  // }, [token]);

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
