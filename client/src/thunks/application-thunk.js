import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateApplicationStatus, fetchAppById } from "../services/application-service";


export const updateApplicationStatusThunk = createAsyncThunk(
  "application/updateApplicationStatus",
  async ({id, payload}) => {
    const app = await updateApplicationStatus(id, payload);
    console.log("application status updated", app.onboardingStatus);
    return app;
  }
);

export const fetchApplicationByIdThunk = createAsyncThunk(
  "application/fetchApplicationById",
  async (id) => {
    const app = await fetchAppById(id);
    console.log("fetch application by id", app.onboardingStatus);
    return app;
  }
);
