// import React from "react";
 import { Link, useNavigate, useLocation } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
// //import AuthForm from "../../components/AuthForm";
// import LoginForm from "../../components/LoginForm";
 import { loginThunk } from "../../thunks/auth-thunk";

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const onSubmit = (data) => {
//     console.log(data);
//     dispatch(loginThunk(data)).then(() => {
//       // TODO (by Yiqian):
//       // change the following line to navigate to the page you want to go after login
//       // currently, it will navigate to the onboarding page
//       navigate("/onboarding");
//       //navigate("/hiring-management");
//     });
//   };

//   return (
//     <>
//       <LoginForm/>
       
//       <p>
//         New to here? You can <Link to="/signup">sign up</Link> instead.
//       </p>
//     </>
//   );
// }
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
const Login = () => {
  //const navigate = useNavigate();
   //const dispatch = useDispatch();

    // const handleLogin = async(data) => {
    //   try {
    //     // Simulate an API call to validate the username and password
    //     const response =  fetch('http://localhost:4000/api/auth/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     });
  
    //     if (!response.ok) {
    //       // If the response status is not OK, handle the error
    //       const errorData = await response.json();
    //       message.error("Incorrect password.", errorData.message)
    //       ;
    //     } else {
    //       // Success, handle the authenticated user
    //       const userData = await response.json();
    //       console.log('User authenticated:', userData);
    //     }
    //   }catch (error) {
    //     console.error('Error during login:', error);
    //   }
    // };
  return (
    <Form
      name="normal_login"
      className="login-form"
     
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
    
      <Form.Item>
        <Button htmlType="submit" className="login-form-button" 
   >
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
