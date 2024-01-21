import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createPersonalInformation from "../services/personalInformation-service";
import addToVisaDocumentation from "../services/visaDocument-service";

const submitOnboarding = createAsyncThunk(
  "onboarding/submitOnboarding",
  async (payload) => {
    const { formData, u_id, document } = payload;
    const res = await createPersonalInformation(formData, u_id);
    console.log(document);
    // TODO: RUIKE
    //
    //const res2 = await addToVisaDocumentation(document, u_id, "optReceipt");

    const response = await axios.post(
      `http://localhost:4000/api/visa/${u_id}/optReceipt`,
      document,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(response);
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
