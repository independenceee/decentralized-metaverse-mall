import { api } from "../common/api";

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
        logout: builder.mutation<void, { email: string }>({
            query: (body) => ({
                url: "/auth/logout",
                method: "POST",
                body,
            }),
        }),
    }),
});
export const { useLoginMutation, useLogoutMutation } = authApi;
export default authApi;
