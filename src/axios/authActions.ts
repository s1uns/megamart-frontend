import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type KnownError = {
    message: string;
    description: string;
    code: number | undefined;
};

export type SignInResult = {
    userId: string;
    bearer: string;
};

type Credentials = {
    email: string;
    password: string;
};

const backendURL = "https://localhost:7295";

export const registerUser = (userRole: string) =>
    createAsyncThunk<SignInResult, Credentials>(
        `auth/register`,
        async (credentials: Credentials, { rejectWithValue }) => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const { data } = await axios.post<SignInResult>(
                    `${backendURL}/api/Account/${userRole}/register`,
                    credentials,
                    config
                );

                return data as SignInResult;
            } catch (error: any) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                } else {
                    return rejectWithValue(error.message);
                }
            }
        }
    );

export const userLogin = createAsyncThunk<SignInResult, Credentials>(
    "auth/login",
    async (credentials: Credentials, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                `${backendURL}/api/Account/sign-in`,
                { credentials },
                config
            );
            localStorage.setItem("userToken", data.userToken);
            return data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
