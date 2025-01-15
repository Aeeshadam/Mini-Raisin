import { render, screen, fireEvent } from "@testing-library/react";
import { useNotification } from "../../contexts/NotificationContext";
import Notification from "./index";

jest.mock("../../contexts/NotificationContext", () => ({
  useNotification: jest.fn(),
}));

const mockUseNotification = useNotification as jest.Mock;

const setupMockNotification = (overrides = {}) => {
  mockUseNotification.mockReturnValue({
    message: "Hello",
    type: "",
    closeNotification: jest.fn(),
    ...overrides,
  });
};

describe("Notification component", () => {
  beforeEach(() => {
    setupMockNotification();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the notification and display message", () => {
    render(<Notification />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("should call closeNotification when button is clicked", () => {
    render(<Notification />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockUseNotification().closeNotification).toHaveBeenCalled();
  });

  it("should not render notification when message is empty", () => {
    setupMockNotification({ message: "" });
    render(<Notification />);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("should add correct classname when type is success", () => {
    setupMockNotification({ type: "success" });
    render(<Notification />);
    expect(screen.getByRole("alert")).toHaveClass("success");
  });

  it("should add correct classname when type is error", () => {
    setupMockNotification({ type: "error" });
    render(<Notification />);
    expect(screen.getByRole("alert")).toHaveClass("error");
  });
});
