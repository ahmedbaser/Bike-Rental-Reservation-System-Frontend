import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export interface SignUpPayload {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role?: string;
}

export interface LoginPayload {
     email: string;
     password: string;
}

export interface  LoginResponse  {
    success: boolean;
    statusCode: number;
    message: string;
    token: string;
    data: {
        _id: string;
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        __v: number;
    };
}


export const signUpUser = createAsyncThunk(
    'auth/signupUser',
    async(userData: SignUpPayload) => {
        const  response = await axios.post('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/auth/signup', userData);
        return response.data;
    }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload >(
    "auth/loginUser",
    async(loginData: LoginPayload ) => {
        const  response = await axios.post('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/auth/login', loginData);
        return response.data;
    }
)

