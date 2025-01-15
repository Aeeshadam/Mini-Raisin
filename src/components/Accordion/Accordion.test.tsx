import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import Accordion from "./index";
import { useDashboard } from "../../contexts/DashboardContext";
import { getMockState } from "../../mocks/reduxMock";
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

describe("Accordion", () => {
  const mockHandleCloseDeposit = jest.fn();
  const initialState = getMockState();
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
    const balanceElement = screen.getByText("£5,000.00", { selector: "h3" });
    expect(balanceElement).toBeInTheDocument();
  });

  it("renders Accordion with closed deposits", () => {
    render(<Accordion productId="2" isActive={false} />);
    expect(screen.getByText(/Test Product closed/i)).toBeInTheDocument();
    const balanceElement = screen.getByText("£1,000.00", { selector: "h3" });
    expect(balanceElement).toBeInTheDocument();
  });

  it("renders product details on 'Details' button click", () => {
    render(<Accordion productId="1" isActive={true} />);
    fireEvent.click(screen.getByText("Details"));
    expect(screen.getByTestId("productDetails")).toBeInTheDocument();
  });

  it("calls handleCloseDeposit when 'Close Deposit' button is clicked", () => {
    render(<Accordion productId="1" isActive={true} />);
    expect(screen.getByText("Close Deposit")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close Deposit" }));
    expect(mockHandleCloseDeposit).toHaveBeenCalledTimes(1);
  });

  it("does not display close button for closed deposits", () => {
    render(<Accordion productId="2" isActive={false} />);
    expect(screen.queryByRole("button", { name: "Close Deposit" })).toBeNull();
  });

  it("does not render if product is not found", () => {
    render(<Accordion productId="3" isActive={true} />);
    expect(screen.queryByTestId("accordion")).not.toBeInTheDocument();
  });
});
