import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HotDeal } from "./types";
import { api } from "../common/api";

export const dealsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getHotDealList: builder.query<HotDeal[], void>({
            query: () => `/dealhot`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Deals" as const,
                              id,
                          })),
                          { type: "Deals", id: "LIST" },
                      ]
                    : [{ type: "Deals", id: "LIST" }],
        }),
        getHotDeal: builder.query<HotDeal, string>({
            query: (id) => `/dealhot/${id}`,
            providesTags: (result, error, id) => [{ type: "Deals", id }],
        }),
        addHotDeal: builder.mutation<HotDeal, FormData>({
            query: (body) => ({
                url: "/dealhot",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Deals", id: "LIST" }],
        }),
        updateHotDeal: builder.mutation<HotDeal, { id: string; body: FormData }>({
            query: ({ body, id }) => ({
                url: `/dealhot/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Deals", id: arg.id }],
        }),
        deleteHotDeal: builder.mutation<HotDeal, string>({
            query: (id) => ({
                url: `/dealhot/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Deals", id: "LIST" }],
        }),
    }),
});

export const { useGetHotDealListQuery, useUpdateHotDealMutation, useDeleteHotDealMutation, useAddHotDealMutation, useGetHotDealQuery } = dealsApi;
