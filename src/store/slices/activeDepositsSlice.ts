import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardProduct } from "../../types";

interface ActiveDepositsState {
  activeDeposits: DashboardProduct[];
  loading: boolean;
}

const initialState: ActiveDepositsState = {
  activeDeposits: [],
  loading: true,
};

const activeDepositsSlice = createSlice({
  name: "activeDeposits",
  initialState,
  reducers: {
    setActiveDeposits(state, action: PayloadAction<DashboardProduct[]>) {
      state.activeDeposits = [...state.activeDeposits, ...action.payload];
      state.loading = false;
    },
    removeActiveDeposit(state, action: PayloadAction<string>) {
      state.activeDeposits = state.activeDeposits.filter(
        (deposit) => deposit.id !== action.payload
      );
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setActiveDeposits, removeActiveDeposit, setLoading } =
  activeDepositsSlice.actions;
export default activeDepositsSlice.reducer;
