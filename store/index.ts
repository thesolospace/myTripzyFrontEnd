import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./slices/authSlice";
import homeScreenSlice from "./slices/homeScreenSlice";

// 1. Configure persistence for auth
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: [
    "token",
    "user",
    "phoneNumber",
    "isNewUser",
    // add any other auth fields you want to persist
  ],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,    // now persisted
    homeScreen: homeScreenSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// 2. Create the persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;






// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";  // Ensure correct import path
// import homeScreenSlice from './slices/homeScreenSlice'
// const store = configureStore({
//   reducer: {
//     auth: authReducer, // Ensure this key matches state.auth in components
//     homeScreen:homeScreenSlice
//   },
// });



// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;


