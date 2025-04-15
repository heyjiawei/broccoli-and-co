import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { content } from "./translations";
import RequestEmailForm from "./form.component";

describe("RequestEmailForm", () => {
  it("renders RequestEmailForm input fields", () => {
    render(<RequestEmailForm onSubmit={() => {}} isPending={false} />);

    // const nameInput = screen.getAllByRole("name");
    const nameInput = screen.getByRole("textbox", { name: content.form.name });
    const emailInput = screen.getByRole("textbox", {
      name: content.form.email,
    });
    const confirmEmailInput = screen.getByRole("textbox", {
      name: content.form.confirm_email,
    });
    const sendButton = screen.getByRole("button", { name: content.form.send });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(confirmEmailInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  describe("Correct Inputs", () => {
    it("calls onSubmit callback with form inputs", async () => {
      const user = userEvent.setup();
      const mockSubmitCallback = vi.fn((data) => data);
      const expected = {
        name: "bun",
        email: "bun@world.co",
      };

      render(
        <RequestEmailForm onSubmit={mockSubmitCallback} isPending={false} />
      );

      const nameInput = screen.getByRole("textbox", {
        name: content.form.name,
      });
      const emailInput = screen.getByRole("textbox", {
        name: content.form.email,
      });
      const confirmEmailInput = screen.getByRole("textbox", {
        name: content.form.confirm_email,
      });
      const sendButton = screen.getByRole("button", {
        name: content.form.send,
      });

      expect(sendButton).toBeDisabled();

      await user.type(nameInput, expected.name);
      await user.type(emailInput, expected.email);
      await user.type(confirmEmailInput, expected.email);

      expect(sendButton).not.toBeDisabled();

      await user.click(sendButton);

      expect(mockSubmitCallback).toHaveBeenCalledWith(expected);
    });
  });

  describe("Error Inputs", () => {
    it("show validation error message on name < 3 characters", async () => {
      const user = userEvent.setup();
      render(<RequestEmailForm onSubmit={() => {}} isPending={false} />);

      const nameInput = screen.getByRole("textbox", {
        name: content.form.name,
      });

      await user.type(nameInput, "bu");
      await user.tab();

      const errorMessage = await screen.findByText(
        "'name' must be at least 3 characters"
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("show validation error message on incorrect email", async () => {
      const user = userEvent.setup();
      render(<RequestEmailForm onSubmit={() => {}} isPending={false} />);

      const emailInput = screen.getByRole("textbox", {
        name: content.form.email,
      });

      await user.type(emailInput, "bun@world.c");
      await user.tab();

      const errorMessage = await screen.findByText(
        "'email' is not a valid email"
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("show validation error message on incorrect confirm email", async () => {
      const user = userEvent.setup();
      render(<RequestEmailForm onSubmit={() => {}} isPending={false} />);

      const confirmEmailInput = screen.getByRole("textbox", {
        name: content.form.confirm_email,
      });

      await user.type(confirmEmailInput, "bun@world.c");
      await user.tab();

      const errorMessage = await screen.findByText(
        "The new email that you entered do not match!"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
