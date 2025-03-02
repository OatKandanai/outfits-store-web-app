import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userRedux";
import cartSlice from "./cartRedux";
import adminSlice from "./adminRedux";

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
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  admin: adminSlice,
});

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for storing the persisted state in local storage
  version: 1,
  storage, // Uses local storage as the storage engine
  whitelist: ["user", "cart"], // Only persist user and cart slices (ignore others)
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export default store;
