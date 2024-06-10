import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, registrationReducer);

export const store = configureStore({
  reducer: {
    registration: persistedReducer,
  },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
