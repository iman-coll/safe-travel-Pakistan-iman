import { useMemo, useState } from "react";
import { cities } from "@/lib/data";
import { roads, roadTypeMeta } from "@/lib/roads";
import { findRoute, findRoadRoute } from "@/lib/routes";
import {
  Navigation,
  MapPin,
  Clock,
  Route as RouteIcon,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  CircleCheck,
  CircleAlert,
  CircleX,
  Waypoints,
  Building2,
} from "lucide-react";

type Props = { selectedCity: string | null; onCitySelect: (id: string) => void };
type Mode = "city" | "road";

export default function RoutePlanner({ selectedCity, onCitySelect }: Props) {
  const [mode, setMode] = useState<Mode>("city");
  const [fromId, setFromId] = useState<string>("");
  const [toId, setToId] = useState<string>("");
  const [fromRoad, setFromRoad] = useState<string>("");
  const [toRoad, setToRoad] = useState<string>("");
  const [roadCityFilter, setRoadCityFilter] = useState<string>("");

  const route = useMemo(() => {
    if (mode === "city") {
      return fromId && toId ? findRoute(fromId, toId) : null;
    } else {
      return fromRoad && toRoad ? findRoadRoute(fromRoad, toRoad) : null;
    }
  }, [mode, fromId, toId, fromRoad, toRoad]);

  function handleFromChange(id: string) {
    setFromId(id);
    onCitySelect(id);
  }

  function swap() {
    if (mode === "city") {
      setFromId(toId);
      setToId(fromId);
    } else {
      setFromRoad(toRoad);
      setToRoad(fromRoad);
    }
  }

  const filteredRoads = useMemo(() => {
    if (!roadCityFilter) return roads;
    return roads.filter((r) => r.city === roadCityFilter);
  }, [roadCityFilter]);

  const roadCityOptions = useMemo(() => {
    const citySet = new Set(roads.map((r) => r.city));
    return Array.from(citySet).sort();
  }, []);

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-1 bg-slate-800/40 border border-slate-700/50 rounded-lg p-1">
        <button
          onClick={() => setMode("city")}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
            mode === "city" ? "bg-sky-500/20 text-sky-300" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" /> City to City
        </button>
        <button
          onClick={() => setMode("road")}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
            mode === "road" ? "bg-sky-500/20 text-sky-300" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Waypoints className="w-3.5 h-3.5" /> Road to Road
        </button>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
          <RouteIcon className="w-4 h-4 text-sky-400" />
          {mode === "city" ? "Plan a Safe Route (City to City)" : "Plan a Safe Route (Road to Road)"}
        </div>

        {mode === "city" ? (
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
            <div>
              <label className="block text-xs text-slate-400 mb-1">From City</label>
              <select
                value={fromId}
                onChange={(e) => handleFromChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500/60 transition-colors"
              >
                <option value="">Select city</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={swap}
              disabled={!fromId || !toId}
              className="w-9 h-9 rounded-lg bg-slate-700/50 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-300 transition-colors mb-0.5"
              title="Swap"
            >
              <Navigation className="w-4 h-4 rotate-90" />
            </button>
            <div>
              <label className="block text-xs text-slate-400 mb-1">To City</label>
              <select
                value={toId}
                onChange={(e) => setToId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500/60 transition-colors"
              >
                <option value="">Select city</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* City filter for roads */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">Filter roads by city (optional)</label>
              <select
                value={roadCityFilter}
                onChange={(e) => setRoadCityFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500/60 transition-colors"
              >
                <option value="">All cities</option>
                {roadCityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
              <div>
                <label className="block text-xs text-slate-400 mb-1">From Road</label>
                <select
                  value={fromRoad}
                  onChange={(e) => setFromRoad(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500/60 transition-colors"
                >
                  <option value="">Select road</option>
                  {filteredRoads.map((r) => (
                    <option key={r.id} value={r.name}>{r.name} ({r.city})</option>
                  ))}
                </select>
              </div>
              <button
                onClick={swap}
                disabled={!fromRoad || !toRoad}
                className="w-9 h-9 rounded-lg bg-slate-700/50 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-300 transition-colors mb-0.5"
                title="Swap"
              >
                <Navigation className="w-4 h-4 rotate-90" />
              </button>
              <div>
                <label className="block text-xs text-slate-400 mb-1">To Road</label>
                <select
                  value={toRoad}
                  onChange={(e) => setToRoad(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500/60 transition-colors"
                >
                  <option value="">Select road</option>
                  {filteredRoads.map((r) => (
                    <option key={r.id} value={r.name}>{r.name} ({r.city})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {route && (
        <div className="space-y-3 animate-in fade-in duration-300">
          {/* Route summary card */}
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-sky-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-100 truncate">
                  {route.from} → {route.to}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <RouteIcon className="w-3 h-3" />{route.totalDistance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />{route.estimatedTime}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-2xl font-bold ${
                  route.safetyRating >= 75 ? "text-green-400" :
                  route.safetyRating >= 55 ? "text-amber-400" :
                  "text-red-400"
                }`}>
                  {route.safetyRating}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Safety</div>
              </div>
            </div>
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  route.safetyRating >= 75 ? "bg-green-500" :
                  route.safetyRating >= 55 ? "bg-amber-500" :
                  "bg-red-500"
                }`}
                style={{ width: `${route.safetyRating}%` }}
              />
            </div>
          </div>

          {/* Route segments */}
          {route.segments.length > 0 && (
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-slate-200 mb-3">Route Segments</div>
              <div className="space-y-2.5">
                {route.segments.map((seg, i) => {
                  const Icon = seg.status === "safe" ? CircleCheck : seg.status === "caution" ? CircleAlert : CircleX;
                  const color = seg.status === "safe" ? "text-green-400" : seg.status === "caution" ? "text-amber-400" : "text-red-400";
                  const typeMeta = seg.roadType ? roadTypeMeta[seg.roadType as keyof typeof roadTypeMeta] : null;
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <Icon className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-slate-200 font-medium">{seg.name}</span>
                          {typeMeta && (
                            <span
                              className="text-[9px] px-1.5 py-0.5 rounded-full border"
                              style={{ color: typeMeta.color, borderColor: `${typeMeta.color}40` }}
                            >
                              {typeMeta.label}
                            </span>
                          )}
                          {seg.urdu && (
                            <span className="text-[10px] text-slate-500">{seg.urdu}</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{seg.note}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Safety tips */}
          {route.tips.length > 0 && (
            <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-300 mb-2.5">
                <ShieldCheck className="w-4 h-4" /> Travel Safety Tips
              </div>
              <ul className="space-y-2">
                {route.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-sky-400 flex-shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Native terms */}
          {route.nativeTerms.length > 0 && (
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2.5">
                <BookOpen className="w-4 h-4 text-amber-400" /> Native Travel Terms
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {route.nativeTerms.map((t, i) => (
                  <div key={i} className="flex items-baseline gap-2 text-xs">
                    <span className="font-semibold text-amber-300 min-w-[70px]">{t.term}</span>
                    <span className="text-slate-400">{t.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!route && (
        <div className="bg-slate-800/20 border border-dashed border-slate-700/50 rounded-xl p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-400">
            {mode === "city"
              ? "Select a starting city and destination above to plan a safe route."
              : "Select a starting road and destination road above to plan a safe route."}
          </p>
        </div>
      )}
    </div>
  );
}
