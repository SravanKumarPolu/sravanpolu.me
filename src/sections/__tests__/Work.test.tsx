import React from "react";
import { render, screen } from "@testing-library/react";
import Work from "../Work";

jest.mock("../../hooks/useScrollAnimation", () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    inView: true,
  }),
}));

describe("Work Section", () => {
  test("renders work section with title", () => {
    render(<Work />);
    expect(screen.getByText("Selected")).toBeInTheDocument();
    expect(screen.getAllByText("projects").length).toBeGreaterThan(0);
  });

  test("renders flagship projects section", () => {
    render(<Work />);
    expect(screen.getByRole("heading", { name: "Flagship projects" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "More products" })).toBeInTheDocument();
  });

  test("does not render a request-case-studies CTA", () => {
    render(<Work />);
    expect(screen.queryByText(/request case studies/i)).not.toBeInTheDocument();
  });

  test("renders flagship SKR E-Commerce card with GitHub link", () => {
    render(<Work />);
    expect(screen.getByText("SKR E-Commerce")).toBeInTheDocument();
    const githubLink = screen
      .getAllByRole("link", { name: /github/i })
      .find((link) => link.getAttribute("href")?.startsWith("https://github.com/"));
    expect(githubLink).toBeInTheDocument();
  });

  test("renders collapsible learning projects", () => {
    render(<Work />);
    expect(screen.getByText("Learning projects")).toBeInTheDocument();
  });

  test("renders flagship Smart Training & School Management demo card with honest demo labelling", () => {
    render(<Work />);
    expect(
      screen.getByText("Smart Training & School Management")
    ).toBeInTheDocument();
    expect(screen.getByText("Client Demo · In Development")).toBeInTheDocument();

    const liveLink = screen
      .getAllByRole("link", { name: /view live/i })
      .find(
        (link) =>
          link.getAttribute("href") ===
          "https://smart-training-school-management-de.vercel.app/"
      );
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");

    const detailsButton = screen
      .getAllByRole("button", { name: /view details/i })
      .find(() => true);
    expect(detailsButton).toBeInTheDocument();

    expect(
      screen.getByAltText("Smart Training and School Management dashboard")
    ).toBeInTheDocument();
  });
});
