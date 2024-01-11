import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register} from "../services/authService";

export const loginThunk = createAsyncThunk(
    'auth/login',
    (data) => {
        const employee = login(data);
        localStorage.setItem('token', employee.token);
        return employee;
    }

);

export const registerThunk = createAsyncThunk(
    'auth/register',
    (data) => register(data)
);