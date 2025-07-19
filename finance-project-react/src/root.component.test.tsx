import { render, screen } from "@testing-library/react";
import Root from "./root.component";

describe("Root component", () => {
  it("renders the main heading", () => {
    render(<Root name="Testapp" />);
    // semantic query by role + accessible name
    expect(
      screen.getByRole("heading", { name: /Main Finance Bank React/i })
    ).toBeInTheDocument();
  });
});
