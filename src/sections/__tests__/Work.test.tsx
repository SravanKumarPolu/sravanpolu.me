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
    expect(screen.getByText("projects")).toBeInTheDocument();
  });

  test("renders production work grid", () => {
    render(<Work />);
    expect(screen.getByText("Production work")).toBeInTheDocument();
  });

  test("renders collapsible learning projects", () => {
    render(<Work />);
    expect(screen.getByText("Learning & UI exercises")).toBeInTheDocument();
  });
});
