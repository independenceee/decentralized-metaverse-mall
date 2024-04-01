import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/types";

type AuthType = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
};

const accessToken = typeof sessionStorage.getItem("accessToken");
const refreshToken = sessionStorage.getItem("refreshToken");

const initialState: AuthType = {
    user: null,
    accessToken,
    refreshToken,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Pick<AuthType, "user">>) => {
            state.user = action.payload.user;
        },
        setCredentials: (state, action: PayloadAction<Omit<AuthType, "user">>) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        logOut: (state, action: PayloadAction<void>) => {
            state = initialState;
        },
    },
});

export const { setCredentials, setUser, logOut } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
