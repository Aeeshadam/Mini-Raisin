import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./index";

describe("ScrollToTop", () => {
  it("scrolls to top on route change", () => {
    window.scrollTo = jest.fn();

    render(
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </BrowserRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
