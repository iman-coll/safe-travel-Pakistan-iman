import { useState } from "react";
import { cities, incidents, incidentTypeMeta, type City, type SafetyIncident } from "@/lib/data";
import { roads, roadTypeMeta } from "@/lib/roads";
import { subAreas, getSubAreaPosition, type SubArea } from "@/lib/subAreas";
import { landmarks, travelIcons, routeLines, terrainFeatures } from "@/lib/landmarks";
import { LandmarkGraphic, TravelIconGraphic, CompassRose, SunMoon } from "@/components/MapGraphics";

type Props = {
  selectedCity: string | null;
  onSelectCity: (cityId: string) => void;
  filter: "all" | "danger" | "safe";
};

type HoveredItem =
  | { type: "city"; data: City }
  | { type: "incident"; data: SafetyIncident }
  | { type: "subarea"; data: SubArea }
  | { type: "landmark"; data: typeof landmarks[number] }
  | { type: "travelicon"; data: typeof travelIcons[number] }
  | null;

type LayerToggles = {
  terrain: boolean;
  landmarks: boolean;
  travelIcons: boolean;
  routeLines: boolean;
  subAreas: boolean;
  roads: boolean;
};

export default function PakistanMap({ selectedCity, onSelectCity, filter }: Props) {
  const [hovered, setHovered] = useState<HoveredItem>(null);
  const [layers, setLayers] = useState<LayerToggles>({
    terrain: true,
    landmarks: true,
    travelIcons: true,
    routeLines: true,
    subAreas: true,
    roads: true,
  });
  const [isNight, setIsNight] = useState(false);

  const cityIncidents = (cityName: string) =>
    incidents.filter((i) => i.city === cityName);

  const cityMatchesFilter = (city: City) => {
    if (filter === "all") return true;
    const incs = cityIncidents(city.name);
    if (filter === "danger") return incs.some((i) => i.severity === "high");
    if (filter === "safe") return incs.some((i) => i.type === "safe_area");
    return true;
  };

  const subAreaMatchesFilter = (sa: SubArea) => {
    if (filter === "all") return true;
    if (filter === "danger") return sa.safetyScore < 50;
    if (filter === "safe") return sa.safetyScore >= 75;
    return true;
  };

  const roadColor = (type: string) => roadTypeMeta[type as keyof typeof roadTypeMeta]?.color || "#475569";

  const cityRoads = (cityName: string) => roads.filter((r) => r.city === cityName);

  const getRoadLine = (road: (typeof roads)[number], connectedName: string) => {
    const connected = roads.find((r) => r.name === connectedName && r.city === road.city);
    if (!connected) return null;
    const city = cities.find((c) => c.name === road.city);
    if (!city) return null;
    const hash1 = road.name.charCodeAt(0) + road.name.charCodeAt(1);
    const hash2 = connected.name.charCodeAt(0) + connected.name.charCodeAt(1);
    return {
      x1: city.x + ((hash1 % 7) - 3) * 0.5,
      y1: city.y + ((hash1 % 5) - 2) * 0.4,
      x2: city.x + ((hash2 % 7) - 3) * 0.5,
      y2: city.y + ((hash2 % 5) - 2) * 0.4,
      type: road.type,
    };
  };

  function getTooltipPos(item: NonNullable<HoveredItem>): { left: string; top: string } {
    if (item.type === "city") return { left: `${item.data.x}%`, top: `${item.data.y}%` };
    if (item.type === "incident") {
      const city = cities.find((c) => c.name === item.data.city);
      return { left: `${city?.x ?? 50}%`, top: `${city?.y ?? 50}%` };
    }
    if (item.type === "subarea") {
      const pos = getSubAreaPosition(item.data);
      return { left: `${pos.x}%`, top: `${pos.y}%` };
    }
    if (item.type === "landmark") return { left: `${item.data.x}%`, top: `${item.data.y}%` };
    if (item.type === "travelicon") return { left: `${item.data.x}%`, top: `${item.data.y}%` };
    return { left: "50%", top: "50%" };
  }

  const tooltipPos = hovered ? getTooltipPos(hovered) : null;

  const toggleLayer = (key: keyof LayerToggles) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  const routeColor = (type: string) => {
    if (type === "safe") return "#22c55e";
    if (type === "scenic") return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="relative w-full aspect-[4/5] max-w-[680px] mx-auto">
      {/* Layer toggles */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 items-end">
        <button
          onClick={() => setIsNight(!isNight)}
          className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
            isNight
              ? "border-indigo-400/40 bg-indigo-500/15 text-indigo-300"
              : "border-amber-400/40 bg-amber-500/15 text-amber-300"
          }`}
        >
          {isNight ? "Moon" : "Sun"}
        </button>
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 p-1.5 flex flex-col gap-0.5">
          {(Object.keys(layers) as (keyof LayerToggles)[]).map((key) => (
            <button
              key={key}
              onClick={() => toggleLayer(key)}
              className={`text-[9px] px-2 py-0.5 rounded text-left transition-all ${
                layers[key]
                  ? "text-sky-300 bg-sky-500/10"
                  : "text-slate-500"
              }`}
            >
              {layers[key] ? "●" : "○"} {key === "travelIcons" ? "Icons" : key === "routeLines" ? "Routes" : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isNight ? "#0a0f1e" : "#0f172a"} />
            <stop offset="100%" stopColor={isNight ? "#111726" : "#1e293b"} />
          </linearGradient>
          <radialGradient id="mountainGrad" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#334155" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="desertGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#92400e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#92400e" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient id="coastGrad" cx="20%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.1" />
          </radialGradient>
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="subGlow">
            <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="routeGlow">
            <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pakistan outline */}
        <path
          d="M62,6 L58,7 L54,9 L52,13 L50,16 L46,18 L44,22 L40,24 L37,28 L34,30 L31,30 L28,32 L25,35 L22,38 L20,42 L18,46 L20,50 L22,53 L20,56 L22,59 L25,61 L27,64 L30,67 L33,70 L37,72 L40,75 L42,78 L44,82 L47,84 L50,83 L52,80 L55,78 L58,76 L60,73 L62,70 L64,67 L62,64 L60,60 L62,56 L64,52 L66,48 L64,44 L62,40 L60,36 L62,32 L64,28 L62,24 L60,20 L62,16 L64,12 L62,8 Z"
          fill="url(#mapGradient)"
          stroke="#334155"
          strokeWidth="0.4"
          strokeLinejoin="round"
        />

        {/* Terrain features */}
        {layers.terrain && terrainFeatures.map((tf) => {
          if (tf.type === "mountain") {
            return (
              <g key={tf.id}>
                <ellipse cx={tf.x + tf.w / 2} cy={tf.y + tf.h / 2} rx={tf.w / 1.5} ry={tf.h / 2} fill="url(#mountainGrad)" />
                {/* Mountain triangles */}
                <path d={`M${tf.x},${tf.y + tf.h} L${tf.x + tf.w * 0.3},${tf.y} L${tf.x + tf.w * 0.6},${tf.y + tf.h} Z`} fill="#334155" opacity="0.3" />
                <path d={`M${tf.x + tf.w * 0.4},${tf.y + tf.h} L${tf.x + tf.w * 0.7},${tf.y - 1} L${tf.x + tf.w},${tf.y + tf.h} Z`} fill="#3f4d63" opacity="0.35" />
                <path d={`M${tf.x + tf.w * 0.2},${tf.y + tf.h} L${tf.x + tf.w * 0.5},${tf.y + 1} L${tf.x + tf.w * 0.8},${tf.y + tf.h} Z`} fill="#475569" opacity="0.25" />
                {/* Snow caps */}
                <path d={`M${tf.x + tf.w * 0.25},${tf.y + 1} L${tf.x + tf.w * 0.3},${tf.y} L${tf.x + tf.w * 0.35},${tf.y + 1} Z`} fill="#e2e8f0" opacity="0.5" />
                <path d={`M${tf.x + tf.w * 0.65},${tf.y} L${tf.x + tf.w * 0.7},${tf.y - 1} L${tf.x + tf.w * 0.75},${tf.y} Z`} fill="#f8fafc" opacity="0.6" />
                <text x={tf.x + tf.w / 2} y={tf.y + tf.h + 2.5} fill="#475569" fontSize="1.5" textAnchor="middle" className="font-sans select-none pointer-events-none">{tf.label}</text>
              </g>
            );
          }
          if (tf.type === "desert") {
            return (
              <g key={tf.id}>
                <ellipse cx={tf.x + tf.w / 2} cy={tf.y + tf.h / 2} rx={tf.w / 1.5} ry={tf.h / 2} fill="url(#desertGrad)" />
                <path d={`M${tf.x},${tf.y + tf.h * 0.7} Q${tf.x + tf.w * 0.3},${tf.y + tf.h * 0.5} ${tf.x + tf.w * 0.6},${tf.y + tf.h * 0.7} Q${tf.x + tf.w * 0.8},${tf.y + tf.h * 0.6} ${tf.x + tf.w},${tf.y + tf.h * 0.7}`} fill="none" stroke="#92400e" strokeWidth="0.15" opacity="0.3" />
                <path d={`M${tf.x},${tf.y + tf.h * 0.9} Q${tf.x + tf.w * 0.3},${tf.y + tf.h * 0.75} ${tf.x + tf.w * 0.6},${tf.y + tf.h * 0.9} Q${tf.x + tf.w * 0.8},${tf.y + tf.h * 0.8} ${tf.x + tf.w},${tf.y + tf.h * 0.9}`} fill="none" stroke="#92400e" strokeWidth="0.12" opacity="0.2" />
                <text x={tf.x + tf.w / 2} y={tf.y + tf.h / 2} fill="#78350f" fontSize="1.5" textAnchor="middle" className="font-sans select-none pointer-events-none opacity-50">{tf.label}</text>
              </g>
            );
          }
          if (tf.type === "coast") {
            return (
              <g key={tf.id}>
                <ellipse cx={tf.x} cy={tf.y + tf.h / 2} rx={tf.w / 1.5} ry={tf.h / 2} fill="url(#coastGrad)" />
                <path d={`M${tf.x + 1},${tf.y} Q${tf.x + tf.w * 0.3},${tf.y + tf.h * 0.3} ${tf.x + tf.w * 0.5},${tf.y + tf.h * 0.6} Q${tf.x + tf.w * 0.7},${tf.y + tf.h * 0.8} ${tf.x + tf.w * 0.9},${tf.y + tf.h}`} fill="none" stroke="#38bdf8" strokeWidth="0.2" opacity="0.4" />
                <text x={tf.x + tf.w / 2} y={tf.y + tf.h + 2} fill="#0c4a6e" fontSize="1.5" textAnchor="middle" className="font-sans select-none pointer-events-none opacity-60">{tf.label}</text>
              </g>
            );
          }
          if (tf.type === "river") {
            return (
              <g key={tf.id}>
                <path d={`M${tf.x},${tf.y} Q${tf.x + tf.w * 0.3},${tf.y - 2} ${tf.x + tf.w * 0.5},${tf.y} Q${tf.x + tf.w * 0.7},${tf.y + 3} ${tf.x + tf.w},${tf.y + 5}`} fill="none" stroke="url(#riverGrad)" strokeWidth="1.5" />
                <text x={tf.x + tf.w / 2} y={tf.y - 1.5} fill="#0c4a6e" fontSize="1.2" textAnchor="middle" className="font-sans select-none pointer-events-none opacity-50">Indus</text>
              </g>
            );
          }
          return null;
        })}

        {/* Province divider lines */}
        <line x1="45" y1="28" x2="48" y2="58" stroke="#334155" strokeWidth="0.25" strokeDasharray="1,1" />
        <line x1="48" y1="58" x2="30" y2="65" stroke="#334155" strokeWidth="0.25" strokeDasharray="1,1" />
        <line x1="58" y1="15" x2="60" y2="45" stroke="#334155" strokeWidth="0.25" strokeDasharray="1,1" />

        {/* Province labels */}
        <text x="40" y="48" fill="#475569" fontSize="2.2" textAnchor="middle" className="font-sans select-none">Balochistan</text>
        <text x="55" y="50" fill="#475569" fontSize="2.2" textAnchor="middle" className="font-sans select-none">Punjab</text>
        <text x="28" y="55" fill="#475569" fontSize="2.2" textAnchor="middle" className="font-sans select-none">Sindh</text>
        <text x="58" y="18" fill="#475569" fontSize="2" textAnchor="middle" className="font-sans select-none">KP</text>
        <text x="60" y="9" fill="#475569" fontSize="2" textAnchor="middle" className="font-sans select-none">GB</text>
        <text x="67" y="22" fill="#475569" fontSize="2" textAnchor="middle" className="font-sans select-none">AJK</text>

        {/* Route lines */}
        {layers.routeLines && routeLines.map((rl) => (
          <g key={rl.id}>
            <line
              x1={rl.fromX}
              y1={rl.fromY}
              x2={rl.toX}
              y2={rl.toY}
              stroke={routeColor(rl.type)}
              strokeWidth="0.4"
              strokeDasharray={rl.type === "scenic" ? "0.8,0.4" : rl.type === "hazard" ? "0.3,0.3" : undefined}
              opacity={0.7}
              filter="url(#routeGlow)"
            >
              {rl.type === "safe" && (
                <animate attributeName="stroke-opacity" values="0.7;0.4;0.7" dur="3s" repeatCount="indefinite" />
              )}
            </line>
            {rl.type === "hazard" && (
              <g transform={`translate(${(rl.fromX + rl.toX) / 2},${(rl.fromY + rl.toY) / 2})`}>
                <path d="M0,-0.8 L0.7,0.4 L-0.7,0.4 Z" fill="#ef4444" opacity="0.7" />
                <text x="0" y="0.3" fill="#fff" fontSize="0.5" textAnchor="middle" className="font-sans select-none pointer-events-none">!</text>
              </g>
            )}
          </g>
        ))}

        {/* Inter-city highway connections */}
        {cities.slice(0, -1).map((city, i) => {
          const next = cities[(i + 1) % cities.length];
          return (
            <line
              key={`hwy-${i}`}
              x1={city.x}
              y1={city.y}
              x2={next.x}
              y2={next.y}
              stroke="#1e3a5f"
              strokeWidth="0.3"
              strokeDasharray="0.5,0.5"
              opacity={0.4}
            />
          );
        })}

        {/* Intra-city road sketches */}
        {layers.roads && cities.map((city) => {
          const cityRds = cityRoads(city.name);
          const lines: React.ReactElement[] = [];
          const drawn = new Set<string>();
          cityRds.forEach((road) => {
            road.connectsTo.forEach((connName) => {
              const key = `${road.name}|${connName}`.split("").sort().join("");
              if (drawn.has(key)) return;
              drawn.add(key);
              const lineData = getRoadLine(road, connName);
              if (!lineData) return;
              lines.push(
                <line
                  key={`${city.id}-rd-${key}`}
                  x1={lineData.x1}
                  y1={lineData.y1}
                  x2={lineData.x2}
                  y2={lineData.y2}
                  stroke={roadColor(road.type)}
                  strokeWidth="0.2"
                  opacity={0.3}
                />
              );
            });
          });
          return <g key={`city-rds-${city.id}`}>{lines}</g>;
        })}

        {/* 3D Landmarks */}
        {layers.landmarks && landmarks.map((lm) => (
          <g
            key={lm.id}
            className="cursor-pointer"
            onMouseEnter={() => setHovered({ type: "landmark", data: lm })}
            onMouseLeave={() => setHovered(null)}
          >
            <LandmarkGraphic type={lm.type} x={lm.x} y={lm.y} scale={1.2} />
          </g>
        ))}

        {/* Travel icons */}
        {layers.travelIcons && travelIcons.map((ti) => (
          <g
            key={ti.id}
            className="cursor-pointer"
            onMouseEnter={() => setHovered({ type: "travelicon", data: ti })}
            onMouseLeave={() => setHovered(null)}
          >
            <TravelIconGraphic type={ti.type} x={ti.x} y={ti.y} scale={1} />
          </g>
        ))}

        {/* Sub-area markers */}
        {layers.subAreas &&
          subAreas.filter(subAreaMatchesFilter).map((sa) => {
            const pos = getSubAreaPosition(sa);
            const color =
              sa.safetyScore >= 75 ? "#22c55e" :
              sa.safetyScore >= 55 ? "#eab308" :
              sa.safetyScore >= 40 ? "#f97316" : "#ef4444";
            return (
              <g key={sa.id}>
                {sa.safetyScore < 45 && (
                  <circle cx={pos.x} cy={pos.y} r="1.5" fill={color} opacity="0.1">
                    <animate attributeName="r" values="1;2;1" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="0.7"
                  fill={color}
                  opacity={0.8}
                  filter="url(#subGlow)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered({ type: "subarea", data: sa })}
                  onMouseLeave={() => setHovered(null)}
                />
                {selectedCity && cities.find((c) => c.id === selectedCity)?.name === sa.city && (
                  <text
                    x={pos.x}
                    y={pos.y - 1}
                    fill="#94a3b8"
                    fontSize="1"
                    textAnchor="middle"
                    className="font-sans select-none pointer-events-none"
                  >
                    {sa.name.length > 12 ? sa.name.substring(0, 11) + "…" : sa.name}
                  </text>
                )}
              </g>
            );
          })}

        {/* Incident markers */}
        {incidents.map((inc) => {
          const city = cities.find((c) => c.name === inc.city);
          if (!city) return null;
          if (filter === "danger" && inc.severity !== "high") return null;
          if (filter === "safe" && inc.type !== "safe_area") return null;
          const meta = incidentTypeMeta[inc.type];
          const offsetX = (inc.id.charCodeAt(inc.id.length - 1) % 5) - 2;
          const offsetY = (inc.id.charCodeAt(inc.id.length - 2) % 5) - 2;
          return (
            <g key={inc.id}>
              {inc.severity === "high" && (
                <circle cx={city.x + offsetX} cy={city.y + offsetY} r="2.5" fill={meta.color} opacity="0.15">
                  <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={city.x + offsetX}
                cy={city.y + offsetY}
                r={inc.severity === "high" ? 1.2 : 0.9}
                fill={meta.color}
                filter="url(#glow)"
                className="cursor-pointer"
                onMouseEnter={() => setHovered({ type: "incident", data: inc })}
                onMouseLeave={() => setHovered(null)}
              />
            </g>
          );
        })}

        {/* City markers */}
        {cities.map((city) => {
          const isSelected = selectedCity === city.id;
          const matches = cityMatchesFilter(city);
          const scoreColor =
            city.safetyScore >= 80 ? "#22c55e" :
            city.safetyScore >= 70 ? "#eab308" :
            city.safetyScore >= 60 ? "#f97316" : "#ef4444";
          return (
            <g
              key={city.id}
              className="cursor-pointer transition-all"
              onClick={() => onSelectCity(city.id)}
              onMouseEnter={() => setHovered({ type: "city", data: city })}
              onMouseLeave={() => setHovered(null)}
              opacity={matches ? 1 : 0.3}
            >
              {isSelected && (
                <circle cx={city.x} cy={city.y} r="3.5" fill="none" stroke="#38bdf8" strokeWidth="0.4">
                  <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={city.x}
                cy={city.y}
                r={isSelected ? 2 : 1.5}
                fill={scoreColor}
                stroke="#0f172a"
                strokeWidth="0.3"
                filter="url(#glow)"
              />
              <text
                x={city.x}
                y={city.y - 2.5}
                fill={isSelected ? "#f8fafc" : "#94a3b8"}
                fontSize="1.8"
                textAnchor="middle"
                className="font-sans select-none"
              >
                {city.name}
              </text>
            </g>
          );
        })}

        {/* Compass rose */}
        <CompassRose x={88} y={90} />

        {/* Sun / Moon */}
        <SunMoon x={88} y={8} isNight={isNight} />
      </svg>

      {/* Hover tooltip */}
      {hovered && tooltipPos && (
        <div
          className="absolute z-20 pointer-events-none bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl backdrop-blur-sm max-w-[220px]"
          style={{
            left: tooltipPos.left,
            top: tooltipPos.top,
            transform: "translate(-50%, -130%)",
          }}
        >
          {hovered.type === "city" && (
            <>
              <div className="font-semibold text-slate-100">{hovered.data.name}</div>
              <div className="text-slate-400">{hovered.data.province} · {hovered.data.urduName}</div>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{
                  backgroundColor:
                    hovered.data.safetyScore >= 80 ? "#22c55e" :
                    hovered.data.safetyScore >= 70 ? "#eab308" :
                    hovered.data.safetyScore >= 60 ? "#f97316" : "#ef4444"
                }} />
                <span className="text-slate-300">Safety: {hovered.data.safetyScore}/100</span>
              </div>
            </>
          )}
          {hovered.type === "incident" && (
            <>
              <div className="font-semibold" style={{ color: incidentTypeMeta[hovered.data.type].color }}>
                {incidentTypeMeta[hovered.data.type].label}
              </div>
              <div className="text-slate-400 mt-0.5">{hovered.data.area}, {hovered.data.city}</div>
              <div className="text-slate-500 mt-1">{hovered.data.reportCount} reports</div>
            </>
          )}
          {hovered.type === "subarea" && (
            <>
              <div className="font-semibold text-slate-100">{hovered.data.name}</div>
              <div className="text-slate-400 mt-0.5">{hovered.data.urduName} · {hovered.data.city}</div>
              {hovered.data.nativeName && (
                <div className="text-slate-500">Called: {hovered.data.nativeName}</div>
              )}
              <div className="mt-1 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{
                  backgroundColor:
                    hovered.data.safetyScore >= 75 ? "#22c55e" :
                    hovered.data.safetyScore >= 55 ? "#eab308" :
                    hovered.data.safetyScore >= 40 ? "#f97316" : "#ef4444"
                }} />
                <span className="text-slate-300">Safety: {hovered.data.safetyScore}/100</span>
              </div>
              <div className="text-slate-500 mt-1 text-[10px] leading-tight">{hovered.data.description}</div>
            </>
          )}
          {hovered.type === "landmark" && (
            <>
              <div className="font-semibold text-sky-300">{hovered.data.name}</div>
              <div className="text-slate-400 mt-0.5">{hovered.data.urduName} · {hovered.data.city}</div>
              <div className="text-slate-500 mt-1 text-[10px] leading-tight">{hovered.data.description}</div>
            </>
          )}
          {hovered.type === "travelicon" && (
            <>
              <div className="font-semibold text-amber-300">{hovered.data.name}</div>
              <div className="text-slate-400 mt-0.5">{hovered.data.city}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
