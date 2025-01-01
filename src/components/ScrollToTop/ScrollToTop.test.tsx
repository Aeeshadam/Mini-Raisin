import React from "react";
import { render } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import CustomRouter from "../../components/CustomRouter";
import ScrollToTop from "./index";

describe("ScrollToTop", () => {
  it("scrolls to top on route change", () => {
    window.scrollTo = jest.fn();

    render(
      <CustomRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </CustomRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
