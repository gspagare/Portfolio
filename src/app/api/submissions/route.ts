import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ submissions: [] });
  }

  try {
    const raw = await redis.lrange<string>("submissions", 0, -1);
    const submissions = raw.map((r) => JSON.parse(r));
    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ submissions: [] });
  }
}
