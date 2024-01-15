import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { login, handleSubmit, errors, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      // Simulate an API call to validate the username and password
      const response = await fetch('http:localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // If the response status is not OK, handle the error
        const errorData = await response.json();
        setError('password', { type: 'manual', message: errorData.message });
      } else {
        // Success, handle the authenticated user
        const userData = await response.json();
        console.log('User authenticated:', userData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          ref={login({ required: 'Username is required' })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={login({
            required: 'Password is required',
        
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
