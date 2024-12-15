import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardProduct } from "../../types";

interface ActiveDepositsState {
  activeDeposits: DashboardProduct[];
}

const initialState: ActiveDepositsState = {
  activeDeposits: [],
};

const activeDepositsSlice = createSlice({
  name: "activeDeposits",
  initialState,
  reducers: {
    setActiveDeposits(state, action: PayloadAction<DashboardProduct[]>) {
      state.activeDeposits = [...state.activeDeposits, ...action.payload];
    },
    removeActiveDeposit(state, action: PayloadAction<string>) {
      state.activeDeposits = state.activeDeposits.filter(
        (deposit) => deposit.id !== action.payload
      );
    },
  },
});

export const { setActiveDeposits, removeActiveDeposit } =
  activeDepositsSlice.actions;
export default activeDepositsSlice.reducer;
