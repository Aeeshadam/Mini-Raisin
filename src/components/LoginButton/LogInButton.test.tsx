import { render, screen, fireEvent } from "@testing-library/react";
import CustomMemoryRouter from "../../components/CustomMemoryRouter";
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
      <CustomMemoryRouter>
        <LogInButton />
      </CustomMemoryRouter>
    );
    expect(
      screen.getByRole("button", { name: /Log In with Google/i })
    ).toBeInTheDocument();
  });

  it("initiates login when Log In button is clicked", () => {
    render(
      <CustomMemoryRouter>
        <LogInButton />
      </CustomMemoryRouter>
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Log In with Google/i })
    );
    expect(mockUseAuth().signInWithGoogle).toHaveBeenCalled();
  });

  it("renders  Log Out button when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
    });
    render(
      <CustomMemoryRouter>
        <LogInButton />
      </CustomMemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /Log Out/i })
    ).toBeInTheDocument();
  });

  it("logs out when Log Out button is clicked", () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
      signOutUser: jest.fn(),
    });
    render(
      <CustomMemoryRouter>
        <LogInButton />
      </CustomMemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Log Out/i }));
    expect(mockUseAuth().signOutUser).toHaveBeenCalled();
  });
});
