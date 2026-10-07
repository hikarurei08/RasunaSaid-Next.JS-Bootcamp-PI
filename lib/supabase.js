import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("SUPABASE URL:", supabaseUrl);
console.log(
  "SUPABASE KEY PREFIX:",
  supabaseAnonKey?.substring(0, 15)
);

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);