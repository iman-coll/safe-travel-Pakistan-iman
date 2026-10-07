import { useEffect, useState } from "react";
import { supabase, type SafetyReport } from "@/lib/supabase";

export function useSafetyReports() {
  const [reports, setReports] = useState<SafetyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("safety_reports")
        .select("*")
        .order("created_at", { ascending: false });
      if (cancelled) return;
      if (error) {
        setError(error.message);
      } else {
        setReports((data as SafetyReport[]) ?? []);
        setError(null);
      }
      setLoading(false);
    }

    load();

    const channel = supabase
      .channel("safety_reports_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "safety_reports" },
        () => load()
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return { reports, loading, error };
}

export async function submitReport(
  area: string,
  category: string,
  severity: "low" | "medium" | "high",
  description: string
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("safety_reports").insert({
    area,
    category,
    severity,
    description,
    status: "pending",
  });
  return { error: error?.message ?? null };
}
