import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import CustomMemoryRouter from "../CustomMemoryRouter";
import ProtectedRoute from "./index";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

describe("ProtectedRoute", () => {
  it("redirects to / if user is not authenticated", () => {
    mockUseAuth.mockReturnValue({ user: null, authLoading: false });

    render(
      <CustomMemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </CustomMemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders children if user is authenticated", () => {
    mockUseAuth.mockReturnValue({
      user: { id: 1, name: "Test User" },
      authLoading: false,
    });

    render(
      <CustomMemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </CustomMemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("displays loading indicator when authLoading is true", () => {
    mockUseAuth.mockReturnValue({ user: null, authLoading: true });

    render(
      <CustomMemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </CustomMemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
