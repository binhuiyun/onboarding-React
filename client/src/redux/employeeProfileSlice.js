import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/employeeProfile`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.employees = action.payload;
    });
  },
});

const { reducer, actions } = employeeSlice;
export { fetchAllEmployees };
export const selectEmployees = (state) => state.employees.employees;
export const { setEmployees } = actions;
export default reducer;
