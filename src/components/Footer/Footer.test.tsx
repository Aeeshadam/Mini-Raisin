import { render, screen } from "@testing-library/react";
import Footer from "./index";
import { footerLinks } from "../../constants";
import { mockFooterLinks } from "../../mocks/constantsMock";

jest.mock("../../constants", () => ({
  footerLinks: [],
}));

describe("Footer", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("renders footer with links", () => {
    jest.mock("../../constants", () => ({
      footerLinks: mockFooterLinks,
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
    const thisYear = new Date().getFullYear();
    expect(
      screen.getByText((content, element) => {
        return content.includes(thisYear.toString());
      })
    ).toBeInTheDocument();
  });
});
