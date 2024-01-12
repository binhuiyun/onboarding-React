import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "./userSlice";

export default configureStore({
  reducer: {
    employee: employeeReducer,
  },
  devTools: true,
});
