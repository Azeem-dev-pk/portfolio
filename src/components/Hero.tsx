"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { scrollToSection } from "@/lib/utils";

interface MetricItemProps {
  end: number;
  suffix: string;
  label: string;
}

function MetricItem({ end, suffix, label }: MetricItemProps) {
  const { countRef, formatted } = useCountUp({ end, suffix, duration: 2 });

  return (
    <div className="text-center">
      <span
        ref={countRef}
        className="block text-3xl font-bold md:text-4xl"
        style={{ color: "var(--color-accent)" }}
      >
        {formatted}
      </span>
      <span
        className="mt-1 block text-xs font-medium md:text-sm"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Background gradient orbs */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--color-success)" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section-container relative z-10 w-full">
        <div className="mx-auto max-w-4xl text-center">
          {/* Availability Badge */}
          <div
            className="mx-auto mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium opacity-0"
            style={{
              background: "var(--color-card-alt)",
              border: "1px solid var(--color-border)",
              color: "var(--color-accent)",
              animationDelay: "0.1s",
              animationFillMode: "forwards",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "var(--color-accent)",
                boxShadow: "0 0 8px var(--color-accent)",
              }}
            />
            Lahore, Pakistan &bull; Available for global remote collaboration
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in-up text-4xl font-extrabold leading-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <span style={{ color: "var(--color-text)" }}>Hi, I&apos;m </span>
            <span className="gradient-text">AzeemX</span>
            <br />
            <span
              className="mt-2 block text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Full-Stack Next.js, TypeScript, &amp; Python Engineer
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="animate-fade-in-up mx-auto mt-6 max-w-3xl text-base leading-relaxed opacity-0 md:text-lg"
            style={{
              color: "var(--color-text-secondary)",
              animationDelay: "0.4s",
              animationFillMode: "forwards",
            }}
          >
            Software Engineering graduate specializing in building scalable,
            production-grade web applications. Expert in unifying React
            ecosystems with Python backend microservices, robust API design, and
            server-side data lifecycles.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="accent-btn text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Explore Full-Stack Proof
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="outline-btn text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get In Touch
            </button>
          </div>

          {/* Metrics Grid */}
          <div
            className="animate-fade-in-up mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 rounded-2xl border p-6 opacity-0 md:gap-10 md:p-8"
            style={{
              background: "var(--color-card)",
              borderColor: "var(--color-border)",
              animationDelay: "0.8s",
              animationFillMode: "forwards",
            }}
          >
            <MetricItem end={1} suffix="+" label="Years Commercial Experience" />
            <MetricItem end={5} suffix="+" label="Shipped Web Applications" />
            <MetricItem end={3} suffix="+" label="Full-Stack &amp; API Apps" />
          </div>
        </div>
      </div>
    </section>
  );
}
