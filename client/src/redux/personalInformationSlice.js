import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPersonalInformation = createAsyncThunk(
  "personalInformation/fetchPersonalInformation",
  async (id) => {
    console.log(id);
    const response = await axios.get(
      `http://localhost:4000/api/personalInformation/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

const initialState = {};

const personalInformationSlice = createSlice({
  name: "personalInformation",
  initialState,
  reducers: {
    setPersonalInformation: (state, action) => {
      state.personalInformation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPersonalInformation.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPersonalInformation.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.personalInformation = action.payload;
    });
    builder.addCase(fetchPersonalInformation.rejected, (state) => {
      state.status = "failed";
    });
  },
});

const { reducer, actions } = personalInformationSlice;
export { fetchPersonalInformation };
export const { setPersonalInformation } = actions;
export default reducer;