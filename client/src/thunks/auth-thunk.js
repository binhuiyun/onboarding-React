import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/auth-service";
import { addError, removeError } from "../redux/errorSlice";
import { fetchUserById } from "../services/user-service";
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const user = await login(data);
      localStorage.setItem("token", user.token);
      console.log("thunk", user.token);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const user = await register(data);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserByIdThunk = createAsyncThunk(
  "auth/fetchUserById",
  async (id) => {
      const user = await fetchUserById(id);
      console.log("fetch user by id", user.isHR);
      return user;
    }
);