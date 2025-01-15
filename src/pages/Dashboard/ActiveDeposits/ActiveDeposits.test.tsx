import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { AnyAction } from "redux";
import ActiveDeposits from "./index";
import { useDashboard } from "../../../contexts/DashboardContext";
import { RootState } from "../../../store/store";

jest.mock("../../../contexts/DashboardContext", () => ({
  useDashboard: jest.fn(),
}));

const mockUseDashboard = useDashboard as jest.Mock;
const mockStore = configureStore<Partial<RootState>, AnyAction>([]);

describe("ActiveDeposits", () => {
  let store: MockStoreEnhanced<Partial<RootState>>;

  beforeEach(() => {
    store = mockStore({
      activeDeposits: {
        activeDeposits: [
          {
            id: "1",
            name: "Test Product 1",
            logo: "test1.png",
            balance: 5000,
            interestRate: 5,
            minimumDeposit: 1000,
            maximumDeposit: 10000,
            startDate: "2023-01-01",
            term: "3 months",
            link: "test1.com",
          },
          {
            id: "2",
            name: "Test Product 2",
            logo: "test2.png",
            balance: 10000,
            interestRate: 4,
            minimumDeposit: 2000,
            maximumDeposit: 20000,
            startDate: "2023-02-01",
            term: "3 months",
            link: "test1.com",
          },
        ],
        loading: false,
      },
      closedDeposits: {
        closedDeposits: [],
      },
    });

    mockUseDashboard.mockReturnValue({
      activeDeposits: store.getState().activeDeposits?.activeDeposits,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ActiveDeposits with a list of active deposits", () => {
    render(
      <Provider store={store}>
        <ActiveDeposits />
      </Provider>
    );

    expect(screen.getByText("Active Deposits")).toBeInTheDocument();
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });

  it("renders no deposits when there are no active deposits", () => {
    store = mockStore({
      activeDeposits: {
        activeDeposits: [],
        loading: false,
      },
      closedDeposits: {
        closedDeposits: [],
      },
    });

    mockUseDashboard.mockReturnValue({
      activeDeposits: store.getState().activeDeposits?.activeDeposits,
    });

    render(
      <Provider store={store}>
        <ActiveDeposits />
      </Provider>
    );

    expect(screen.queryByText("Test Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument();
  });
});
