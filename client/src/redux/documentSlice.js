import {createSlice} from "@reduxjs/toolkit";
import { updateDocumentThunk, deleteDocumentThunk} from "../thunks/document-thunk";

const initialState = {
    document:{},
    status: "idle",
 
};

const documentSlice = createSlice({
    name: "document",
    initialState,
    
    extraReducers: (builder) => {
       
        builder.addCase(updateDocumentThunk.fulfilled, (state, action) => {
            state.document = action.payload;
            state.status = "success";
        }
        );
        builder.addCase(deleteDocumentThunk.fulfilled, (state, action) => {
            state.document = {};
            state.status = "success";
        }
        );  

    },
});

export default documentSlice.reducer;