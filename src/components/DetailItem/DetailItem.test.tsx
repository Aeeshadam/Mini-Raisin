import { render, screen } from "@testing-library/react";
import DetailItem from "./index";

describe("DetailItem", () => {
  it("renders label and value correctly", () => {
    const label = "Test Label";
    const value = "Test Value";
    render(<DetailItem label={label} value={value} />);
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
    expect(screen.getByText(/test value/i)).toBeInTheDocument();
  });
});
