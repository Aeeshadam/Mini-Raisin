import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import CustomMemoryRouter from "../../components/CustomMemoryRouter";
import Navbar from "./index";

import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

describe("Navbar", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: null,
      signInWithGoogle: jest.fn(),
      signOutUser: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Navbar with Home link", () => {
    render(
      <CustomMemoryRouter>
        <Navbar />
      </CustomMemoryRouter>
    );
    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
  });

  it("renders Dashboard when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
    });
    render(
      <CustomMemoryRouter>
        <Navbar />
      </CustomMemoryRouter>
    );
    expect(
      screen.getByRole("link", { name: /Dashboard/i })
    ).toBeInTheDocument();
  });

  it("does not render Dashboard when user is not logged in", () => {
    render(
      <CustomMemoryRouter>
        <Navbar />
      </CustomMemoryRouter>
    );
    expect(
      screen.queryByRole("link", { name: /Dashboard/i })
    ).not.toBeInTheDocument();
  });

  it("renders user initials when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
    });
    render(
      <CustomMemoryRouter>
        <Navbar />
      </CustomMemoryRouter>
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("navigates to the Dashboard when Dashboard link is clicked", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
    });
    render(
      <CustomMemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
      </CustomMemoryRouter>
    );

    const dashboardLink = screen.getByRole("link", { name: /Dashboard/i });
    fireEvent.click(dashboardLink);

    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });
});
