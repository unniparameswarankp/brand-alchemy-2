"use client";

import { useEffect, useState } from "react";

export default function FloatingToggleButton() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add("my-custom-style");
    } else {
      document.body.classList.remove("my-custom-style");
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((prev) => !prev)}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#a5b2a5] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#94a094] transition-all duration-300"
      aria-label="Toggle Style"
    >
      {enabled ? "✖" : "☼"}
    </button>
  );
}
