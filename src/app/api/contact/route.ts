import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields required" },
      { status: 400 }
    );
  }

  const redis = getRedis();
  if (redis) {
    try {
      const submission = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name,
        email,
        message,
        date: new Date().toISOString(),
      };
      await redis.lpush("submissions", JSON.stringify(submission));
    } catch {
      // Redis storage failed — don't block the form submission
    }
  }

  if (!FORMSPREE_ENDPOINT) {
    return NextResponse.json(
      { error: "Formspree endpoint not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Network error" },
      { status: 500 }
    );
  }
}
