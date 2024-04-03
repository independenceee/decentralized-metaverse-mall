
import { Banner } from "./types";
import { api } from "../common/api";

export const bannersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBannerList: builder.query<Banner[], void>({
            query: () => `/banner`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Banners" as const,
                              id,
                          })),
                          { type: "Banners", id: "LIST" },
                      ]
                    : [{ type: "Banners", id: "LIST" }],
        }),
        getBanner: builder.query<Banner, string>({
            query: (id) => `/banner/${id}`,
            providesTags: (result, error, id) => [{ type: "Banners", id }],
        }),
        addBanner: builder.mutation<Banner, FormData>({
            query: (body) => ({
                url: "/banner",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Banners", id: "LIST" }],
        }),
        updateBanner: builder.mutation<Banner, { id: string; body: FormData }>({
            query: ({ body, id }) => ({
                url: `/banner/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Banners", id: arg.id }],
        }),
        deleteBanner: builder.mutation<Banner, string>({
            query: (id) => ({
                url: `/banner/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Banners", id: "LIST" }],
        }),
    }),
});

export const { useGetBannerListQuery, useAddBannerMutation, useDeleteBannerMutation, useGetBannerQuery, useUpdateBannerMutation } = bannersApi;
