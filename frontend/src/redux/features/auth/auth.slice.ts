import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getValueFromLS } from "@/utils/utils";
import { AuthType, User } from "@/redux/services/types";

const accessToken = getValueFromLS("accessToken") || "";
const refreshToken = getValueFromLS("refreshToken") || "";
const user = getValueFromLS("user") !== null ? JSON.parse(getValueFromLS("user") || "") : null;

const initialState: AuthType = {
    user,
    tokens: {
        accessToken,
        refreshToken,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthType>) => {
            const { accessToken, refreshToken } = action.payload.tokens;
            state.tokens.accessToken = accessToken;
            state.tokens.refreshToken = refreshToken;
            state.user = action.payload.user;
        },
        logOut: (state, action: PayloadAction<void>) => {
            state = initialState;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
