import React from "react";
import { render, screen } from "../../utils/test.util";
import { BrowserRouter } from "react-router-dom";
import Button from "./index";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders a NavLink when to prop is passed", () => {
    render(
      <BrowserRouter>
        <Button to="/home">Go home</Button>
      </BrowserRouter>
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets button type correctly", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("sets button className correctly", () => {
    render(<Button className="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("primary");
  });
});
