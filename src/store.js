import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/profileSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config
const persistConfig = {
  key: "root",
  storage, // Store in localStorage
  whitelist: ["user"], // Only persist the 'user' slice
};

// Combine reducers (if you have multiple slices)
const rootReducer = combineReducers({
  user: userReducer,
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore persist actions
      },
    }),
});

// Create persistor for persisting state
const persistor = persistStore(store);

export { store, persistor };
