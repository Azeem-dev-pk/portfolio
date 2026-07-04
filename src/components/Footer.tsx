"use client";

import { scrollToSection } from "@/lib/utils";

const FOOTER_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-12"
      style={{
        background: "var(--color-card-alt)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="section-container">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-base font-bold"
                style={{
                  background: "var(--color-accent)",
                  color: "#ffffff",
                }}
              >
                X
              </span>
              <span
                className="text-base font-bold"
                style={{ color: "var(--color-text)" }}
              >
                Azeem<span style={{ color: "var(--color-accent)" }}>X</span>
              </span>
            </button>
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              Full-Stack Next.js, TypeScript, &amp; Python Engineer
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-medium transition-colors duration-200 hover:scale-105"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          className="mb-6 mt-8 border-t"
          style={{ borderColor: "var(--color-border)" }}
        />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            &copy; {year} AzeemX | Full-Stack Next.js, TypeScript, &amp; Python
            Engineer. All rights reserved.
          </p>

          {/* Social / Top */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-accent)",
              }}
              aria-label="Scroll to top"
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
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
