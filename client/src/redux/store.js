import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import personalInformationReducer from "./personalInformationSlice";
import tokenHistoryReducer from "./tokenHistorySlice";

export default configureStore({
  reducer: {
    user: userReducer,
    personalInformation: personalInformationReducer,
    tokenHistory: tokenHistoryReducer,
  },
  devTools: true,
});
