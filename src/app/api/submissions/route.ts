import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET(req: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  const auth = req.headers.get("authorization");

  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ submissions: [] });
  }

  try {
    const raw = await redis.lrange<string | Record<string, unknown>>("submissions", 0, -1);
    const submissions = raw.map((r) => (typeof r === "string" ? JSON.parse(r) : r));
    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ submissions: [] });
  }
}
