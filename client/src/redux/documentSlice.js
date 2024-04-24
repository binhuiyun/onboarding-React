import {createSlice} from "@reduxjs/toolkit";
import { getAllDocumentThunk, updateDocumentThunk} from "../thunks/document-thunk";

const initialState = {
    document:{},
    status: "idle",
    allDocument: [],
};

const documentSlice = createSlice({
    name: "document",
    initialState,
    
    extraReducers: (builder) => {
        builder.addCase(getAllDocumentThunk.fulfilled, (state, action) => {
            state.allDocument = action.payload;
            state.status = "success";
        }
        );
        builder.addCase(updateDocumentThunk.fulfilled, (state, action) => {
            state.document = action.payload;
            state.status = "success";
        }
        );
        

    },
});

export default documentSlice.reducer;