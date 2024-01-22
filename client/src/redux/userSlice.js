import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk, fetchUserByIdThunk, updateCurrentUserThunk} from "../thunks/auth-thunk";

export const initialState = {
  isAuthenticated: false,
  isAuthenticated: false,
  user: {},
  status: "idle",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.isAuthenticated= false;
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
      state.status = "success";
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.status = "failed";
      state.isAuthenticated = false;
      state.user = {};
    });
 
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.status = "success";
    });
  
    builder.addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchUserByIdThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateCurrentUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });

  },
});

export const { setCurrentUser, logOutUser } = currentUserSlice.actions;
export const selectUser = (state) => state.currentUser.user;
export default currentUserSlice.reducer;
