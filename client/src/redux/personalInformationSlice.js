import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiCall from "../services/api";

//u_id
const fetchPersonalInformationByUID = createAsyncThunk(
  "personalInformation/fetchPersonalInformationByUID",
  async (id) => {
    try {
      console.log("Fetching user's personal information with u_id: ", id);
      const response = await apiCall({
        url: `/api/personalInformation/${id}`,
        method: "get",
      });
      return response;
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
      const response = await apiCall({
        url: `/api/personalInformationByPID/${pid}`,
        method: "get",
      });
      return response;
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
      // const response = await axios.put(
      //   `http://localhost:4000/api/personalInformation/${u_id}`,
      //   formData
      // );
      // TODO - use apiCall instead of axios

      const response = await apiCall({
        url: `/api/personalInformation/${u_id}`,
        method: "put",
        data: formData,
      });
      console.log(response);
      return response;
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

const savePersonalInformationWithEmergencyContact = createAsyncThunk(
  "personalInformation/savePersonalInformationWithEmergencyContact",
  async (payload) => {
    const { u_id, formDataWithEmergencyContact } = payload;
    try {
      console.log("Saving personal information: ", u_id);
      const response = await axios.put(
        `http://localhost:4000/api/personalInformation/${u_id}`,
        formDataWithEmergencyContact
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
  savePersonalInformationWithEmergencyContact,
};
export const selectPersonalInformation = (state) =>
  state.personalInformation.personalInformation;
export const { setPersonalInformation } = actions;
export default reducer;
