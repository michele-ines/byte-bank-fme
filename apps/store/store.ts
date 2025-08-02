import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";
import balanceReducer from "./slices/balanceSlice";
import widgetPreferencesReducer from "./slices/widgetPreferencesSlice";
import snackbarReducer from "./slices/snackbarSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    balance: balanceReducer,
    widgetPreferences: widgetPreferencesReducer,
    snackbar: snackbarReducer,
  },
});
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
