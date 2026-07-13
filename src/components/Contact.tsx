"use client";

import { useRef, useEffect, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Your name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Your email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.subject.trim()) {
      newErrors.subject = "A subject helps me route your message";
    }
    if (!form.message.trim()) {
      newErrors.message = "Your message can't be empty";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Please include at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

try {
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );

  setIsSubmitted(true);
  setForm(INITIAL_FORM);
} catch (error) {
  console.error(error);
  alert("Failed to send message.");
} finally {
  setIsSubmitting(false);
}

    setTimeout(() => setIsSubmitted(false), 5000);
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on type
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          {/* Section Label */}
          <div
            className={`text-center transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="section-label">
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-6" style={{ background: "var(--color-accent)" }} />
                Contact
              </span>
            </span>
            <h2 className="section-heading">
              Let&apos;s collaborate on your next big{" "}
              <span className="gradient-text">engineering requirement</span>
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-sm md:text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Whether you need a full-stack architect, a type-safe backend, or a
              high-performance frontend — I&apos;m one message away.
            </p>
          </div>

          {/* Contact Grid */}
          <div
            className={`mt-12 grid gap-8 md:grid-cols-5 transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Direct Contact Info */}
            <div className="space-y-6 md:col-span-2">
              <div
                className="rounded-2xl border p-6"
                style={{
                  background: "var(--color-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                <h3
                  className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-accent)" }}
                >
                  Direct Channels
                </h3>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: "var(--color-card-alt)",
                        color: "var(--color-accent)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Email
                      </p>
                      <a
                        href="mailto:azeemshahzad7668@gmail.com"
                        className="text-sm font-medium transition-colors hover:underline"
                        style={{ color: "var(--color-accent)" }}
                      >
                        azeemshahzad7668@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: "var(--color-card-alt)",
                        color: "var(--color-accent)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Location
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        Lahore, Pakistan
                        <br />
                        <span style={{ color: "var(--color-accent)" }}>
                          Remote Friendly
                        </span>
                        <span
                          className="ml-1"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          (Global async)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div
              className="rounded-2xl border p-6 md:col-span-3 md:p-8"
              style={{
                background: "var(--color-card)",
                borderColor: "var(--color-border)",
              }}
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{
                      background: "var(--color-card-alt)",
                      color: "var(--color-accent)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-8 w-8"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--color-text)" }}
                  >
                    Message sent successfully!
                  </h3>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{
                          background: "var(--color-card-alt)",
                          borderColor: errors.name
                            ? "#ef4444"
                            : "var(--color-border)",
                          color: "var(--color-text)",
                        }}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{
                          background: "var(--color-card-alt)",
                          borderColor: errors.email
                            ? "#ef4444"
                            : "var(--color-border)",
                          color: "var(--color-text)",
                        }}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      placeholder="Full-Stack Collaboration Inquiry"
                      className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                      style={{
                        background: "var(--color-card-alt)",
                        borderColor: errors.subject
                          ? "#ef4444"
                          : "var(--color-border)",
                        color: "var(--color-text)",
                      }}
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Tell me about your project, timeline, and how I can help..."
                      className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                      style={{
                        background: "var(--color-card-alt)",
                        borderColor: errors.message
                          ? "#ef4444"
                          : "var(--color-border)",
                        color: "var(--color-text)",
                      }}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="accent-btn w-full justify-center text-sm disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
