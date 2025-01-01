import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomRouter from "../../components/CustomRouter";
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
      <CustomRouter>
        <Navbar />
      </CustomRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("renders Dashboard when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
    });
    render(
      <CustomRouter>
        <Navbar />
      </CustomRouter>
    );
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it("does not render Dashboard when user is not logged in", () => {
    render(
      <CustomRouter>
        <Navbar />
      </CustomRouter>
    );
    expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
  });

  it("renders user initials when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
    });
    render(
      <CustomRouter>
        <Navbar />
      </CustomRouter>
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("navigates to dashboard when Dashboard link is clicked", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
    });
    render(
      <CustomRouter>
        <Navbar />
      </CustomRouter>
    );
    const dashboardLink = screen.getByText(/Dashboard/i);
    fireEvent.click(dashboardLink);
    expect(window.location.pathname).toBe("/dashboard");
  });
});
