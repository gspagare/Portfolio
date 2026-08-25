"use client";

import { useState, useEffect, type FormEvent } from "react";

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

function getInitialAuth(): { authenticated: boolean; password: string } {
  if (typeof window === "undefined")
    return { authenticated: false, password: "" };
  const stored = sessionStorage.getItem("submissions_auth");
  if (stored) return { authenticated: true, password: stored };
  return { authenticated: false, password: "" };
}

export default function SubmissionsPage() {
  const initial = getInitialAuth();
  const [password, setPassword] = useState(initial.password);
  const [authenticated, setAuthenticated] = useState(initial.authenticated);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doFetch = async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submissions", {
        headers: { authorization: `Bearer ${pw}` },
      });
      if (res.status === 401) {
        setError("Wrong password");
        setAuthenticated(false);
        sessionStorage.removeItem("submissions_auth");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setSubmissions(data.submissions || []);
      setAuthenticated(true);
      sessionStorage.setItem("submissions_auth", pw);
    } catch {
      setError("Failed to load");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!authenticated) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/submissions", {
          headers: { authorization: `Bearer ${password}` },
        });
        if (cancelled) return;
        if (res.status === 401) {
          setError("Wrong password");
          setAuthenticated(false);
          sessionStorage.removeItem("submissions_auth");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setSubmissions(data.submissions || []);
      } catch {
        if (!cancelled) setError("Failed to load");
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [authenticated, password]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    doFetch(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("submissions_auth");
    setAuthenticated(false);
    setPassword("");
    setSubmissions([]);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg-primary)]">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center text-[var(--text-primary)]">
            Submissions
          </h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          />
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-lg font-semibold text-sm text-white disabled:opacity-50 transition-all"
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading ? "Checking..." : "View Submissions"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Submissions
            <span className="ml-3 text-lg font-normal text-[var(--text-muted)]">
              ({submissions.length})
            </span>
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            Logout
          </button>
        </div>

        {submissions.length === 0 ? (
          <p className="text-[var(--text-muted)]">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-secondary)] p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)]">
                      {sub.name}
                    </h3>
                    <a
                      href={`mailto:${sub.email}`}
                      className="text-sm text-[var(--accent-primary)] hover:underline"
                    >
                      {sub.email}
                    </a>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-1 sm:mt-0">
                    {new Date(sub.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {sub.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
