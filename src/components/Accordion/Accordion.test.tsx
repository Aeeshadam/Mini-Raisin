import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "./index";
import { useSelector } from "react-redux";
import { DashboardProduct } from "../../types";
import { useDashboard } from "../../contexts/DashboardContext";
import { RootState } from "../../store/store";

jest.mock("../../contexts/DashboardContext", () => ({
  useDashboard: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDashboard = useDashboard as jest.Mock;

const initialState: Partial<RootState> = {
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
};

describe("Accordion", () => {
  const mockHandleCloseDeposit = jest.fn();
  beforeEach(() => {
    mockUseDashboard.mockReturnValue({
      handleCloseDeposit: mockHandleCloseDeposit,
    });
    mockUseSelector.mockImplementation((selector) =>
      selector(initialState as RootState)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Accordion with active deposits", () => {
    render(<Accordion productId="1" isActive={true} />);
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText("£5,000.00")).toBeInTheDocument();
  });

  it("renders Accordion with closed deposits", () => {
    render(<Accordion productId="2" isActive={false} />);
    expect(screen.getByText(/Test Product closed/i)).toBeInTheDocument();
    expect(screen.getByText("£1,000.00")).toBeInTheDocument();
  });

  it("toggle accordion on click details button", () => {
    render(<Accordion productId="1" isActive={true} />);
    fireEvent.click(screen.getByText("Details"));
    expect(screen.getByTestId("productDetails")).toBeInTheDocument();
  });

  it("dislays close button for active deposits and call handleclose on click", () => {
    render(<Accordion productId="1" isActive={true} />);
    expect(screen.getByText("Close Deposit")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close Deposit"));
    expect(mockHandleCloseDeposit).toHaveBeenCalledTimes(1);
  });

  it("does not display close button for closed deposits", () => {
    render(<Accordion productId="2" isActive={false} />);
    expect(screen.queryByText("Close Deposit")).not.toBeInTheDocument();
  });

  it("does not render if product is not found", () => {
    render(<Accordion productId="3" isActive={true} />);
    expect(screen.queryByTestId("accordion")).not.toBeInTheDocument();
  });
});
