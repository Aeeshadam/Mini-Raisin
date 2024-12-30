import React from "react";
import { render, screen } from "../../utils/test.util";
import ProductDetails from "./index";
import { calculateInterestEarned } from "../../utils/utils";
import { Product, DashboardProduct } from "../../types";

const product: Product = {
  id: "1",
  name: "Test Product",
  term: "1 year",
  link: "https://test.com",
  logo: "test.png",
  interestRate: 5,
  minimumDeposit: 1000,
  maximumDeposit: 10000,
};

const dashboardProduct: DashboardProduct = {
  ...product,
  balance: 5000,
  startDate: "2023-01-01",
};

describe("ProductDetails", () => {
  it("renders ProductDetails with Product", () => {
    render(<ProductDetails product={product} />);
    expect(screen.getByText(/1 year/i)).toBeInTheDocument();
    expect(screen.getByText("5.00%")).toBeInTheDocument();
    expect(screen.getByText("£1,000.00")).toBeInTheDocument();
    expect(screen.getByText("£10,000.00")).toBeInTheDocument();
  });

  it("renders ProductDetails with DashboardProduct", () => {
    render(<ProductDetails product={dashboardProduct} />);
    expect(screen.getByText(/1 year/i)).toBeInTheDocument();
    expect(screen.getByText("5.00%")).toBeInTheDocument();
    expect(screen.getByText("£1,000.00")).toBeInTheDocument();
    expect(screen.getByText("£10,000.00")).toBeInTheDocument();
    expect(screen.getByText("£5,000.00")).toBeInTheDocument();
    expect(screen.getByText(/2023-01-01/i)).toBeInTheDocument();
  });

  it("calculates and displays interest earned", () => {
    render(<ProductDetails product={dashboardProduct} />);
    const interestEarned = calculateInterestEarned(
      dashboardProduct.balance,
      dashboardProduct.interestRate,
      dashboardProduct.startDate
    );
    expect(
      screen.getByText(`£${interestEarned.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("renders closed date and saved interest for closed product", () => {
    const closedProduct: DashboardProduct = {
      ...dashboardProduct,
      closedDate: "2024-01-01",
      interestEarned: 100,
    };
    render(<ProductDetails product={closedProduct} />);
    expect(screen.getByText(/2024-01-01/i)).toBeInTheDocument();
    expect(screen.getByText("£100.00")).toBeInTheDocument();
  });
});
