import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setCredentials } from "../features/auth/auth.slice";
import { removeCredentialsFromLS } from "@/utils/utils";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_APP_BASE_URL,
    timeout: 5000,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.tokens.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions = {}) => {
    let result = await baseQuery(args, api, extraOptions);
    const _api = api.getState() as RootState;

    if (result.error?.status === 401) {
        const refreshTokenResult = await baseQuery(
            {
                url: "/auth/refresh",
                method: "POST",
                body: {
                    refreshToken: _api.auth.tokens.refreshToken,
                    id: _api.auth.user.id,
                    email: _api.auth.user.email,
                },
            },
            api,
            extraOptions,
        );

        if (refreshTokenResult.data) {
            const { accessToken, refreshToken } = refreshTokenResult.data as { accessToken: string; refreshToken: string };
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            api.dispatch(
                setCredentials({
                    tokens: {
                        refreshToken,
                        accessToken,
                    },
                    user: _api.auth.user,
                }),
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
            removeCredentialsFromLS();
        }
    }

    return result;
};

export const api = createApi({
    reducerPath: "splitApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Banners", "Vouchers", "Roadmap", "Deals", "Founders", "Categories", "User"],
    endpoints: (_) => ({}),
});
