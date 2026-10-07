import { useState } from "react";
import {
  Shield,
  ShieldAlert,
  Phone,
  Plus,
  Map as MapIcon,
  Route,
  Users,
  AlertTriangle,
  TrendingUp,
  Waypoints,
  Navigation,
} from "lucide-react";
import PakistanMap from "@/components/PakistanMap";
import RoutePlanner from "@/components/RoutePlanner";
import CommunityReports from "@/components/CommunityReports";
import ReportForm from "@/components/ReportForm";
import EmergencyPanel from "@/components/EmergencyPanel";
import RoadDirectory from "@/components/RoadDirectory";
import { cities, incidents, incidentTypeMeta, type SafetyIncident } from "@/lib/data";
import { roads } from "@/lib/roads";
import { subAreas } from "@/lib/subAreas";

type Tab = "map" | "route" | "roads" | "reports";

export default function App() {
  const [tab, setTab] = useState<Tab>("map");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapFilter, setMapFilter] = useState<"all" | "danger" | "safe">("all");
  const [showReport, setShowReport] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [reportKey, setReportKey] = useState(0);

  const selectedCityData = cities.find((c) => c.id === selectedCity);
  const cityIncidents = selectedCityData
    ? incidents.filter((i) => i.city === selectedCityData.name)
    : [];

  const highRiskCount = incidents.filter((i) => i.severity === "high").length;
  const safeAreaCount = incidents.filter((i) => i.type === "safe_area").length;
  const avgSafety = Math.round(cities.reduce((a, c) => a + c.safetyScore, 0) / cities.length);

  const tabs: { id: Tab; label: string; icon: typeof MapIcon }[] = [
    { id: "map", label: "Safety Map", icon: MapIcon },
    { id: "route", label: "Route Planner", icon: Route },
    { id: "roads", label: "Roads & Bridges", icon: Waypoints },
    { id: "reports", label: "Community", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight leading-none">
                Raah-e-Aman
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 leading-none mt-0.5">
                Safe Travel Pakistan · راہِ امن
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReport(true)}
              className="hidden sm:flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-lg px-3.5 py-2 transition-colors"
            >
              <Plus className="w-4 h-4" /> Report
            </button>
            <button
              onClick={() => setShowEmergency(true)}
              className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-sm font-medium rounded-lg px-3.5 py-2 transition-colors"
            >
              <Phone className="w-4 h-4" /> <span className="hidden sm:inline">Emergency</span>
              <span className="sm:hidden">SOS</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    tab === t.id
                      ? "border-sky-400 text-sky-400"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <StatCard
            icon={<TrendingUp className="w-4 h-4" />}
            label="Avg Safety"
            value={`${avgSafety}/100`}
            color="text-sky-400 bg-sky-500/10"
          />
          <StatCard
            icon={<ShieldAlert className="w-4 h-4" />}
            label="High-Risk Zones"
            value={String(highRiskCount)}
            color="text-red-400 bg-red-500/10"
          />
          <StatCard
            icon={<Shield className="w-4 h-4" />}
            label="Safe Areas"
            value={String(safeAreaCount)}
            color="text-green-400 bg-green-500/10"
          />
          <StatCard
            icon={<Waypoints className="w-4 h-4" />}
            label="Roads Mapped"
            value={String(roads.length)}
            color="text-amber-400 bg-amber-500/10"
          />
          <StatCard
            icon={<Navigation className="w-4 h-4" />}
            label="Sub-areas"
            value={String(subAreas.length)}
            color="text-emerald-400 bg-emerald-500/10"
          />
        </div>

        {/* Map tab */}
        {tab === "map" && (
          <div className="grid lg:grid-cols-[1fr_360px] gap-5">
            <div className="space-y-4">
              {/* Filter buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 mr-1">Filter:</span>
                {(["all", "danger", "safe"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setMapFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      mapFilter === f
                        ? f === "danger"
                          ? "border-red-500/40 bg-red-500/15 text-red-300"
                          : f === "safe"
                          ? "border-green-500/40 bg-green-500/15 text-green-300"
                          : "border-sky-500/40 bg-sky-500/15 text-sky-300"
                        : "border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {f === "all" ? "All" : f === "danger" ? "High Risk" : "Safe Areas"}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-6">
                <PakistanMap
                  selectedCity={selectedCity}
                  onSelectCity={setSelectedCity}
                  filter={mapFilter}
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3">
                <span className="text-xs text-slate-500 font-medium">Legend:</span>
                {Object.entries(incidentTypeMeta).slice(0, 5).map(([key, meta]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                    <span className="text-xs text-slate-400">{meta.label}</span>
                  </div>
                ))}
                <div className="w-px h-4 bg-slate-700" />
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-green-500" />
                  <span className="text-xs text-slate-400">Safe Route</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-yellow-500" />
                  <span className="text-xs text-slate-400">Scenic Route</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent border-b-red-500" />
                  <span className="text-xs text-slate-400">Hazard Zone</span>
                </div>
                <div className="w-px h-4 bg-slate-700" />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-sky-300">3D Landmarks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-amber-300">Travel Icons</span>
                </div>
              </div>
            </div>

            {/* Side panel */}
            <div className="space-y-4">
              {selectedCityData ? (
                <CityDetailPanel
                  cityName={selectedCityData.name}
                  urduName={selectedCityData.urduName}
                  province={selectedCityData.province}
                  safetyScore={selectedCityData.safetyScore}
                  population={selectedCityData.population}
                  summary={selectedCityData.summary}
                  incidents={cityIncidents}
                />
              ) : (
                <div className="bg-slate-900/50 border border-dashed border-slate-700/50 rounded-2xl p-6 text-center">
                  <MapIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 font-medium">Select a city on the map</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Tap any marker to see safety details, known incidents, and safer alternative roads.
                  </p>
                </div>
              )}

              <button
                onClick={() => setTab("route")}
                className="w-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Route className="w-4 h-4 text-sky-400" /> Plan a Route from Here
              </button>

              <button
                onClick={() => setTab("roads")}
                className="w-full bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Waypoints className="w-4 h-4 text-amber-400" /> Browse All Roads & Bridges
              </button>
            </div>
          </div>
        )}

        {/* Route tab */}
        {tab === "route" && (
          <div className="grid lg:grid-cols-[1fr_420px] gap-5">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-6">
              <PakistanMap
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                filter="all"
              />
            </div>
            <RoutePlanner selectedCity={selectedCity} onCitySelect={setSelectedCity} />
          </div>
        )}

        {/* Roads tab */}
        {tab === "roads" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Waypoints className="w-5 h-5 text-amber-400" /> Pakistan Road Directory
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Search mapped roads, bridges, chowks, U-turns, and neighborhood sub-areas across Pakistan with safety scores and local names.
              </p>
            </div>
            <RoadDirectory />
          </div>
        )}

        {/* Reports tab */}
        {tab === "reports" && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Community Reports</h2>
                <p className="text-sm text-slate-400">Real-time safety observations from travelers</p>
              </div>
              <button
                onClick={() => setShowReport(true)}
                className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-lg px-3.5 py-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> New Report
              </button>
            </div>
            <CommunityReports key={reportKey} />
          </div>
        )}
      </main>

      {/* Floating report button (mobile) */}
      <button
        onClick={() => setShowReport(true)}
        className="sm:hidden fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-sky-500 hover:bg-sky-400 shadow-lg shadow-sky-500/30 flex items-center justify-center text-white transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modals */}
      {showReport && (
        <ReportForm
          onClose={() => setShowReport(false)}
          onSubmitted={() => setReportKey((k) => k + 1)}
        />
      )}
      {showEmergency && <EmergencyPanel onClose={() => setShowEmergency(false)} />}

      <footer className="border-t border-slate-800 mt-8 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-500">
            Raah-e-Aman · Safe Travel Pakistan — Community-driven safety guidance.
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Always verify information independently. In an emergency, call 15 (Police) or 1122 (Rescue).
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-lg font-bold text-slate-100 leading-none">{value}</div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">{label}</div>
      </div>
    </div>
  );
}

function CityDetailPanel({
  cityName,
  urduName,
  province,
  safetyScore,
  population,
  summary,
  incidents: cityIncidents,
}: {
  cityName: string;
  urduName: string;
  province: string;
  safetyScore: number;
  population: string;
  summary: string;
  incidents: SafetyIncident[];
}) {
  const scoreColor =
    safetyScore >= 80 ? "text-green-400" : safetyScore >= 70 ? "text-amber-400" : safetyScore >= 60 ? "text-orange-400" : "text-red-400";
  const barColor =
    safetyScore >= 80 ? "bg-green-500" : safetyScore >= 70 ? "bg-amber-500" : safetyScore >= 60 ? "bg-orange-500" : "bg-red-500";

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-bold text-slate-100">{cityName}</h3>
          <span className="text-sm text-slate-500">{urduName}</span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">{province} · Pop. {population}</p>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs text-slate-400 uppercase tracking-wide">Safety Score</span>
          <span className={`text-2xl font-bold ${scoreColor}`}>{safetyScore}<span className="text-sm text-slate-500">/100</span></span>
        </div>
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${barColor} transition-all duration-500`} style={{ width: `${safetyScore}%` }} />
        </div>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">{summary}</p>

      {cityIncidents.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="text-xs text-slate-400 uppercase tracking-wide font-medium">Known Incidents</div>
          {cityIncidents.map((inc) => {
            const meta = incidentTypeMeta[inc.type];
            return (
              <div key={inc.id} className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold" style={{ color: meta.color }}>
                    {meta.label}
                  </span>
                  <span className="text-[10px] text-slate-500">{inc.reportCount} reports</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">{inc.area}</div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{inc.description}</p>
                {inc.safeAlternatives.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {inc.safeAlternatives.map((alt, i) => (
                      <span key={i} className="text-[10px] bg-sky-500/10 text-sky-300 border border-sky-500/20 px-1.5 py-0.5 rounded">
                        {alt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
