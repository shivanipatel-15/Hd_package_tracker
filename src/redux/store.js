import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import packageReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  safelist: ["packages"],
};

const persistedReducer = persistReducer(persistConfig, packageReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
