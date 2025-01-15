import { render } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import CustomMemoryRouter from "../../components/CustomMemoryRouter";
import ScrollToTop from "./index";

describe("ScrollToTop", () => {
  it("scrolls to top on route change", () => {
    window.scrollTo = jest.fn();

    render(
      <CustomMemoryRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </CustomMemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
