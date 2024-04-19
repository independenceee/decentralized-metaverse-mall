import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Email } from "./types";

export const emailApi = createApi({
    reducerPath: "emailApi",
    tagTypes: ["Email"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_APP_BASE_URL,
        timeout: 5000,
    }),
    endpoints: (builder) => ({
        sendEmail: builder.mutation<void, Pick<Email, "from" | "to" | "text">>({
            query: (body) => ({
                url: "/mail/send",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useSendEmailMutation } = emailApi;
