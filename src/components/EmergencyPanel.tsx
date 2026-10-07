import { Shield, Phone, X } from "lucide-react";
import { emergencyContacts } from "@/lib/data";

type Props = { onClose: () => void };

export default function EmergencyPanel({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-red-500/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Emergency Contacts</h2>
              <p className="text-xs text-slate-400">Pakistan nationwide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {emergencyContacts.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number}`}
              className="flex items-center gap-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-xl px-4 py-3 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <Phone className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-100 text-sm">{c.name}</div>
                <div className="text-xs text-slate-400 truncate">{c.desc}</div>
              </div>
              <div className="text-xl font-bold text-sky-400 tabular-nums">{c.number}</div>
            </a>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/50">
          <p className="text-xs text-slate-500 text-center">
            Tap a number to call directly. Stay calm and share your location.
          </p>
        </div>
      </div>
    </div>
  );
}
