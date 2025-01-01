import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Notification from "./index";

describe("Notification component", () => {
  it("should render the notification and display message", () => {
    render(<Notification message="Hello" type="success" onClose={() => {}} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Notification message="Hello" type="success" onClose={onClose} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should render error notification", () => {
    render(<Notification message="Error" type="error" onClose={() => {}} />);
    expect(screen.getByRole("alert")).toHaveClass("error");
  });

  it("should render info notification", () => {
    render(<Notification message="Info" type="info" onClose={() => {}} />);
    expect(screen.getByRole("alert")).toHaveClass("info");
  });
});
