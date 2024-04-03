import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setCredentials } from "../features/auth/auth.slice";
import { removeCredentialsFromLS } from "@/utils/utils";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_APP_BASE_URL,
    timeout: 5000,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions = {}) => {
    let result = await baseQuery(args, api, extraOptions);
    const _api = api.getState() as RootState;

    if (result.error?.status === 403) {
        const refreshTokenResult = await baseQuery(
            {
                url: "/refresh",
                method: "POST",
                body: {
                    refreshToken: _api.auth.refreshToken,
                },
            },
            api,
            extraOptions,
        );

        if (refreshTokenResult.data) {
            const { accessToken } = refreshTokenResult.data as { accessToken: string };
            localStorage.setItem("accessToken", accessToken);
            api.dispatch(
                setCredentials({
                    refreshToken: _api.auth.refreshToken,
                    accessToken,
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
