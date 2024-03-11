import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SignInResult, registerUser, userLogin } from "../../axios/authActions";

export const initialState: IAuthSliceState = {
    loading: false,
    userInfo: {},
    userToken: "",
    error: null,
    success: false,
};

interface IAuthSliceState {
    loading: boolean;
    userInfo: any;
    userToken: string;
    error: any;
    success: boolean;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            userLogin.fulfilled,
            (state, action: PayloadAction<SignInResult>) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.userToken = action.payload.bearer;
            }
        );
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    },
});

export const selectCart = (state: RootState) => state.cart;

export const {} = authSlice.actions;

export default authSlice.reducer;
