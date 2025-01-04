import { render, screen } from "@testing-library/react";
import Hero from "./index";
import { useAuth } from "../../../contexts/AuthContext";
import CustomMemoryRouter from "../../../components/CustomMemoryRouter";

jest.mock("../../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

describe("Hero", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { displayName: "John Doe" },
      authLoading: false,
      signInWithGoogle: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders dashboard button when user is logged in", () => {
    render(
      <CustomMemoryRouter>
        <Hero />
      </CustomMemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /go to page/i })
    ).toBeInTheDocument();
  });

  it("renders login button when user is not logged in", () => {
    mockUseAuth.mockReturnValue({
      user: null,
    });

    render(
      <CustomMemoryRouter>
        <Hero />
      </CustomMemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /log in with google/i })
    ).toBeInTheDocument();
  });
});
