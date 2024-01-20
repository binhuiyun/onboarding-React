import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateApplicationStatus } from "../services/application-service";

export const updateApplicationStatusThunk = createAsyncThunk(
  "application/updateApplicationStatus",
  async ({id, payload}) => {
    const app = await updateApplicationStatus(id, payload);
    console.log("application status updated", app.onboardingStatus);
    return app;
  }
);
