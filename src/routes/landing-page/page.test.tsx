import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "../../../tests/test-utilities";
import { content } from "./translations";
import Page from "./index.tsx";

describe("Landing Page", () => {
  it("renders request an invite button", () => {
    renderWithProvider(<Page />);

    expect(
      screen.getByRole("button", { name: content.page.request_invite_button })
    ).toBeInTheDocument();
  });

  // it("renders form on click of request an invite button", async () => {
  //   const user = userEvent.setup();

  //   renderWithProvider(<Page />);

  //   // expect(screen.queryByTestId(formModalTestId)).not.toBeInTheDocument();
  //   const nameInput = screen.queryByRole("textbox", {
  //     name: content.form.name,
  //   });
  //   expect(nameInput).not.toBeInTheDocument();

  //   const requestInviteButton = screen.getByRole("button", {
  //     name: content.page.request_invite_button,
  //   });

  //   await user.click(requestInviteButton);

  //   // const formModal = await screen.findByTestId("form-modal");
  //   // expect(formModal).toBeInTheDocument();
  //   const updatedNameInput = await screen.findByRole("textbox", {
  //     name: content.form.name,
  //   });
  //   expect(updatedNameInput).toBeInTheDocument();
  // });
});
