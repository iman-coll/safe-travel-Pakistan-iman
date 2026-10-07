import { useState } from "react";
import { Shield, Send, X, AlertTriangle, Check } from "lucide-react";
import { submitReport } from "@/hooks/useSafetyReports";
import { cities } from "@/lib/data";

type Props = { onClose: () => void; onSubmitted: () => void };

const categories = [
  { value: "phone_snatching", label: "Phone Snatching" },
  { value: "street_crime", label: "Street Crime / Mugging" },
  { value: "unsafe_road", label: "Unsafe Road Condition" },
  { value: "safe_area", label: "Report a Safe Area" },
  { value: "kidnapping", label: "Kidnapping Risk" },
  { value: "black_market", label: "Black Market Activity" },
];

const severities = [
  { value: "low" as const, label: "Low", color: "text-green-400 border-green-500/40" },
  { value: "medium" as const, label: "Medium", color: "text-amber-400 border-amber-500/40" },
  { value: "high" as const, label: "High", color: "text-red-400 border-red-500/40" },
];

export default function ReportForm({ onClose, onSubmitted }: Props) {
  const [area, setArea] = useState("");
  const [category, setCategory] = useState(categories[0].value);
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!area.trim() || !description.trim()) {
      setError("Please fill in the area and description.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error } = await submitReport(area.trim(), category, severity, description.trim());
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      onSubmitted();
      onClose();
    }, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sky-500/15 flex items-center justify-center">
              <Shield className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Report an Incident</h2>
              <p className="text-xs text-slate-400">Help others stay safe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="px-6 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100">Report Submitted</h3>
            <p className="text-sm text-slate-400 mt-1">
              Thank you for helping your community stay safe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Area / Location</label>
              <input
                list="city-list"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Shahrah-e-Faisal, Karachi"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 transition-colors"
              />
              <datalist id="city-list">
                {cities.map((c) => (
                  <option key={c.id} value={c.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-sky-500/60 transition-colors"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Severity</label>
              <div className="grid grid-cols-3 gap-2">
                {severities.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSeverity(s.value)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium border transition-all ${
                      severity === s.value
                        ? `${s.color} bg-slate-800`
                        : "border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe what happened, when, and any safer alternatives you know..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-3 text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Submitting..." : "Submit Report"}
            </button>

            <p className="text-xs text-slate-500 text-center">
              Reports are visible to everyone. Please report only truthful observations.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
