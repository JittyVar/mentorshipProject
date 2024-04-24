import { configureStore } from "@reduxjs/toolkit";
import dashboardSliceReducer from "./dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
