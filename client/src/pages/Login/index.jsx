import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm";
import { fetchUserByIdThunk, loginThunk } from "../../thunks/auth-thunk";
import { useEffect } from "react";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.error);

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
    dispatch(loginThunk(data)).then((res) => {
      if (res.payload.token) {
        if (res.payload.username === "hr") {
          navigate("/hiring-management");
        } else {
          navigate("/onboarding");
        }
      }
    });
  };

  return (
    <div>
      <AuthForm
        buttonText="Log in"
        onSubmit={onSubmit}
        title="Please log in first"
        fields={fields}
      />
    </div>
  );
}
