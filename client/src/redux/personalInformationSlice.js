import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//u_id
const fetchPersonalInformationByUID = createAsyncThunk(
  "personalInformation/fetchPersonalInformationByUID",
  async (id) => {
    try {
      console.log("Fetching user's personal information with u_id: ", id);
      const response = await axios.get(
        `http://localhost:4000/api/personalInformation/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//p_id
const fetchPersonalInformationByPID = createAsyncThunk(
  "personalInformation/fetchPersonalInformationByPID",
  async (pid) => {
    console.log(pid);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/personalInformationByPID/${pid}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//u_id
const savePersonalInformation = createAsyncThunk(
  "personalInformation/savePersonalInformation",
  async (payload) => {
    const { u_id, formData } = payload;
    try {
      console.log("Saving personal information: ", u_id);
      const response = await axios.put(
        `http://localhost:4000/api/personalInformation/${u_id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const savePersonalInformationWithEmploymentInformation = createAsyncThunk(
  "personalInformation/savePersonalInformationWithEmploymentInformation",
  async (payload) => {
    const { u_id, formDataWithEmploymentInformation } = payload;
    try {
      console.log("Saving personal information: ", u_id);
      const response = await axios.put(
        `http://localhost:4000/api/personalInformation/${u_id}`,
        formDataWithEmploymentInformation
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  personalInformation: {
    name: {},
    address: {},
  },
};

const personalInformationSlice = createSlice({
  name: "personalInformation",
  initialState,
  reducers: {
    setPersonalInformation: (state, action) => {
      state.personalInformation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPersonalInformationByUID.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      fetchPersonalInformationByUID.fulfilled,
      (state, action) => {
        state.status = "fulfilled";
        state.personalInformation = action.payload;
      }
    );
    builder.addCase(fetchPersonalInformationByUID.rejected, (state) => {
      state.status = "failed";
    });
  },
});

const { reducer, actions } = personalInformationSlice;
export {
  fetchPersonalInformationByUID,
  fetchPersonalInformationByPID,
  savePersonalInformation,
  savePersonalInformationWithEmploymentInformation,
};
export const selectPersonalInformation = (state) =>
  state.personalInformation.personalInformation;
export const { setPersonalInformation } = actions;
export default reducer;
