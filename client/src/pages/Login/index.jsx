import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm";
import { fetchUserByIdThunk, loginThunk } from "../../thunks/auth-thunk";
import { useEffect } from "react";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.error);
  const { user } = useSelector((state) => state.user);
  const uid = localStorage.getItem("userID");
  const {status} = useSelector((state) => state.user);
  const {isAuthenticated} = useSelector((state) => state.user);

  const fields = [
    {
      placeholder: "email",
      name: "email",
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

  useEffect(() => { 
      dispatch(fetchUserByIdThunk(uid));
      console.log("use effect",user, user.onboardingStatus)
      if (isAuthenticated){
        if (user.email === "hr@gmail.com"){
          navigate("/hiring-management");
        }
        else if (user.onboardingStatus !== "approved") {
          navigate("/onboarding");
        }
        else {
          navigate("/personal-information");
        }
    }
  }, [uid, user.onboardingStatus, isAuthenticated]);


  const onSubmit = (data) => {
    dispatch(loginThunk(data));

      // console.log("user onboarding", user.onboardingStatus);
      // if (user.onboardingStatus === "approved") { 
      //   navigate("/personal-information");
      // }

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
