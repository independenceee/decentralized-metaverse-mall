import { SuccessResponseWithPagination, Voucher, VoucherQueryConfig } from "./types";
import { api } from "../common/api";

export const vouchersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getVoucherList: builder.query<SuccessResponseWithPagination<Voucher>, VoucherQueryConfig>({
            query: (queryParams) => {
                return {
                    url: `/voucher`,
                    params: queryParams,
                };
            },
            providesTags: (result) =>
                result
                    ? [...result.vouchers.map(({ id }) => ({ type: "Vouchers" as const, id })), { type: "Vouchers", id: "PARTIAL-LIST" }]
                    : [{ type: "Vouchers", id: "PARTIAL-LIST" }],
        }),
        getVoucher: builder.query<Voucher, string>({
            query: (id) => `/voucher/${id}`,
            providesTags: (result, error, id) => [{ type: "Vouchers", id }],
        }),

        recieveVoucher: builder.mutation<Voucher[], Partial<{ walletAddress: string; epoch: number; categoryName: string }>>({
            query: (body) => ({
                url: `/voucher/recieve`,
                method: "POST",
                body,
            }),
        }),

        addVoucher: builder.mutation<{ count: number }, Voucher[]>({
            query: (body) => ({
                url: "/voucher",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Vouchers", id: "PARTIAL-LIST" }],
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
            query: (id) => ({
                url: `/voucher/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Vouchers", id: "PARTIAL-LIST" }],
        }),
    }),
});

export const {
    useGetVoucherQuery,
    useGetVoucherListQuery,
    useUpdateVoucherMutation,
    useAddVoucherMutation,
    useDeleteVoucherMutation,
    usePrefetch,
    useRecieveVoucherMutation,
} = vouchersApi;
