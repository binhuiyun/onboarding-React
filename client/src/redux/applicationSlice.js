import {createSlice} from "@reduxjs/toolkit";
import { updateApplicationStatusThunk, fetchApplicationByIdThunk } from "../thunks/application-thunk";

const initialState = {
    application:{}, 
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
        });
    },
});

export default applicationSlice.reducer;