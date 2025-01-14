import { Product, DashboardProduct } from "./types";
export const isDashboardProduct = (
  product: Product | DashboardProduct
): product is DashboardProduct => "balance" in product;

export const isProductWithStartDate = (
  product: Product | DashboardProduct
): product is DashboardProduct & { startDate: string } =>
  "startDate" in product;

export const isClosedProduct = (
  product: Product | DashboardProduct
): product is DashboardProduct & { closedDate: string } =>
  "closedDate" in product && "interestEarned" in product;
