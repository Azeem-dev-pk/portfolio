"use client";

import { useRef, useEffect, useState } from "react";

const EXPERIENCE_DATA = {
  role: "Full-Stack Developer / Frontend Engineer",
  period: "2025 - Present",
  company: "Bitcode (Onsite, Lahore, Pakistan)",
  bullets: [
    "Engineered production-ready full-stack applications utilizing Next.js Server Components (RSC) and Server Actions, reducing client-side JavaScript payloads and improving Time-to-Interactive by over 35%.",
    "Designed and implemented modular, reusable atomic components with Tailwind CSS, accelerating frontend sprint velocity by 40% and ensuring cross-browser UI parity across Chrome, Firefox, and Safari.",
    "Optimized REST API layers, route handlers, and backend communication workflows using TypeScript and Python to efficiently handle dynamic data mutations and reduce network latency by 28%.",
    "Managed automated CI/CD deployments over Vercel and Netlify infrastructures, enforcing strict environment variable security rules and achieving zero-downtime deployments across staging and production environments.",
  ],
  techTags: [
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "REST APIs",
    "MongoDB",
    "Vercel",
    "Netlify",
  ],
};

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--color-card-alt)" }}
    >
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          {/* Section Label */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="section-label">
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-6" style={{ background: "var(--color-accent)" }} />
                Professional Journey
              </span>
            </span>
            <h2 className="section-heading">
              Where I&apos;ve{" "}
              <span className="gradient-text">Engineered</span>
            </h2>
          </div>

          {/* Timeline Card */}
          <div
            className={`relative mt-10 transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Timeline line */}
            <div
              className="absolute left-0 top-0 hidden h-full w-0.5 md:block"
              style={{ background: "var(--color-border)" }}
            />

            <div
              className="relative rounded-2xl border p-6 md:ml-8 md:p-8"
              style={{
                background: "var(--color-card)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[2.35rem] top-8 hidden h-4 w-4 rounded-full border-2 md:block"
                style={{
                  background: "var(--color-accent)",
                  borderColor: "var(--color-bg)",
                  boxShadow: "0 0 0 3px var(--color-accent)",
                }}
              />

              {/* Header */}
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3
                    className="text-xl font-bold md:text-2xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {EXPERIENCE_DATA.role}
                  </h3>
                  <p
                    className="mt-1 text-sm font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {EXPERIENCE_DATA.company}
                  </p>
                </div>
                <span
                  className="flex-shrink-0 rounded-lg px-3 py-1 font-mono text-xs font-semibold"
                  style={{
                    background: "var(--color-card-alt)",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {EXPERIENCE_DATA.period}
                </span>
              </div>

              {/* Bullets */}
              <ul className="mb-6 space-y-4">
                {EXPERIENCE_DATA.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed md:text-base"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-sm"
                      style={{ background: "var(--color-accent)" }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_DATA.techTags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
