import {createSlice } from "@reduxjs/toolkit";
import { fetchTokenHistoryThunk, updateTokenStatusThunk, createTokenThunk } from "../thunks/token-thunk";

const initialState = {
    tokenHistory:[],
  
};

const tokenHistorySlice = createSlice({
    name: "tokenHistory",
    initialState,
    
    extraReducers: (builder) => {
        builder.addCase(fetchTokenHistoryThunk.fulfilled, (state, action) => {
            state.tokenHistory = action.payload;
        });
        builder.addCase(updateTokenStatusThunk.fulfilled, (state, action) => {
            state.tokenHistory = action.payload;
        });
        builder.addCase(createTokenThunk.fulfilled, (state, action) => {
            state.tokenHistory.push(action.payload);
        });
    },
});

export default tokenHistorySlice.reducer;
