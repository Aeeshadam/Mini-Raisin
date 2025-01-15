import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useDashboard } from "../../../contexts/DashboardContext";
import ActiveDeposits from "./index";
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

describe("ActiveDeposits", () => {
  const initialState = getMockState();

  beforeEach(() => {
    mockUseSelector.mockImplementation((selector) =>
      selector(initialState as RootState)
    );

    mockUseDashboard.mockReturnValue({
      activeDeposits: initialState.activeDeposits?.activeDeposits,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ActiveDeposits with a list of active deposits", () => {
    render(<ActiveDeposits />);
    expect(screen.getByTestId("active-deposits")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders no deposits when there are no active deposits", () => {
    mockUseDashboard.mockReturnValue({
      activeDeposits: [],
    });

    render(<ActiveDeposits />);
    expect(screen.queryByText("Test Product")).not.toBeInTheDocument();
  });
});
