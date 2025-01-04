import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./index";
import { footerLinks } from "../../constants";

jest.mock("../../constants", () => ({
  footerLinks: [],
}));

describe("Footer", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders footer with links", () => {
    jest.mock("../../constants", () => ({
      footerLinks: [
        {
          id: "section1",
          links: [
            { id: "link1", title: "Link 1", url: "/link1" },
            { id: "link2", title: "Link 2", url: "/link2" },
          ],
        },
        {
          id: "section2",
          links: [
            { id: "link3", title: "Link 3", url: "/link3" },
            { id: "link4", title: "Link 4", url: "/link4" },
          ],
        },
      ],
    }));

    render(<Footer />);
    footerLinks.forEach((section) => {
      section.links.forEach((link) => {
        const linkElement = screen.getByRole("link", { name: link.title });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", link.url);
      });
    });
  });

  it("renders nothing if no footer links", () => {
    render(<Footer />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("handles section with no links", () => {
    jest.mock("../../constants", () => ({
      footerLinks: [
        {
          id: "section1",
          links: [],
        },
      ],
    }));

    render(<Footer />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText((content, element) => {
        return content.includes(currentYear.toString());
      })
    ).toBeInTheDocument();
  });
});
