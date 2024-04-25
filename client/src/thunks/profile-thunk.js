import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProfile, getProfile, updateProfile, getAllProfile, 
  getAppByStatus, getProfileByOpt, getInProgressProfile
 } from "../services/profile-service";

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

export const getAppByStatusThunk = createAsyncThunk(
  "profile/getAppByStatus",
  async (status) => {
    const apps = await getAppByStatus(status);
    return apps;
  }
);

export const getProfileByOptThunk = createAsyncThunk(
  "profile/getProfileByOpt",
  async () => {
    const profiles = await getProfileByOpt();
    return profiles;
  }
);


export const getInProgressProfileThunk = createAsyncThunk(
  "profile/getInProgressProfile",
  async () => {
    const profiles = await getInProgressProfile();
    return profiles;
  }
);