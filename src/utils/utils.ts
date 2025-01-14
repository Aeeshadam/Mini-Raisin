export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
};
export const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

export const formatNumber = (value: string) => {
  const numberValue = value.replace(/\D/g, "");
  return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");
  return initials.toUpperCase();
};

export const calculateInterestEarned = (
  amount: number,
  rate: number,
  startDate: string
) => {
  const dailyRate = rate / 100 / 365;
  const start = new Date(startDate);
  const end = new Date();
  const days = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return amount * dailyRate * days;
};

export const validateDepositAmount = (
  amount: number,
  min: number,
  max: number
): boolean => {
  return amount >= min && amount <= max;
};

export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/,/g, ""));
};
