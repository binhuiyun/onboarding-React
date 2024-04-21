import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProfile, getProfile, updateProfile, getAllProfile } from "../services/profile-service";

export const createProfileThunk = createAsyncThunk(
  "profile/createProfile",
  async (newProfile) => {
    const profile = await createProfile(newProfile);
    return profile;
  }
);

export const getProfileThunk = createAsyncThunk(
  "profile/getProfile",
  async (userId) => {
    const profile = await getProfile(userId);
    return profile;
  }
);

export const updateProfileThunk = createAsyncThunk(
  "profile/updateProfile",
  async (profile) => {
    const updatedProfile = await updateProfile(profile);
    return updatedProfile;
  }
);

export const getAllProfileThunk = createAsyncThunk(
  "profile/getAllProfile",
  async () => {
    const profiles = await getAllProfile();
    return profiles;
  }
);