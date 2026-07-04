"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="flex h-10 w-10 items-center justify-center rounded-xl border"
        style={{ borderColor: "var(--color-border)" }}
        disabled
      >
        <span className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-card)",
      }}
    >
      {/* Sun Icon (Light mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-5 w-5 transition-all duration-500"
        style={{
          color: "var(--color-accent)",
          opacity: theme === "dark" ? 0 : 1,
          transform: theme === "dark" ? "rotate(90deg) scale(0)" : "rotate(0) scale(1)",
        }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon Icon (Dark mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-5 w-5 transition-all duration-500"
        style={{
          color: "var(--color-accent)",
          opacity: theme === "dark" ? 1 : 0,
          transform: theme === "dark" ? "rotate(0) scale(1)" : "rotate(-90deg) scale(0)",
        }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Glow effect */}
      <span
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: "0 0 20px var(--color-glow)",
        }}
      />
    </button>
  );
}
