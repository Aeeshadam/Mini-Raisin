import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OfferTable from "./index";
import { useAuth } from "../../../contexts/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import CustomMemoryRouter from "../../../components/CustomMemoryRouter";

jest.mock("../../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../../contexts/NotificationContext", () => ({
  useNotification: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => jest.fn()),
}));

jest.mock("../../../data/products.json", () => [
  {
    id: "1",
    name: "Product 1",
    interestRate: 5,
    minimumDeposit: 100,
    maximumDeposit: 1000,
    logo: "logo1.png",
    term: "1 year",
  },
]);

const mockUseAuth = useAuth as jest.Mock;
const mockUseNotification = useNotification as jest.Mock;
const mockUseNavigate = useNavigate as jest.Mock;

describe("OfferTable", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { uid: "123" } });
    mockUseNotification.mockReturnValue({ showNotification: jest.fn() });
    mockUseNavigate.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders OfferTable with complete details", () => {
    render(
      <CustomMemoryRouter>
        <OfferTable />
      </CustomMemoryRouter>
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("5.00%")).toBeInTheDocument();
    expect(screen.getByText("1 year")).toBeInTheDocument();
    expect(screen.getByText("£100.00")).toBeInTheDocument();
    expect(screen.getByText("£1,000.00")).toBeInTheDocument();
  });

  it("navigates to apply page when apply button is clicked", () => {
    const navigateMock = jest.fn();
    mockUseNavigate.mockReturnValue(navigateMock);
    render(
      <CustomMemoryRouter>
        <OfferTable />
      </CustomMemoryRouter>
    );
    const applyButton = screen.getByText("Apply");
    expect(applyButton).toBeInTheDocument();
    fireEvent.click(applyButton);
    expect(navigateMock).toHaveBeenCalledWith("/apply/1");
  });

  it("shows notification when user is not logged in", () => {
    mockUseAuth.mockReturnValue({ user: null });
    render(
      <CustomMemoryRouter>
        <OfferTable />
      </CustomMemoryRouter>
    );
    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);
    expect(mockUseNotification().showNotification).toHaveBeenCalledWith(
      "Please log in with google authentication to apply for a product",
      "info"
    );
  });
});
