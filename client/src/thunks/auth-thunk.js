import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register} from "../services/auth-service";

export const loginThunk = createAsyncThunk(
    'auth/login',
    (data) => {
        const user = login(data);
        localStorage.setItem('token', user.token);
        return user;
    }

);

export const registerThunk = createAsyncThunk(
    'auth/register',
    (data) => register(data)
);