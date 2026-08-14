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

  test("renders production section", () => {
    render(<Work />);
    expect(screen.getByRole("heading", { name: "Production" })).toBeInTheDocument();
  });

  test("renders collapsible learning projects", () => {
    render(<Work />);
    expect(screen.getByText("Learning projects")).toBeInTheDocument();
  });

  test("renders client work section with Smart Training & School Management card", () => {
    render(<Work />);
    expect(screen.getByRole("heading", { name: "Client work" })).toBeInTheDocument();
    expect(
      screen.getByText("Smart Training & School Management")
    ).toBeInTheDocument();
    expect(screen.getByText("Client Demo · In Development")).toBeInTheDocument();

    const liveLink = screen
      .getAllByRole("link", { name: "Live demo" })
      .find(
        (link) =>
          link.getAttribute("href") ===
          "https://smart-training-school-management-de.vercel.app/"
      );
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(
      screen.getByAltText("Smart Training and School Management dashboard")
    ).toBeInTheDocument();
  });
});
