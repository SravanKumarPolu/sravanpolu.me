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
});
