import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Route as RoadIcon,
  Waypoints as Bridge,
  CircleDot,
  Building,
  RotateCw,
  ShoppingCart,
  Waypoints,
  AlertTriangle,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  roads,
  roadTypeMeta,
  searchRoads,
  getRoadsByCity,
  type Road,
  type RoadType,
} from "@/lib/roads";
import { subAreas, searchSubAreas, type SubArea } from "@/lib/subAreas";
import { cities } from "@/lib/data";

const iconMap: Record<string, typeof RoadIcon> = {
  road: RoadIcon,
  highway: RoadIcon,
  motorway: RoadIcon,
  bridge: Bridge,
  chowk: CircleDot,
  roundabout: CircleDot,
  flyover: Building,
  u_turn: RotateCw,
  bazaar_road: ShoppingCart,
};

function safetyColor(score: number): string {
  if (score >= 75) return "text-green-400";
  if (score >= 55) return "text-amber-400";
  return "text-red-400";
}

function safetyBg(score: number): string {
  if (score >= 75) return "bg-green-500/10 border-green-500/20";
  if (score >= 55) return "bg-amber-500/10 border-amber-500/20";
  return "bg-red-500/10 border-red-500/20";
}

export default function RoadDirectory() {
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [selectedRoad, setSelectedRoad] = useState<Road | null>(null);
  const [selectedSubArea, setSelectedSubArea] = useState<SubArea | null>(null);
  const [directoryMode, setDirectoryMode] = useState<"roads" | "areas">("roads");

  const filteredRoads = useMemo(() => {
    let result = searchRoads(query);
    if (cityFilter) result = result.filter((r) => r.city === cityFilter);
    if (typeFilter) result = result.filter((r) => r.type === typeFilter);
    return result;
  }, [query, cityFilter, typeFilter]);

  const filteredSubAreas = useMemo(() => {
    let result = searchSubAreas(query);
    if (cityFilter) result = result.filter((area) => area.city === cityFilter);
    return result;
  }, [query, cityFilter]);

  const cityOptions = useMemo(() => {
    const citySet = new Set([...roads.map((r) => r.city), ...subAreas.map((area) => area.city)]);
    return Array.from(citySet).sort();
  }, []);

  const typeOptions = useMemo(() => {
    const typeSet = new Set(roads.map((r) => r.type));
    return Array.from(typeSet) as RoadType[];
  }, []);

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roads, bridges, chowks, highways... (e.g. Shahrah-e-Faisal, Kalma Chowk, Ravi Bridge)"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-lg border border-slate-700 bg-slate-900 p-0.5">
            <button
              onClick={() => setDirectoryMode("roads")}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${directoryMode === "roads" ? "bg-sky-500/15 text-sky-300" : "text-slate-500 hover:text-slate-300"}`}
            >
              Roads & Junctions
            </button>
            <button
              onClick={() => setDirectoryMode("areas")}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${directoryMode === "areas" ? "bg-emerald-500/15 text-emerald-300" : "text-slate-500 hover:text-slate-300"}`}
            >
              Sub-areas
            </button>
          </div>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500/60"
          >
            <option value="">All Cities</option>
            {cityOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {directoryMode === "roads" && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500/60"
            >
              <option value="">All Types</option>
              {typeOptions.map((t) => (
                <option key={t} value={t}>{roadTypeMeta[t].label}</option>
              ))}
            </select>
          )}
          <div className="ml-auto text-xs text-slate-500 self-center">
            {directoryMode === "roads" ? `${filteredRoads.length} road${filteredRoads.length !== 1 ? "s" : ""}` : `${filteredSubAreas.length} sub-area${filteredSubAreas.length !== 1 ? "s" : ""}`}
          </div>
        </div>
      </div>

      {/* Results grid */}
      {directoryMode === "roads" ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filteredRoads.map((road) => {
          const meta = roadTypeMeta[road.type];
          const Icon = iconMap[road.type] || RoadIcon;
          return (
            <button
              key={road.id}
              onClick={() => setSelectedRoad(road)}
              className="text-left bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 rounded-xl p-3.5 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${meta.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: meta.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-slate-100 truncate">{road.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span>{road.urduName}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" />{road.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full border" style={{ color: meta.color, borderColor: `${meta.color}40` }}>
                      {meta.label}
                    </span>
                    <span className={`text-xs font-bold ${safetyColor(road.safetyScore)}`}>
                      {road.safetyScore}/100
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredSubAreas.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedSubArea(area)}
              className="text-left bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-emerald-500/30 rounded-xl p-3.5 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-500/10">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-100 truncate">{area.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{area.urduName} · {area.city}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-emerald-500/30 text-emerald-300">Sub-area</span>
                    <span className={`text-xs font-bold ${safetyColor(area.safetyScore)}`}>{area.safetyScore}/100</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 mt-2 line-clamp-2">{area.description}</div>
            </button>
          ))}
        </div>
      )}

      {((directoryMode === "roads" && filteredRoads.length === 0) || (directoryMode === "areas" && filteredSubAreas.length === 0)) && (
        <div className="text-center py-10 text-slate-500">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No {directoryMode === "roads" ? "roads" : "sub-areas"} found. Try a different search.</p>
        </div>
      )}

      {/* Road detail modal */}
      {selectedRoad && (
        <RoadDetailModal road={selectedRoad} onClose={() => setSelectedRoad(null)} />
      )}
      {selectedSubArea && (
        <SubAreaDetailModal area={selectedSubArea} onClose={() => setSelectedSubArea(null)} />
      )}
    </div>
  );
}

function SubAreaDetailModal({ area, onClose }: { area: SubArea; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{area.name}</h2>
              <div className="text-xs text-slate-400 mt-0.5">{area.urduName} · {area.city}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"><span className="text-lg leading-none">×</span></button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div className={`rounded-xl border p-3.5 ${safetyBg(area.safetyScore)}`}>
            <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-medium text-slate-300 uppercase tracking-wide">Safety Score</span><span className={`text-xl font-bold ${safetyColor(area.safetyScore)}`}>{area.safetyScore}/100</span></div>
            <div className="h-2 bg-slate-700/40 rounded-full overflow-hidden"><div className={`h-full rounded-full ${area.safetyScore >= 75 ? "bg-green-500" : area.safetyScore >= 55 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${area.safetyScore}%` }} /></div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{area.description}</p>
          {area.parentArea && <div className="text-xs text-slate-400">Mapped near <span className="text-emerald-300 font-medium">{area.parentArea}</span></div>}
          <div className="flex items-center gap-2 text-xs text-slate-400"><Clock className="w-4 h-4 text-slate-500" />{area.timeRisk === "both" ? "Review conditions at all hours" : area.timeRisk === "night" ? "Higher risk at night" : "Prefer daytime travel"}</div>
          {area.nativeName && <div className="text-xs text-slate-400">Locally called: <span className="text-amber-300 font-medium">{area.nativeName}</span></div>}
          {area.safetyScore < 50 && <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5"><AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><p className="text-xs text-red-300">Use a main road, travel in daylight, and check fresh community reports before entering this area.</p></div>}
          {area.safetyScore >= 75 && <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2.5"><Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><p className="text-xs text-green-300">This area is currently marked as a safer option for families and visitors.</p></div>}
        </div>
      </div>
    </div>
  );
}

function RoadDetailModal({ road, onClose }: { road: Road; onClose: () => void }) {
  const meta = roadTypeMeta[road.type];
  const Icon = iconMap[road.type] || RoadIcon;
  const connectedRoads = road.connectsTo
    .map((name) => roads.find((r) => r.name === name))
    .filter((r): r is Road => r !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${meta.color}20` }}
            >
              <Icon className="w-5 h-5" style={{ color: meta.color }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{road.name}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>{road.urduName}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" />{road.city}, {road.province}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Safety score */}
          <div className={`rounded-xl border p-3.5 ${safetyBg(road.safetyScore)}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">Safety Score</span>
              <span className={`text-xl font-bold ${safetyColor(road.safetyScore)}`}>{road.safetyScore}/100</span>
            </div>
            <div className="h-2 bg-slate-700/40 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  road.safetyScore >= 75 ? "bg-green-500" : road.safetyScore >= 55 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${road.safetyScore}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Description</div>
            <p className="text-sm text-slate-300 leading-relaxed">{road.description}</p>
          </div>

          {/* Time risk */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-400">
              {road.timeRisk === "both" ? "Risk at all hours" : road.timeRisk === "night" ? "Higher risk at night" : "Higher risk during day"}
            </span>
          </div>

          {/* Native name */}
          {road.nativeName && (
            <div className="flex items-center gap-2">
              <Waypoints className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400">
                Locally called: <span className="text-amber-300 font-medium">{road.nativeName}</span>
              </span>
            </div>
          )}

          {/* Type */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-1 rounded-full border" style={{ color: meta.color, borderColor: `${meta.color}40`, backgroundColor: `${meta.color}10` }}>
              {meta.label} · {meta.urdu}
            </span>
          </div>

          {/* Connected roads */}
          {connectedRoads.length > 0 && (
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Waypoints className="w-3.5 h-3.5" /> Connects To
              </div>
              <div className="space-y-1.5">
                {connectedRoads.map((cr) => (
                  <div key={cr.id} className="flex items-center gap-2 bg-slate-800/40 border border-slate-700/40 rounded-lg px-3 py-2">
                    <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-200 truncate">{cr.name}</div>
                      <div className="text-[10px] text-slate-500">{cr.urduName} · {cr.city}</div>
                    </div>
                    <span className={`text-xs font-bold ${safetyColor(cr.safetyScore)}`}>{cr.safetyScore}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning if high risk */}
          {road.safetyScore < 50 && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-300">
                This is a high-risk road. Consider safer alternatives listed above or travel during daylight only.
              </p>
            </div>
          )}

          {/* Safe if high score */}
          {road.safetyScore >= 75 && (
            <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2.5">
              <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-300">
                This is a safe road. Well-lit, low crime, suitable for family travel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
