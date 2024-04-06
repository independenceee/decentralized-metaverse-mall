import { api } from "../common/api";
import { AuthType } from "./types";

export type LoginRequest = {
    email: string;
    password: string;
};

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthType, LoginRequest>({
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
    }),
});
export const { useLoginMutation, useLogoutMutation } = authApi;
export default authApi;
