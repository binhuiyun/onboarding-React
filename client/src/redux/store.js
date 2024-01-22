import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import personalInformationReducer from "./personalInformationSlice";
import tokenHistoryReducer from "./tokenHistorySlice";
import errorReducer from "./errorSlice";
import employeeProfileReducer from "./employeeProfileSlice";
import onboardingReducer from "./onboardingSlice";
import applicationReducer from "./applicationSlice";
import visaReducer from "./visaSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    personalInformation: personalInformationReducer,
    tokenHistory: tokenHistoryReducer,
    error: errorReducer,
    employeeProfile: employeeProfileReducer,
    onboarding: onboardingReducer,
    application: applicationReducer,
    visa: visaReducer,
  },
  devTools: true,
});
