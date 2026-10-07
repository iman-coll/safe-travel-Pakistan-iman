import { AlertTriangle, Clock, MapPin, RefreshCw } from "lucide-react";
import { useSafetyReports } from "@/hooks/useSafetyReports";

const categoryColors: Record<string, string> = {
  phone_snatching: "text-red-400 bg-red-500/10 border-red-500/20",
  street_crime: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  unsafe_road: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  safe_area: "text-green-400 bg-green-500/10 border-green-500/20",
  kidnapping: "text-red-500 bg-red-500/10 border-red-500/20",
  black_market: "text-purple-400 bg-purple-500/10 border-purple-500/20",
};

const categoryLabels: Record<string, string> = {
  phone_snatching: "Phone Snatching",
  street_crime: "Street Crime",
  unsafe_road: "Unsafe Road",
  safe_area: "Safe Area",
  kidnapping: "Kidnapping Risk",
  black_market: "Black Market",
};

const severityDot: Record<string, string> = {
  low: "bg-green-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function CommunityReports() {
  const { reports, loading, error } = useSafetyReports();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400 text-sm">
        <RefreshCw className="w-4 h-4 animate-spin mr-2" /> Loading community reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-3">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        Could not load reports. Please try again later.
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No community reports yet. Be the first to report.
      </div>
    );
  }

  return (
    <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 -mr-1">
      {reports.map((r) => (
        <div
          key={r.id}
          className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3.5 hover:border-slate-600/60 transition-colors"
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-sm text-slate-200 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {r.area}
            </div>
            <span className="flex items-center gap-1 text-[10px] text-slate-500 flex-shrink-0">
              <Clock className="w-3 h-3" />{timeAgo(r.created_at)}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${categoryColors[r.category] || "text-slate-400 bg-slate-700/30 border-slate-600"}`}>
              {categoryLabels[r.category] || r.category}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <span className={`w-1.5 h-1.5 rounded-full ${severityDot[r.severity] || "bg-slate-500"}`} />
              {r.severity}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>
        </div>
      ))}
    </div>
  );
}
