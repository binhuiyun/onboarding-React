import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchForHr = createAsyncThunk("/fetchForHr", async () => {
  const response = await axios.get("http://localhost:4000/api/visa/hr");
  if (response.status === 200) return response.data;
  return null;
});
const fetchForUser = createAsyncThunk("/fetchForUser", async (userID) => {
  const response = await axios.get(`http://localhost:4000/api/visa/${userID}`);
  if (response.status === 200) return response.data;
  return null;
});

const initialState = {
  forHr: [],
  forUser: {},
};

const visaSlice = createSlice({
  name: "visa",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchForHr.fulfilled, (state, { payload }) => {
      state.forHr = payload;
    });
    builder.addCase(fetchForUser.fulfilled, (state, { payload }) => {
      state.forUser = payload;
    });
  },
});
export { fetchForHr, fetchForUser };
export const selectForHr = (state) => state.visa.forHr;
export const selectForUser = (state) => state.visa.forUser;
export default visaSlice.reducer;
