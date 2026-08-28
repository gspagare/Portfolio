"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg" noValidate={false}>
      <div>
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
        />
      </div>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg font-semibold text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
        style={{ background: "var(--gradient-primary)" }}
      >
        {status === "loading" && (
          <svg
            className="w-4 h-4 animate-spin text-white"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/25">
              <svg
                className="w-3 h-3 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <p className="text-sm text-emerald-400">
              Message sent! I&apos;ll get back to you soon.
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/25">
              <svg
                className="w-3 h-3 text-red-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              </svg>
            </span>
            <p className="text-sm text-red-400">
              Failed to send. Try emailing me directly.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}