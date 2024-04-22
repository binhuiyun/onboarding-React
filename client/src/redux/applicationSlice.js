import {createSlice} from "@reduxjs/toolkit";
import { updateApplicationStatusThunk, fetchApplicationByIdThunk, fetchApplicationByStatusThunk } from "../thunks/application-thunk";

const initialState = {
    application:{}, 
    applications: [],
    status: "idle",
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    
    extraReducers: (builder) => {
        builder.addCase(updateApplicationStatusThunk.fulfilled, (state, action) => {
            state.application = action.payload;
        });
        builder.addCase(fetchApplicationByIdThunk.fulfilled, (state, action) => {
            state.application = action.payload;
            state.status = "succeeded";
        });
        builder.addCase(fetchApplicationByIdThunk.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(fetchApplicationByStatusThunk.fulfilled, (state, action) => {
            state.applications = action.payload;
            state.status = "succeeded";
        }
        );

    },
});

export default applicationSlice.reducer;