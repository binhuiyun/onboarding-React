import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/auth-service";
import { createPersonalInformation } from "../services/personalInformation-service";

export const loginThunk = createAsyncThunk("auth/login", async (data) => {
  const user = await login(data);
  localStorage.setItem("token", user.token);
  console.log("thunk", user.token);
  return user;
});

export const registerThunk = createAsyncThunk("auth/register", async (data) => {
  await register(data);
  //await createPersonalInformation(data);
});
