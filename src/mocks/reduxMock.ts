import { DashboardProduct } from "../types/types";
import { RootState } from "../store/store";

export const getMockState = (): Partial<RootState> => ({
  activeDeposits: {
    activeDeposits: [
      {
        id: "1",
        name: "Test Product",
        logo: "test.png",
        balance: 5000,
        interestRate: 5,
        minimumDeposit: 1000,
        maximumDeposit: 10000,
        startDate: "2023-01-01",
      } as DashboardProduct,
    ],
    loading: false,
  },
  closedDeposits: {
    closedDeposits: [
      {
        id: "2",
        name: "Test Product closed",
        logo: "test.png",
        balance: 1000,
        interestRate: 10,
        minimumDeposit: 6000,
        maximumDeposit: 20000,
        startDate: "2023-01-01",
      } as DashboardProduct,
    ],
  },
});
