"use client";

import { useRef, useEffect, useState } from "react";

export default function About() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
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
                About
              </span>
            </span>
            <h2 className="section-heading">
              Engineering the <span className="gradient-text">Full-Stack</span>{" "}
              Bridge
            </h2>
          </div>

          {/* Content Grid */}
          <div className="mt-10 grid gap-8 md:grid-cols-5 md:gap-12">
            {/* Bio Text */}
            <div
              className={`space-y-5 transition-all duration-700 delay-100 md:col-span-3 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <p
                className="text-base leading-relaxed md:text-lg"
                style={{ color: "var(--color-text)" }}
              >
                Leveraging a formal background in Software Engineering, I
                architect clean-code applications across the full stack. I
                eliminate backend-to-frontend disconnects by utilizing modern
                Next.js paradigms, structural type-safety, and Python
                microservices to build performant, data-driven software
                solutions.
              </p>
              <div
                className="flex items-center gap-3 rounded-xl border p-4"
                style={{
                  background: "var(--color-card-alt)",
                  borderColor: "var(--color-border)",
                }}
              >
                <span
                  className="flex h-3 w-3 rounded-full"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 0 10px var(--color-accent)",
                  }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Lahore, Pakistan{" "}
                  <span style={{ color: "var(--color-text)" }}>|</span>{" "}
                  <span style={{ color: "var(--color-accent)" }}>
                    🌍 Available for 4+ hours of daily synchronous overlap with
                    EST/GMT/CET teams.
                  </span>
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className={`space-y-4 transition-all duration-700 delay-200 md:col-span-2 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div
                className="rounded-xl border p-5"
                style={{
                  background: "var(--color-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                <h3
                  className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-accent)" }}
                >
                  Engineering Philosophy
                </h3>
                <ul className="space-y-3">
                  {[
                    "Type-safe by default — ship with confidence",
                    "Component-driven architecture that scales",
                    "Performance is a feature, not an afterthought",
                    "Clean code that your future self will thank you for",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <span
                        className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: "var(--color-accent)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
