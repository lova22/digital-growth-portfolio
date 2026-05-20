// This file is intentionally minimal.
// The middleware (src/middleware.ts) redirects all traffic from /
// to the appropriate locale route (/en, /fr, or /ar).
// This file only exists to satisfy Next.js file conventions.
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
