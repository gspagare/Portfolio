import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg-primary)]">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg font-semibold text-sm text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
          style={{ background: "var(--gradient-primary)" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
