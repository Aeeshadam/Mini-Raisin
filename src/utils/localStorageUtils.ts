import { DashboardProduct } from "../types";

const ACTIVE_DEPOSITS_KEY = "activeDeposits";
const CLOSED_DEPOSITS_KEY = "closedDeposits";

const getDepositsKey = (type: "active" | "closed"): string =>
  type === "active" ? ACTIVE_DEPOSITS_KEY : CLOSED_DEPOSITS_KEY;

export const loadDeposits = (type: "active" | "closed"): DashboardProduct[] => {
  const key = getDepositsKey(type);
  try {
    const deposits = localStorage.getItem(key);
    return deposits ? JSON.parse(deposits) : [];
  } catch (error) {
    console.error("Error parsing deposits from localStorage", error);
    return [];
  }
};

export const saveDeposit = (
  type: "active" | "closed",
  deposit: DashboardProduct
) => {
  const key = getDepositsKey(type);
  try {
    const deposits = loadDeposits(type);
    deposits.push(deposit);
    localStorage.setItem(key, JSON.stringify(deposits));
  } catch (error) {
    console.error("Error saving deposit to localStorage", error);
  }
};

export const removeDeposit = (type: "active" | "closed", depositId: string) => {
  const key = getDepositsKey(type);
  try {
    const deposits = loadDeposits(type);
    const updatedDeposits = deposits.filter(
      (deposit) => deposit.id !== depositId
    );
    localStorage.setItem(key, JSON.stringify(updatedDeposits));
  } catch (error) {
    console.error("Error removing deposit from localStorage", error);
  }
};
