import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SafetyReport = {
  id: string;
  area: string;
  category: string;
  severity: "low" | "medium" | "high";
  description: string;
  status: string;
  created_at: string;
};
