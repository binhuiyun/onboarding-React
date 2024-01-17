import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import personalInformationReducer from "./personalInformationSlice";
import tokenHistoryReducer from "./tokenHistorySlice";
import errorReducer from "./errorSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    personalInformation: personalInformationReducer,
    tokenHistory: tokenHistoryReducer,
    error: errorReducer,
  },
  devTools: true,
});
