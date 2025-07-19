import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Root from "./root.component";

describe("Root component", () => {
  it("should be in the document", () => {
    // The component is rendered, but it ignores the "name" prop
    const { getByText } = render(<Root name="Testapp" />);

    // 👇 Change this line to look for the correct text
    expect(getByText(/Footer/i)).toBeInTheDocument();
  });
});
