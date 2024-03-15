import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { foundersApi } from "./api/founders.api";

export const store = configureStore({
    reducer: {
        [foundersApi.reducerPath]: foundersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(foundersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
