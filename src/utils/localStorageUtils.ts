import { DashboardProduct } from "../types";

const ACTIVE_DEPOSITS_KEY = "activeDeposits";
const CLOSED_DEPOSITS_KEY = "closedDeposits";

export const loadDeposits = (type: "active" | "closed"): DashboardProduct[] => {
  const key = type === "active" ? ACTIVE_DEPOSITS_KEY : CLOSED_DEPOSITS_KEY;
  const deposits = localStorage.getItem(key);
  return deposits ? JSON.parse(deposits) : [];
};

export const saveDeposit = (
  type: "active" | "closed",
  deposit: DashboardProduct
) => {
  const key = type === "active" ? ACTIVE_DEPOSITS_KEY : CLOSED_DEPOSITS_KEY;
  const deposits = loadDeposits(type);
  deposits.push(deposit);
  localStorage.setItem(key, JSON.stringify(deposits));
};

export const removeDeposit = (type: "active" | "closed", depositId: string) => {
  const key = type === "active" ? ACTIVE_DEPOSITS_KEY : CLOSED_DEPOSITS_KEY;
  const deposits = loadDeposits(type).filter(
    (deposit) => deposit.id !== depositId
  );
  localStorage.setItem(key, JSON.stringify(deposits));
};
