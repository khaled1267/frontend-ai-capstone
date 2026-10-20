import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import SettingsForm from "./settings-form";

afterEach(cleanup);

describe("settings form", () => {
  it("shows accessible validation errors and prevents invalid submission", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    const nameError = await screen.findByText("Enter your display name.");
    const emailError = screen.getByText("Enter a valid email address.");
    const timeZoneError = screen.getByText("Choose a time zone.");

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(timeZoneError).toBeInTheDocument();
    expect(nameError).toHaveAttribute("role", "alert");
    expect(emailError).toHaveAttribute("role", "alert");
    expect(timeZoneError).toHaveAttribute("role", "alert");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    expect(screen.getByLabelText("Display Name")).toHaveAttribute(
      "aria-describedby",
      "displayName-error",
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-describedby",
      "email-error",
    );
  });

  it("shows a demo confirmation after valid submission", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Display Name"), "Alex Morgan");
    await user.type(screen.getByLabelText("Email"), "alex@example.com");
    await user.selectOptions(screen.getByLabelText("Time Zone"), "Asia/Dhaka");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Settings submitted successfully for this demo.",
    );
  });
});
