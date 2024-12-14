export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
};
export const formatPercentage = (value: number) => `${value.toFixed(2)}%`;
