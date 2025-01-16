import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storageSession from "redux-persist/lib/storage/session";
import TokenReducer from "./TokenSlice";

const secretKey = process.env.REACT_APP_SECRET_KEY;

if (!secretKey) {
  throw new Error("Missing REACT_APP_SECRET_KEY in environment variables");
}

const tokenPersistConfig = {
  key: "token",
  storage: storageSession,
  transforms: [
    encryptTransform({
      secretKey: secretKey,
      onError: (error) => {
        console.error("Encryption error:", error);
      },
    }),
  ],
};

const tokenPersistedReducer = persistReducer(tokenPersistConfig, TokenReducer);

const Store = configureStore({
  reducer: {
    token: tokenPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const Persistor = persistStore(Store);

export { Persistor, Store };
