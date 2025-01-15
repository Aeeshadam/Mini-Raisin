import { FC } from "react";
import DetailItem from "../DetailItem";
import {
  formatCurrency,
  formatPercentage,
  calculateInterestEarned,
} from "../../utils";
import { Product, DashboardProduct } from "../../types/types";
import {
  isDashboardProduct,
  isProductWithStartDate,
  isClosedProduct,
} from "../../types/typeGuards";

interface ProductDetailsProps {
  product: Product | DashboardProduct;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const isDashboard = isDashboardProduct(product);
  const hasStartDate = isProductWithStartDate(product);
  const isClosed = isClosedProduct(product);

  const interest = (() => {
    if (isClosed) return product.interestEarned;
    if (isDashboard && hasStartDate) {
      return calculateInterestEarned(
        product.balance,
        product.interestRate,
        product.startDate
      );
    }
    return undefined;
  })();

  const details = [
    {
      label: "Term",
      value: product.term,
    },
    {
      label: "Interest Rate",
      value: product.interestRate,
      formatter: formatPercentage,
    },
    {
      label: "Minimum Deposit",
      value: product.minimumDeposit,
      formatter: formatCurrency,
    },
    {
      label: "Maximum Deposit",
      value: product.maximumDeposit,
      formatter: formatCurrency,
    },
    {
      label: "Balance",
      value: isDashboard ? product.balance : undefined,
      formatter: formatCurrency,
    },
    {
      label: "Interest Earned",
      value: interest,
      formatter: formatCurrency,
    },
    {
      label: "Start Date",
      value: hasStartDate ? product.startDate : undefined,
    },
    {
      label: "Closed Date",
      value: isClosed ? product.closedDate : undefined,
    },
  ];

  return (
    <div data-testid="productDetails">
      {details.map(({ label, value, formatter }) =>
        value !== undefined ? (
          <DetailItem
            key={label}
            label={label}
            value={formatter ? formatter(value) : value}
          />
        ) : null
      )}
    </div>
  );
};

export default ProductDetails;
