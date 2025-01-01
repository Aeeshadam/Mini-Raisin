import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { AnyAction } from "@reduxjs/toolkit";
import ClosedDeposits from "./index";
import { useDashboard } from "../../../contexts/DashboardContext";
import { RootState } from "../../../store/store";

jest.mock("../../../contexts/DashboardContext", () => ({
  useDashboard: jest.fn(),
}));

const mockUseDashboard = useDashboard as jest.Mock;
const mockStore = configureStore<Partial<RootState>, AnyAction>([]);

describe("ClosedDeposits", () => {
  let store: MockStoreEnhanced<Partial<RootState>, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      activeDeposits: {
        activeDeposits: [],
        loading: false,
      },
      closedDeposits: {
        closedDeposits: [
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
            interestEarned: 100,
          },
        ],
      },
    });

    mockUseDashboard.mockReturnValue({
      closedDeposits: store.getState().closedDeposits?.closedDeposits,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ClosedDeposits with a list of closed deposits", () => {
    render(
      <Provider store={store}>
        <ClosedDeposits />
      </Provider>
    );

    expect(screen.getByText("Closed Deposits")).toBeInTheDocument();
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
  });

  it("renders no deposits when there are no closed deposits", () => {
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
      closedDeposits: store.getState().closedDeposits?.closedDeposits,
    });

    render(
      <Provider store={store}>
        <ClosedDeposits />
      </Provider>
    );

    expect(screen.getByText("Closed Deposits")).toBeInTheDocument();
    expect(screen.queryByText("Test Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument();
  });
});
