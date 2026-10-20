import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("home page", () => {
  it("renders the FE-03 baseline message", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "FE-03 baseline" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The application scaffold is ready for the Settings Form assignment.",
      ),
    ).toBeInTheDocument();
  });
});
