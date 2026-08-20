import { NextRequest, NextResponse } from "next/server";

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "";

export async function POST(req: NextRequest) {
  if (!FORMSPREE_ENDPOINT) {
    return NextResponse.json(
      { error: "Formspree endpoint not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields required" },
      { status: 400 }
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
