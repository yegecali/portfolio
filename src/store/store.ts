import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./slices/portfolioSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
