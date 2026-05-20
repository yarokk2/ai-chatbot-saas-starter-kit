"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Чтобы избежать ошибок гидратации
  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-xl border border-gray-200 bg-white shadow-sm" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-xl border border-gray-200
        bg-white text-lg
        shadow-sm
        transition-all duration-300
        hover:scale-105 hover:shadow-md
        dark:border-white/10
        dark:bg-white/5
        dark:text-white
      "
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}