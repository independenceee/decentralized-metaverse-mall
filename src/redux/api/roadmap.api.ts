import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RoadmapItem } from "./types";
import { fetchBaseQueryConfig } from "../config/config";

export const roadmapApi = createApi({
    reducerPath: "roadmapAPI",
    baseQuery: fetchBaseQuery(fetchBaseQueryConfig),
    tagTypes: ["Roadmap"],
    endpoints: (builder) => ({
        getRoadmapList: builder.query<RoadmapItem[], void>({
            query: () => "/roadmap",
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: "Roadmap" as const, id })), { type: "Roadmap", id: "LIST" }]
                    : [{ type: "Roadmap", id: "LIST" }],
        }),
        getRoadmapById: builder.query<RoadmapItem, string>({
            query: (id) => `/roadmap/${id}`,
            providesTags: (result, error, id) => [{ type: "Roadmap", id }],
        }),
        addRoadmap: builder.mutation<RoadmapItem, Pick<RoadmapItem, "title" | "datetime" | "description">>({
            query: (body) => ({
                url: "/roadmap",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Roadmap", id: "LIST" }],
        }),
        updateRoadmap: builder.mutation<RoadmapItem, { id: string; body: Pick<RoadmapItem, "title" | "datetime" | "description"> }>({
            query: ({ id, body }) => ({
                url: `/roadmap/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Roadmap", id }],
        }),
        deleteRoadmap: builder.mutation<void, string>({
            query: (id) => ({
                url: `/roadmap/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Roadmap", id: "LIST" }],
        }),
    }),
});

export const { useGetRoadmapByIdQuery, useGetRoadmapListQuery, useAddRoadmapMutation, useUpdateRoadmapMutation, useDeleteRoadmapMutation } =
    roadmapApi;
