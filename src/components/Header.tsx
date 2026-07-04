"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { scrollToSection } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Technical Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMobileOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? "var(--color-bg)" : "transparent",
        borderBottom: isScrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="section-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2"
            aria-label="Scroll to top"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg font-mono text-lg font-bold"
              style={{
                background: "var(--color-accent)",
                color: "#ffffff",
              }}
            >
              X
            </span>
            <span
              className="hidden text-lg font-bold sm:block"
              style={{ color: "var(--color-text)" }}
            >
              Azeem<span style={{ color: "var(--color-accent)" }}>X</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  color: "var(--color-text-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-accent)";
                  e.currentTarget.style.background = "var(--color-card-alt)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 sm:flex"
              style={{
                background: "var(--color-accent)",
                color: "#ffffff",
                boxShadow: "0 0 15px var(--color-glow)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Download CV
            </a>
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              {isMobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className="border-t md:hidden"
          style={{
            background: "var(--color-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="section-container py-4">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-accent)";
                    e.currentTarget.style.background = "var(--color-card-alt)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download
                className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:hidden"
                style={{
                  background: "var(--color-accent)",
                  color: "#ffffff",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Download CV
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
