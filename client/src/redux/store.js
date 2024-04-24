import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import tokenHistoryReducer from "./tokenHistorySlice";
import errorReducer from "./errorSlice";
import documentReducer from "./documentSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    tokenHistory: tokenHistoryReducer,
    error: errorReducer,
    document: documentReducer,
  },
  devTools: true,
});
