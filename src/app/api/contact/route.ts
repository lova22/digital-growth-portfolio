import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { sanitize, isValidEmail } from "@/lib/utils";

// ── In-memory rate limiter ──────────────────────────────────────────────────
// For production, swap this with an Upstash Redis rate limiter.
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60_000; // 1 minute
  const max = 5; // 5 requests per minute per IP

  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

// ── Handler ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // 3. Validate & sanitize inputs (OWASP ASVS — XSS / SQLi prevention)
  const client_name = sanitize(String(raw.name ?? ""));
  const email = String(raw.email ?? "").trim().toLowerCase().slice(0, 254);
  const message = sanitize(String(raw.message ?? ""));

  if (!client_name || client_name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 422 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 422 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: "Message must be at least 10 characters." },
      { status: 422 }
    );
  }

  // 4. Persist to Supabase (Row Level Security enforced on the table)
  try {
    const db = createServerClient();
    const { error } = await db
      .from("leads")
      .insert({ client_name, email, message });

    if (error) {
      console.error("[contact] Supabase error:", error.message);
      // Don't expose DB details to the client
      return NextResponse.json(
        { error: "Could not save your message. Please try again." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

// Reject all other methods
export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
