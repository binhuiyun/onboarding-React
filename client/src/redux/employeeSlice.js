import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "../thunks/auth-thunk";

export const initialState = {
  isAutenicated: false,
  employee: {},
  status: "idle",
};

const currentEmployeeSlice = createSlice({
  name: "currentEmployee",
  initialState,
  reducers: {
    setCurrentEmployee: (state, action) => {
        state.isAutenicated = !!Object.keys(action.payload).length;
        state.employee = action.payload;
        },
    logout: (state) => {
      state.isAutenicated = false;
      state.employee = {};
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
      state.employee = action.payload;
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

export const { setCurrentEmployee,logout } = currentEmployeeSlice.actions;

export default currentEmployeeSlice.reducer;
