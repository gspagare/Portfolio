"use client";

import { useEffect, useState } from "react";

export default function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(now);

  return (
    <p className="text-sm text-[var(--text-muted)] max-w-sm">
      Currently in Mumbai, India ·{" "}
      <span
        suppressHydrationWarning
        className="font-semibold text-[var(--text-primary)]"
      >
        Time: {time.toUpperCase()}
      </span>
    </p>
  );
}