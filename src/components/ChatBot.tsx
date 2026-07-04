"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ============================================================
// Types
// ============================================================

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

// ============================================================
// Constants
// ============================================================

const SUGGESTED_QUESTIONS = [
  "What technologies does Azeem work with?",
  "Tell me about his experience",
  "What projects has he built?",
  "Is he available for remote work?",
  "How can I contact him?",
  "What is AzeemX's tech stack?",
];

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey there! 👋 I'm AzeemX's AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch. I'm here to help!",
  timestamp: new Date(),
};

// ============================================================
// Helpers
// ============================================================

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

function formatMessage(content: string): string {
  // Simple inline markdown rendering: bold, italic, links, line breaks
  return content
    .replace(/### (.*?)$/gm, "<strong>$1</strong>")
    .replace(/## (.*?)$/gm, "<strong>$1</strong>")
    .replace(/# (.*?)$/gm, "<strong>$1</strong>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--color-accent);text-decoration:underline">$1</a>'
    )
    .replace(/\n/g, "<br/>");
}

// ============================================================
// Chat Message Bubble
// ============================================================

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-4`}>
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={
          isUser
            ? {
                background: "var(--color-accent)",
                color: "#ffffff",
                borderBottomRightRadius: "4px",
              }
            : {
                background: "var(--color-card-alt)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                borderBottomLeftRadius: "4px",
              }
        }
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
          />
        )}
        <span
          className="mt-1 block text-[10px] opacity-50"
          style={{ textAlign: isUser ? "right" : "left" }}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Typing Indicator
// ============================================================

function TypingIndicator() {
  return (
    <div className="flex justify-start px-4">
      <div
        className="flex items-center gap-1 rounded-2xl rounded-bl px-4 py-3"
        style={{
          background: "var(--color-card-alt)",
          border: "1px solid var(--color-border)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block h-2 w-2 rounded-full"
            style={{
              background: "var(--color-accent)",
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Main ChatBot Component
// ============================================================

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Send message
  async function handleSend(overrideText?: string) {
    const text = (overrideText || input).trim();
    if (!text || isLoading) return;

    setInput("");
    setError(null);

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMsg);

      // Show error as assistant message
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: `⚠️ ${errorMsg}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Enter to send (Shift+Enter for newline)
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // Auto-resize textarea
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  }

  return (
    <>
      {/* ===== FLOATING TOGGLE BUTTON ===== */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open AI assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "var(--color-accent)",
          color: "#ffffff",
          boxShadow: `0 4px 24px var(--color-glow), 0 0 0 0 rgba(16,185,129,0.3)`,
          animation: isOpen ? "none" : "pulse 2s ease-in-out infinite",
        }}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.88.52 3.63 1.42 5.13L2 22l5.13-1.42C8.37 21.48 10.12 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 11H9v-2h2v2zm4 0h-2v-2h2v2z" />
          </svg>
        )}
      </button>

      {/* ===== BADGE (unread indicator) ===== */}
      {!isOpen && (
        <span
          className="fixed bottom-[88px] right-3 z-50 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold shadow-lg"
          style={{
            background: "var(--color-card)",
            color: "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 0 6px var(--color-accent)",
            }}
          />
          Ask AI about AzeemX
        </span>
      )}

      {/* ===== CHAT PANEL ===== */}
      <div
        ref={panelRef}
        className="fixed bottom-24 right-6 z-50 flex w-[380px] flex-col overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 md:w-[420px]"
        style={{
          height: isOpen ? "min(600px, 80vh)" : "0px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          pointerEvents: isOpen ? "auto" : "none",
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          transformOrigin: "bottom right",
        }}
      >
        {/* ===== HEADER ===== */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{
            background: "var(--color-card-alt)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl font-mono text-sm font-bold"
              style={{
                background: "var(--color-accent)",
                color: "#ffffff",
              }}
            >
              AI
            </span>
            <div>
              <h3 className="text-sm font-bold" style={{ color: "var(--color-text)" }}>
                AzeemX Assistant
              </h3>
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 0 6px var(--color-accent)",
                  }}
                />
                <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                  AI-powered
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setMessages([WELCOME_MESSAGE]);
                setError(null);
              }}
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
              aria-label="Clear conversation"
              title="New conversation"
              style={{ color: "var(--color-text-muted)" }}
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
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
              aria-label="Close chat"
              style={{ color: "var(--color-text-muted)" }}
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ===== MESSAGES ===== */}
        <div
          className="flex-1 overflow-y-auto py-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((msg) => (
            <div key={msg.id} className="mb-3">
              <MessageBubble message={msg} />
            </div>
          ))}

          {isLoading && (
            <div className="mb-3">
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />

          {/* Suggested questions (show when only welcome message) */}
          {messages.length === 1 && !isLoading && (
            <div className="mt-4 px-4">
              <p
                className="mb-3 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                Suggested questions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: "var(--color-card-alt)",
                      color: "var(--color-text-secondary)",
                      border: "1px solid var(--color-border)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-accent)";
                      e.currentTarget.style.color = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===== INPUT ===== */}
        <div
          className="px-4 py-3"
          style={{
            borderTop: "1px solid var(--color-border)",
            background: "var(--color-card-alt)",
          }}
        >
          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows={1}
                disabled={isLoading}
                className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  background: "var(--color-card)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                  maxHeight: "120px",
                }}
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-40"
              style={{
                background: input.trim() ? "var(--color-accent)" : "var(--color-border)",
                color: input.trim() ? "#ffffff" : "var(--color-text-muted)",
              }}
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p
            className="mt-1.5 text-center text-[10px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            AI responses are generated — verify critical details with Azeem directly.
          </p>
        </div>
      </div>
    </>
  );
}
