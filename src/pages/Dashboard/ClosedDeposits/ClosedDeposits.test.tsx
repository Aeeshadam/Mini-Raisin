import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useDashboard } from "../../../contexts/DashboardContext";
import CloseDeposits from "./index";
import { getMockState } from "../../../mocks/reduxMock";
import { RootState } from "../../../store/store";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("../../../contexts/DashboardContext", () => ({
  useDashboard: jest.fn(),
}));

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDashboard = useDashboard as jest.Mock;

describe("Closed", () => {
  const initialState = getMockState();

  beforeEach(() => {
    mockUseSelector.mockImplementation((selector) =>
      selector(initialState as RootState)
    );

    mockUseDashboard.mockReturnValue({
      closedDeposits: initialState.closedDeposits?.closedDeposits,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ClosedDeposits with a list of closed deposits", () => {
    render(<CloseDeposits />);
    expect(screen.getByTestId("closed-deposits")).toBeInTheDocument();
    expect(screen.getByText("Test Product closed")).toBeInTheDocument();
  });

  it("renders no deposits when there are no closed deposits", () => {
    mockUseDashboard.mockReturnValue({
      closedDeposits: [],
    });

    render(<CloseDeposits />);
    expect(screen.queryByText("Test Product closed")).not.toBeInTheDocument();
  });
});
