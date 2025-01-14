import { configureStore } from "@reduxjs/toolkit";
import activeDepositsReducer from "./slices/activeDepositsSlice";
import closedDepositsReducer from "./slices/closedDepositsSlice";
const store = configureStore({
  reducer: {
    activeDeposits: activeDepositsReducer,
    closedDeposits: closedDepositsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
