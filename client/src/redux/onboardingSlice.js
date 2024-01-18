import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createPersonalInformation from "../services/personalInformation-service";
import addToVisaDocumentation  from "../services/visaDocument-service";

const submitOnboarding = createAsyncThunk(
  "onboarding/submitOnboarding",
  async ({data, userID, fileType}) => {
    try {
      console.log(data);
      const res = await createPersonalInformation(data);
      const res2 = await addToVisaDocumentation(data, userID, fileType);
      console.log(res, res2);
    } catch (err) {
      return err.response.data;
    }
  }
);

const initialState = {
  onboarding: {},
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboarding: (state, action) => {
      state.onboarding = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitOnboarding.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(submitOnboarding.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.onboarding = action.payload;
    });
    builder.addCase(submitOnboarding.rejected, (state) => {
      state.status = "failed";
    });
  },
});

const { reducer, actions } = onboardingSlice;
export { submitOnboarding };
export const selectOnboarding = (state) => state.onboarding.onboarding;
export const { setOnboarding } = actions;
export default reducer;