import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
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
});
