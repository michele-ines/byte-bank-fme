import { useState } from "react";
import { Widgets } from "@mui/icons-material";
import WidgetSettingsModal from "./widget-settings-modal";

export default function WidgetPreferencesButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-byte-color-dash shadow-sm cursor-pointer"
        style={{ backgroundColor: "var(--byte-color-dash)" }}
      >
        <Widgets />
        Personalizar Widgets
      </button>

      <WidgetSettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
