import {createSlice} from "@reduxjs/toolkit";
import {getDocumentThunk} from "../thunks/document-thunk";

const initialState = {
    document:{},
    status: "idle",
};

const documentSlice = createSlice({
    name: "document",
    initialState,
    
    extraReducers: (builder) => {
        builder.addCase(getDocumentThunk.fulfilled, (state, action) => {
            state.document = action.payload[0];
            state.status = "success";
        });
    },
});

export default documentSlice.reducer;