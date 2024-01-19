import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTokenHistory,
  updateTokenStatus,
  createToken,
} from "../services/token-service";

export const fetchTokenHistoryThunk = createAsyncThunk(
  "tokenHistory/fetchTokenHistory",
  async () => {
    const tokenHistory = await fetchTokenHistory();
    return tokenHistory;
  }
);

export const updateTokenStatusThunk = createAsyncThunk(
  "tokenHistory/updateTokenStatus",
  async (email) => {
    const token = await updateTokenStatus(email);
    console.log("token status updated", email);
    return token;
  }
);

export const createTokenThunk = createAsyncThunk(
  "tokenHistory/createToken",
  async (newToken) => {
    const token = await createToken(newToken);
    return token;
  }
);
