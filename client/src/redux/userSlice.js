import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "../thunks/auth-thunk";

export const initialState = {
  isAutenicated: false,
  user: {},
  status: "idle",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
        state.isAutenicated = !!Object.keys(action.payload).length;
        state.user = action.payload;
        },
    logout: (state) => {
      state.isAutenicated = false;
      state.user = {};
      state.status = "idle";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.status = "idle";
      state.isAutenicated = true;
      state.user = action.payload;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(registerThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(registerThunk.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setCurrentUser,logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
