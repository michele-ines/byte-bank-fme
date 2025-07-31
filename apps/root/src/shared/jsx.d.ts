import type * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "byte-footer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "data-theme"?: "public" | "private";
      };
    }
  }
}
