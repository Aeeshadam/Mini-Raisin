import { render, screen, fireEvent } from "@testing-library/react";
import { useNotification } from "../../contexts/NotificationContext";
import Notification from "./index";

jest.mock("../../contexts/NotificationContext", () => ({
  useNotification: jest.fn(),
}));

const mockUseNotification = useNotification as jest.Mock;

describe("Notification component", () => {
  beforeEach(() => {
    mockUseNotification.mockReturnValue({
      message: "Hello",
      type: "",
      closeNotification: jest.fn(),
    });
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
    expect(mockUseNotification().closeNotification).toHaveBeenCalledTimes(1);
  });

  it("should not render notification when message is empty", () => {
    mockUseNotification.mockReturnValue({
      message: "",
    });

    render(<Notification />);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("should add correct classname when type is success", () => {
    mockUseNotification.mockReturnValue({
      message: "Hello",
      type: "success",
      closeNotification: jest.fn(),
    });

    render(<Notification />);
    expect(screen.getByRole("alert")).toHaveClass("success");
  });

  it("should add correct classname when type is error", () => {
    mockUseNotification.mockReturnValue({
      message: "Hello",
      type: "error",
      closeNotification: jest.fn(),
    });

    render(<Notification />);
    expect(screen.getByRole("alert")).toHaveClass("error");
  });
});
