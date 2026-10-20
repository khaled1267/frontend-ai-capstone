import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import SettingsForm from "./settings-form";

afterEach(cleanup);

describe("settings form", () => {
  it("shows validation errors for invalid required fields", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(
      await screen.findByText("Enter at least 2 characters."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enter a valid email address."),
    ).toBeInTheDocument();
    expect(screen.getByText("Choose a time zone.")).toBeInTheDocument();
  });

  it("accepts valid settings and shows a session-only confirmation", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Display name"), "Alex Morgan");
    await user.type(screen.getByLabelText("Email address"), "alex@example.com");
    await user.selectOptions(screen.getByLabelText("Time zone"), "Asia/Dhaka");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(
      await screen.findByRole("status"),
    ).toHaveTextContent("Settings saved for this session.");
  });

  it("clears the confirmation when a saved setting is changed", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Display name"), "Alex Morgan");
    await user.type(screen.getByLabelText("Email address"), "alex@example.com");
    await user.selectOptions(screen.getByLabelText("Time zone"), "Asia/Dhaka");
    await user.click(screen.getByRole("button", { name: "Save changes" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Settings saved for this session.",
    );

    await user.type(screen.getByLabelText("Display name"), " Jr");

    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});
