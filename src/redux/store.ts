import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { foundersApi } from "./api/founders.api";
import { categoriesApi } from "./api/categories.api";
import { roadmapApi } from "./api/roadmap.api";
import { vouchersApi } from "./api/vouchers.api";

export const store = configureStore({
    reducer: {
        [foundersApi.reducerPath]: foundersApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [roadmapApi.reducerPath]: roadmapApi.reducer,
        [vouchersApi.reducerPath]: vouchersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(foundersApi.middleware, categoriesApi.middleware, roadmapApi.middleware, vouchersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
