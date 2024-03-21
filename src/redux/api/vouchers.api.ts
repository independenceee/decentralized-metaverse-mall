import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SuccessResponseWithPagination, Voucher } from "./types";

export const vouchersApi = createApi({
    reducerPath: "vouchersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_APP_BASE_URL,
        timeout: 5000,
    }),
    tagTypes: ["Vouchers"],
    endpoints: (builder) => ({
        getVoucherList: builder.query<SuccessResponseWithPagination<Voucher>, void>({
            query: () => "/voucher",
            providesTags: (result) =>
                result
                    ? [...result.vouchers.map(({ id }) => ({ type: "Vouchers" as const, id })), { type: "Vouchers", id: "LIST" }]
                    : [{ type: "Vouchers", id: "LIST" }],
        }),
        getVoucher: builder.query<Voucher, string>({
            query: (id) => `/voucher/${id}`,
            providesTags: (result, error, id) => [{ type: "Vouchers", id }],
        }),
        addVoucher: builder.mutation<{ count: number }, Voucher[]>({
            query: (body) => ({
                url: "/voucher",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Vouchers", id: "LIST" }],
        }),
        updateVoucher: builder.mutation<Voucher, { id: string; body: Partial<Voucher> }>({
            query: ({ id, body }) => ({
                url: `/voucher/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Vouchers", id }],
        }),
        deleteVoucher: builder.mutation<Voucher, string>({
            query: (string) => ({
                url: `/voucher/${string}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Vouchers", id: "LIST" }],
        }),
    }),
});

export const { useGetVoucherQuery, useGetVoucherListQuery, useUpdateVoucherMutation, useAddVoucherMutation, useDeleteVoucherMutation } = vouchersApi;
