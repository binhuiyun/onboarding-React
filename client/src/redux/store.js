import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import personalInformationReducer from "./personalInformationSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    personalInformation: personalInformationReducer,
  },
  devTools: true,
});
