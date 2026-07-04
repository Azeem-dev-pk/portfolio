"use client";

import { useRef, useEffect, useState } from "react";

interface SkillCategory {
  title: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & Core Frameworks",
    skills: [
      "React",
      "Next.js (App Router / Pages)",
      "TypeScript",
      "JavaScript",
      "Python",
      "FastAPI",
    ],
  },
  {
    title: "Data Lifecycle & Backend Mechanics",
    skills: [
      "Next.js Server Actions",
      "Python Backend Scripts",
      "MongoDB Integration",
      "REST APIs",
      "Axios",
      "Redux Toolkit",
      "Context API",
    ],
  },
  {
    title: "UI Systems Engineering",
    skills: [
      "Responsive Architecture",
      "Atomic Component Design",
      "Figma-to-Code Systems",
      "Tailwind CSS",
    ],
  },
  {
    title: "DevOps & Tooling",
    skills: [
      "Git",
      "GitHub Version Control",
      "Netlify",
      "Vercel Production Deployment",
      "VS Code",
      "Figma",
    ],
  },
];

function SkillCategoryCard({
  category,
  index,
  isVisible,
}: {
  category: SkillCategory;
  index: number;
  isVisible: boolean;
}) {
  const delay = 100 + index * 150;

  return (
    <div
      className={`rounded-2xl border p-6 transition-all duration-700 md:p-8 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        background: "var(--color-card)",
        borderColor: "var(--color-border)",
      }}
    >
      <h3
        className="mb-5 font-mono text-sm font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-accent)" }}
      >
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-px w-4"
            style={{ background: "var(--color-accent)" }}
          />
          {category.title}
        </span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="tech-tag px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-105 hover:border-emerald-500/50"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
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
      id="skills"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--color-card-alt)" }}
    >
      <div className="section-container">
        <div className="mx-auto max-w-5xl">
          {/* Section Label */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="section-label">
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-6" style={{ background: "var(--color-accent)" }} />
                Technical Expertise Directory
              </span>
            </span>
            <h2 className="section-heading">
              The <span className="gradient-text">Full Arsenal</span>
            </h2>
            <p
              className="mt-3 max-w-2xl text-sm md:text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              A comprehensive map of the languages, frameworks, systems, and
              tooling I use to ship production-grade software end-to-end.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SKILL_CATEGORIES.map((category, index) => (
              <SkillCategoryCard
                key={category.title}
                category={category}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
