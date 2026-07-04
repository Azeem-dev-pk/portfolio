/**
 * Merges class names, filtering out falsy values.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a date string for display.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);
}

/**
 * Smoothly scrolls to an element by ID.
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/**
 * Mailto link generator with pre-filled subject.
 */
export function generateMailtoHref(
  email: string,
  subject?: string,
  body?: string
): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${email}?${params.toString()}`;
}
