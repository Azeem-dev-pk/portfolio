"use client";

import { useRef, useEffect, useState } from "react";

interface ProjectData {
  title: string;
  role: string;
  architecture: string;
  implementation: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const PROJECTS: ProjectData[] = [
  {
    title: "Enterprise School Platform & Full-Stack Hub",
    role: "Full-Stack Engineer",
    architecture:
      "Built a secure web infrastructure managing user role authorization, student lifecycle entries, and dynamic data collection workflows with role-based access control across three tiers.",
    implementation:
      "Leveraged Next.js Server Actions alongside automated Python background scripts to securely query, process, and mutate user records inside a MongoDB Atlas database, reducing data processing time by 40%.",
    tags: [
      "Next.js (App Router)",
      "TypeScript",
      "Python",
      "MongoDB",
      "Redux Toolkit",
      "Node.js",
    ],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "3D Immersive Web Interface",
    role: "Frontend Engineer",
    architecture:
      "Developed an interactive 3D product showcase using React Three Fiber with a physics-based interaction layer and gesture-driven camera controls for an immersive browsing experience.",
    implementation:
      "Achieved a 95+ Lighthouse Performance Score by executing aggressive route lazy loading and component code-splitting on heavy Canvas graphics modules, reducing initial bundle size by 62%.",
    tags: ["React", "React Three Fiber", "JavaScript", "Tailwind CSS", "Netlify"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Type-Safe Scalable System Architecture",
    role: "Full-Stack Engineer",
    architecture:
      "Engineered a modular SaaS boilerplate with monorepo structure, shared type definitions, and automated API contract validation across frontend and backend boundaries.",
    implementation:
      "Designed a strictly typed system architecture using TypeScript and Next.js, implementing reusable layout abstractions that reduced code duplication by over 30% and accelerated feature delivery by 25%.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Production-Ready Personal Studio Hub",
    role: "Frontend Engineer",
    architecture:
      "Created a centralized dashboard portal with real-time asset management, responsive data tables, and an optimized media delivery pipeline for digital content creators.",
    implementation:
      "Developed a fluid, responsive user dashboard built with component-driven design systems and optimized asset caching loops, achieving sub-100ms navigation transitions and seamless mobile responsiveness.",
    tags: ["React", "Next.js", "CSS Modules", "Netlify"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: ProjectData;
  index: number;
  isVisible: boolean;
}) {
  const delay = 100 + index * 150;

  return (
    <div
      className={`rounded-2xl border transition-all duration-700 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        background: "var(--color-card)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="p-6 md:p-8">
        {/* Role Badge */}
        <div className="mb-3 flex items-center gap-3">
          <span
            className="rounded-lg px-3 py-1 font-mono text-xs font-semibold"
            style={{
              background: "var(--color-card-alt)",
              color: "var(--color-accent)",
              border: "1px solid var(--color-border)",
            }}
          >
            {project.role}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-3 text-xl font-bold md:text-2xl"
          style={{ color: "var(--color-text)" }}
        >
          {project.title}
        </h3>

        {/* System Architecture */}
        <div className="mb-3">
          <span
            className="mb-1 block text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-muted)" }}
          >
            System Architecture
          </span>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {project.architecture}
          </p>
        </div>

        {/* Key Technical Implementation */}
        <div className="mb-5">
          <span
            className="mb-1 block text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-muted)" }}
          >
            Key Technical Implementation
          </span>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {project.implementation}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons - side by side as requested */}
        <div className="flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-btn text-sm"
          >
            Live Demo{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-btn text-sm"
          >
            View Code / Repo{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--color-bg)" }}
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
                Full-Stack Architecture
              </span>
            </span>
            <h2 className="section-heading">
              Production Shipments &amp;{" "}
              <span className="gradient-text">System Design</span>
            </h2>
            <p
              className="mt-3 max-w-2xl text-sm md:text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Every project below represents end-to-end engineering — from
              database schema design through to deployed, user-facing interfaces.
              Click through to inspect the full codebase.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
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
