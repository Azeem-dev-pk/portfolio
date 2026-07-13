import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";
import "./globals.css";

export const metadata: Metadata = {
  title: "AzeemX | Full-Stack Next.js, TypeScript & Python Engineer",
  description:
    "Software Engineering graduate specializing in building scalable, production-grade web applications. Expert in unifying React ecosystems with Python backend microservices, robust API design, and server-side data lifecycles.",
  keywords: [
    "Next.js Developer",
    "TypeScript Engineer",
    "Python Backend",
    "Full-Stack Developer",
    "React Developer",
    "Remote Developer Pakistan",
    "AzeemX",
    "Azeem Shahzad",
  ],
  openGraph: {
    title: "AzeemX | Full-Stack Engineer",
    description:
      "Full-Stack Next.js, TypeScript & Python Engineer. Building scalable, production-grade web applications.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Additional metadata properties can be added here as needed
  // manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
