import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getValueFromLS } from "@/utils/utils";
import { AuthUser } from "@/redux/services/auth.api";

type AuthType = {
    user: AuthUser | null;
    accessToken: string | null;
    refreshToken: string | null;
};

const accessToken = getValueFromLS("accessToken");
const refreshToken = getValueFromLS("refreshToken");
const user = getValueFromLS("user") !== null ? JSON.parse(getValueFromLS("user") || "") : null;

const initialState: AuthType = {
    user,
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
