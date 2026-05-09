"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button className="card px-4 py-2 text-sm" onClick={() => setDark((v) => !v)}>
      {dark ? "Light rejim" : "Dark rejim"}
    </button>
  );
}
