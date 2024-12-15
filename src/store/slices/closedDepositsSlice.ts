import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardProduct } from "../../types";

interface ClosedDepositsState {
  closedDeposits: DashboardProduct[];
}

const initialState: ClosedDepositsState = {
  closedDeposits: [],
};

const closedDepositsSlice = createSlice({
  name: "closedDeposits",
  initialState,
  reducers: {
    setClosedDeposits(state, action: PayloadAction<DashboardProduct[]>) {
      state.closedDeposits = [...state.closedDeposits, ...action.payload];
    },
  },
});

export const { setClosedDeposits } = closedDepositsSlice.actions;
export default closedDepositsSlice.reducer;
