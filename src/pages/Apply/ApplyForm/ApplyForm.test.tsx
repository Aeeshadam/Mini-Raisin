import { render, screen, fireEvent } from "@testing-library/react";
import ApplyForm from "./index";
import { useApplyForm } from "../../../contexts/ApplyContext";

jest.mock("../../../contexts/ApplyContext", () => ({
  useApplyForm: jest.fn(),
}));

const mockUseApplyForm = useApplyForm as jest.Mock;

describe("ApplyForm component", () => {
  beforeEach(() => {
    mockUseApplyForm.mockReturnValue({
      depositAmount: "",
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ApplyForm with input and button", () => {
    render(<ApplyForm />);
    expect(screen.getByLabelText(/Enter Deposit Amount:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Submit Application/i })
    ).toBeInTheDocument();
  });

  it("calls handleInputChange when input value changes", () => {
    render(<ApplyForm />);

    fireEvent.change(screen.getByLabelText(/Enter Deposit Amount:/i), {
      target: { value: "2000" },
    });

    expect(mockUseApplyForm().handleInputChange).toHaveBeenCalled();
  });

  it("calls handleSubmit when form is submitted", () => {
    mockUseApplyForm.mockReturnValue({
      depositAmount: "1000",
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
    });
    render(<ApplyForm />);

    fireEvent.submit(screen.getByTestId("apply-form"));

    expect(mockUseApplyForm().handleSubmit).toHaveBeenCalled();
  });
});
