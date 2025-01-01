import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogInButton from "./index";
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

  it("renders Log In button when user is not logged in", () => {
    render(
      <BrowserRouter>
        <LogInButton />
      </BrowserRouter>
    );
    expect(screen.getByText(/Log In with Google/i)).toBeInTheDocument();
  });

  it("initiates login when Log In button is clicked", () => {
    render(
      <BrowserRouter>
        <LogInButton />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/Log In with Google/i));
    expect(mockUseAuth).toHaveBeenCalled();
  });

  it("renders  Log Out button when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
    });
    render(
      <BrowserRouter>
        <LogInButton />
      </BrowserRouter>
    );

    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
  });

  it("logs out when Log Out button is clicked", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
      signOutUser: jest.fn(),
    });
    render(
      <BrowserRouter>
        <LogInButton />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/Log Out/i));
    expect(mockUseAuth().signOutUser).toHaveBeenCalled();
  });
});
