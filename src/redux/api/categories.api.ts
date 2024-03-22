import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "./types";
import { fetchBaseQueryConfig } from "../config/config";

export const categoriesApi = createApi({
    reducerPath: "categoriesAPI",
    baseQuery: fetchBaseQuery(fetchBaseQueryConfig),
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => `/category`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Categories" as const,
                              id,
                          })),
                          { type: "Categories", id: "LIST" },
                      ]
                    : [{ type: "Categories", id: "LIST" }],
        }),
        getCategory: builder.query<Category, string>({
            query: (id) => `/category/${id}`,
            providesTags: (result, error, id) => [{ type: "Categories", id }],
        }),
        addCategory: builder.mutation<Category, FormData>({
            query: (body) => ({
                url: "/category",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Categories", id: "LIST" }],
        }),
        updateCategory: builder.mutation<Category, { id: string; body: FormData }>({
            query: ({ body, id }) => ({
                url: `/category/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Categories", id: arg.id }],
        }),
        deleteCategory: builder.mutation<Category, string>({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Categories", id: "LIST" }],
        }),
    }),
});

export const { useGetCategoriesQuery, useUpdateCategoryMutation, useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoryQuery } =
    categoriesApi;
