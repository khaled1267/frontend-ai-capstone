import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("home page", () => {
  it("renders the Settings page and all form fields", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByLabelText("Display Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Time Zone")).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Product Update Preferences" }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Send me occasional news about product improvements.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });
});
