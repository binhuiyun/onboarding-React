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
      console.log("login thunk", user.token);
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
    console.log("Fetching user: ", id);
    const user = await fetchUserById(id);
    return user;
  }
);

export const updateCurrentUserThunk = createAsyncThunk(
  "auth/updateCurrentUser",
  async ({id, data}) => {
    
    const user = await updateCurrentUser(id, data);
    console.log("update current user", user.profile.email);
    return user;
  }
);
