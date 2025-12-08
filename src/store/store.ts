import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./slices/portfolioSlice";
import themeReducer from "./slices/themeSlice";
import { persistMiddleware } from "./middleware/persistMiddleware";

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
