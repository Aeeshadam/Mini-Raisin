import { DashboardProduct, Product } from "../types/types";
import { calculateInterestEarned } from "./utils";

export const createClosedDeposit = (
  product: DashboardProduct
): DashboardProduct => ({
  ...product,
  closedDate: new Date().toISOString().split("T")[0],
  interestEarned: calculateInterestEarned(
    product.balance,
    product.interestRate,
    product.startDate
  ),
});

export const createNewDeposit = (
  product: Product,
  amount: number
): DashboardProduct => {
  const startDate = new Date().toISOString().split("T")[0];
  return {
    ...product,
    id: `${product.id}-${Date.now()}`,
    balance: amount,
    startDate,
  };
};
