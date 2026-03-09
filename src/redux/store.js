// File: src/redux/store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// ВАЖЛИВО: використовуємо AsyncStorage для React Native
import AsyncStorage from "@react-native-async-storage/async-storage";
import { campersReducer } from "./campers/slice";
import { filtersReducer } from "./filters/slice";
import { favoritesReducer } from "./favorites/slice";

const persistConfig = {
  key: "campers",
  storage: AsyncStorage,
  whitelist: ["favorites"],
};

const rootReducer = combineReducers({
  campers: campersReducer,
  filters: filtersReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
