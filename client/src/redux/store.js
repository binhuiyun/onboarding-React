import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import tokenHistoryReducer from "./tokenHistorySlice";
import errorReducer from "./errorSlice";
import visaReducer from "./visaSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    tokenHistory: tokenHistoryReducer,
    error: errorReducer,
    visa: visaReducer,
  },
  devTools: true,
});
