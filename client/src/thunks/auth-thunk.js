import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/auth-service";
import { addError, removeError } from "../redux/errorSlice";
import { fetchUserById, updateCurrentUser } from "../services/user-service";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const user = await login(data);
      localStorage.setItem("userID", user.id);
      localStorage.setItem("token", user.token);
      if (user.email === "hr@gmail.com"){
        localStorage.setItem("isHR", true);
      }
    
      console.log("login thunk", user.email);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      console.log("login thunk error", message);
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
    console.log("Fetching user: ", id);
    const user = await fetchUserById(id);
    return user;
  }
);

export const updateCurrentUserThunk = createAsyncThunk(
  "auth/updateCurrentUser",
  async ( data ) => {
    const user = await updateCurrentUser(data);
    console.log("update current user", user.username);
    return user;
  }
);
