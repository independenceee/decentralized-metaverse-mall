import { emailApi } from "./services/email.api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/auth.slice";
import { api } from "./common/api";

export const store = configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer: {
        [emailApi.reducerPath]: emailApi.reducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, emailApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
