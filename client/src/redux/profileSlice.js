import {createSlice} from "@reduxjs/toolkit";
import {createProfileThunk, getProfileThunk, updateProfileThunk, getAllProfileThunk, getAppByStatusThunk,
    getProfileByOptThunk
} from "../thunks/profile-thunk";

const initialState = {
    profile:{}, 
    profiles:[],
    status: "idle",
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    
    extraReducers: (builder) => {
        builder.addCase(createProfileThunk.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.profiles.push(action.payload);
            state.status = "success";
        });
        builder.addCase(getProfileThunk.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.status = "success";
        });
        builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.status = "success";
        });
        builder.addCase(getAllProfileThunk.fulfilled, (state, action) => {
            state.profiles = action.payload;
            state.status = "success";
        });
        builder.addCase(getAppByStatusThunk.fulfilled, (state, action) => {
            state.profiles = action.payload;
            state.status = "success";
        }
        );
        builder.addCase(getProfileByOptThunk.fulfilled, (state, action) => {
            state.profiles = action.payload;
            state.status = "success";
        }
        );
        

    },
});

export default profileSlice.reducer;