import { api } from "../common/api";

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

export type AuthUser = {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: string | null;
    password: string;
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
            invalidatesTags: [{ type: "User", id: "Auth" }],
        }),
        logout: builder.mutation<void, { email: string }>({
            query: (body) => ({
                url: "/auth/logout",
                method: "POST",
                body,
            }),
        }),
        getAuthUser: builder.query<AuthUser[], void>({
            query: () => "/user",
            providesTags: [{ type: "User", id: "Auth" }],
        }),
    }),
});
export const { useLoginMutation, useLogoutMutation, useGetAuthUserQuery } = authApi;
export default authApi;
