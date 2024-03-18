import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Founder } from "./type";

export const foundersApi = createApi({
    reducerPath: "foundersAPI",
    tagTypes: ["Founders"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_APP_BASE_URL,
        timeout: 5000,
    }),
    endpoints: (builder) => ({
        getFounderList: builder.query<Founder[], void>({
            query: () => "/founder",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Founders" as const,
                              id,
                          })),
                          {
                              type: "Founders",
                              id: "LIST",
                          },
                      ]
                    : [{ type: "Founders", id: "LIST" }],
        }),
        getFounder: builder.query<Founder, string>({
            query: (id) => `/founder/${id}`,
            providesTags: (result, error, id) => [{ type: "Founders", id }],
        }),
        addFounder: builder.mutation<Founder, FormData>({
            query: (body) => ({
                url: "/founder",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Founders", id: "LIST" }],
        }),
        updateFounder: builder.mutation<Founder, { id: string; body: FormData }>({
            query: ({ id, body }) => ({
                url: `/founder/${id}`,
                method: "PATCH",
                body,
            }),
        }),
        deleteFounder: builder.mutation<void, string>({
            query: (id) => ({
                url: `/founder/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Founders", id: "LIST" }],
        }),
    }),
});

export const { useGetFounderListQuery, useAddFounderMutation, useDeleteFounderMutation, useGetFounderQuery, useUpdateFounderMutation } = foundersApi;
