import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (uses service role for admin ops)
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// Types matching the Supabase schema
export interface Project {
  id: string;
  title: Record<string, string>; // { en: "...", fr: "...", ar: "..." }
  slug: string;
  category: string;
  image_url: string;
  tech_stack: string[];
  created_at: string;
}

export interface Lead {
  id?: string;
  client_name: string;
  email: string;
  message: string;
  created_at?: string;
}
