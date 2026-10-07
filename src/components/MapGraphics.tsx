import type { LandmarkType, TravelIconType } from "@/lib/landmarks";

type Props = {
  type: LandmarkType;
  x: number;
  y: number;
  scale?: number;
};

const S = 1;

export function LandmarkGraphic({ type, x, y, scale = 1 }: Props) {
  const s = scale;
  switch (type) {
    case "faisal_mosque":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          {/* Base platform */}
          <rect x="-3" y="2" width="6" height="0.8" fill="#1e3a5f" rx="0.2" />
          {/* Tent-like prayer hall */}
          <path d="M-2.5,2 L0,-2.5 L2.5,2 Z" fill="#3b82f6" opacity="0.7" />
          <path d="M-2.5,2 L0,-2.5 L2.5,2 Z" fill="none" stroke="#60a5fa" strokeWidth="0.15" />
          {/* Minaret left */}
          <rect x="-3.2" y="-1.5" width="0.5" height="3.5" fill="#2d6db5" rx="0.1" />
          <circle cx="-2.95" cy="-1.8" r="0.25" fill="#60a5fa" />
          {/* Minaret right */}
          <rect x="2.7" y="-1.5" width="0.5" height="3.5" fill="#2d6db5" rx="0.1" />
          <circle cx="2.95" cy="-1.8" r="0.25" fill="#60a5fa" />
          {/* Golden dome accent */}
          <circle cx="0" cy="-2.5" r="0.3" fill="#fbbf24" opacity="0.8" />
        </g>
      );
    case "badshahi_mosque":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          {/* Base */}
          <rect x="-3.5" y="1.5" width="7" height="0.8" fill="#8b6914" rx="0.2" />
          {/* Main dome */}
          <ellipse cx="0" cy="-1" rx="2" ry="2.5" fill="#d4a017" opacity="0.8" />
          <ellipse cx="0" cy="-1" rx="2" ry="2.5" fill="none" stroke="#fbbf24" strokeWidth="0.15" />
          {/* Crescent on top */}
          <path d="M-0.3,-3.2 Q0,-3.5 0.3,-3.2" fill="none" stroke="#fbbf24" strokeWidth="0.2" />
          {/* Side domes */}
          <ellipse cx="-2.5" cy="0" rx="0.8" ry="1.2" fill="#c49b0e" opacity="0.7" />
          <ellipse cx="2.5" cy="0" rx="0.8" ry="1.2" fill="#c49b0e" opacity="0.7" />
          {/* Minarets */}
          <rect x="-3.8" y="-1" width="0.4" height="2.5" fill="#8b6914" rx="0.1" />
          <rect x="3.4" y="-1" width="0.4" height="2.5" fill="#8b6914" rx="0.1" />
          <circle cx="-3.6" cy="-1.2" r="0.2" fill="#fbbf24" />
          <circle cx="3.6" cy="-1.2" r="0.2" fill="#fbbf24" />
        </g>
      );
    case "mazar_e_quaid":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          {/* Marble base platform */}
          <rect x="-3" y="1.5" width="6" height="0.8" fill="#e2e8f0" opacity="0.5" rx="0.2" />
          {/* Main mausoleum cube */}
          <rect x="-2" y="-1.5" width="4" height="3" fill="#f1f5f9" opacity="0.6" rx="0.3" />
          <rect x="-2" y="-1.5" width="4" height="3" fill="none" stroke="#cbd5e1" strokeWidth="0.12" rx="0.3" />
          {/* Dome */}
          <ellipse cx="0" cy="-1.8" rx="1.5" ry="1" fill="#e2e8f0" opacity="0.7" />
          <ellipse cx="0" cy="-1.8" rx="1.5" ry="1" fill="none" stroke="#cbd5e1" strokeWidth="0.12" />
          {/* Pointed top */}
          <path d="M-0.3,-2.6 L0,-3 L0.3,-2.6" fill="#cbd5e1" />
          {/* Four arches */}
          <path d="M-1.5,-0.5 Q-1.5,0.5 -1,0.5" fill="none" stroke="#94a3b8" strokeWidth="0.1" />
          <path d="M1.5,-0.5 Q1.5,0.5 1,0.5" fill="none" stroke="#94a3b8" strokeWidth="0.1" />
        </g>
      );
    case "mountain_peaks":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          {/* Back peak */}
          <path d="M-5,2 L-1,-3 L3,2 Z" fill="#475569" opacity="0.6" />
          {/* Snow cap back */}
          <path d="M-1.8,-1.8 L-1,-3 L-0.2,-1.8 Z" fill="#e2e8f0" opacity="0.8" />
          {/* Front peak */}
          <path d="M-2,2 L2,-4 L6,2 Z" fill="#334155" opacity="0.7" />
          {/* Snow cap front */}
          <path d="M0.8,-2.5 L2,-4 L3.2,-2.5 Z" fill="#f8fafc" opacity="0.9" />
          {/* Middle peak */}
          <path d="M-4,2 L0,-2 L4,2 Z" fill="#3f4d63" opacity="0.65" />
          {/* Snow cap middle */}
          <path d="M-0.8,-0.8 L0,-2 L0.8,-0.8 Z" fill="#f1f5f9" opacity="0.85" />
          {/* Tiny tent */}
          <path d="M-3.5,2 L-3,1.5 L-2.5,2 Z" fill="#f97316" opacity="0.8" />
          <path d="M2.5,2 L3,1.5 L3.5,2 Z" fill="#ef4444" opacity="0.7" />
          {/* Hiker dot */}
          <circle cx="0" cy="1.5" r="0.2" fill="#22c55e" />
        </g>
      );
    case "coastline":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          {/* Water */}
          <path d="M-5,1 Q-3,0.5 0,1 Q3,1.5 5,1 L5,4 L-5,4 Z" fill="#0c4a6e" opacity="0.5" />
          {/* Wave lines */}
          <path d="M-4,1.5 Q-2,1 0,1.5 Q2,2 4,1.5" fill="none" stroke="#38bdf8" strokeWidth="0.1" opacity="0.6" />
          <path d="M-4,2.5 Q-2,2 0,2.5 Q2,3 4,2.5" fill="none" stroke="#38bdf8" strokeWidth="0.08" opacity="0.4" />
          {/* Palm tree */}
          <line x1="-3" y1="0.5" x2="-3" y2="2.5" stroke="#84cc16" strokeWidth="0.15" />
          <path d="M-3,0.5 Q-4,0.2 -4.2,0.8" fill="none" stroke="#65a30d" strokeWidth="0.12" />
          <path d="M-3,0.5 Q-2,0.2 -1.8,0.8" fill="none" stroke="#65a30d" strokeWidth="0.12" />
          <path d="M-3,0.5 Q-3.5,0 -3.2,-0.3" fill="none" stroke="#65a30d" strokeWidth="0.12" />
          <path d="M-3,0.5 Q-2.5,0 -2.8,-0.3" fill="none" stroke="#65a30d" strokeWidth="0.12" />
          {/* Boat */}
          <path d="M1,1.5 L3,1.5 L2.5,2.2 L1.5,2.2 Z" fill="#92400e" opacity="0.8" />
          <line x1="2" y1="1.5" x2="2" y2="0.3" stroke="#92400e" strokeWidth="0.08" />
          <path d="M2,0.5 L2.8,1.3 L2,1.3 Z" fill="#f8fafc" opacity="0.7" />
          {/* Second palm */}
          <line x1="3.5" y1="0" x2="3.5" y2="1.5" stroke="#84cc16" strokeWidth="0.12" />
          <path d="M3.5,0 Q4.5,-0.3 4.7,0.3" fill="none" stroke="#65a30d" strokeWidth="0.1" />
          <path d="M3.5,0 Q2.5,-0.3 2.3,0.3" fill="none" stroke="#65a30d" strokeWidth="0.1" />
        </g>
      );
    case "shrine":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <rect x="-2" y="1" width="4" height="0.6" fill="#1e293b" rx="0.15" />
          <rect x="-1.5" y="-1" width="3" height="2" fill="#1e40af" opacity="0.5" rx="0.2" />
          <ellipse cx="0" cy="-1.2" rx="1.2" ry="0.8" fill="#3b82f6" opacity="0.6" />
          <path d="M-0.2,-1.8 L0,-2.2 L0.2,-1.8" fill="#fbbf24" />
        </g>
      );
    case "fort":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <rect x="-2.5" y="0.5" width="5" height="1.5" fill="#78350f" opacity="0.6" rx="0.1" />
          <rect x="-2.5" y="0" width="0.8" height="0.5" fill="#78350f" opacity="0.7" />
          <rect x="-1" y="0" width="0.8" height="0.5" fill="#78350f" opacity="0.7" />
          <rect x="0.5" y="0" width="0.8" height="0.5" fill="#78350f" opacity="0.7" />
          <rect x="2" y="0" width="0.8" height="0.5" fill="#78350f" opacity="0.7" />
          <rect x="-1" y="-1.5" width="2" height="2" fill="#92400e" opacity="0.5" rx="0.15" />
          <path d="M-1,-1.5 L0,-2.5 L1,-1.5" fill="#92400e" opacity="0.6" />
        </g>
      );
    case "lake":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <ellipse cx="0" cy="0" rx="3" ry="1.5" fill="#0c4a6e" opacity="0.4" />
          <ellipse cx="0" cy="0" rx="3" ry="1.5" fill="none" stroke="#38bdf8" strokeWidth="0.12" opacity="0.5" />
          {/* Mountains behind lake */}
          <path d="M-3,-1 L-1,-3 L1,-1" fill="#334155" opacity="0.5" />
          <path d="M0,-1 L2,-3 L4,-1" fill="#3f4d63" opacity="0.5" />
          {/* Reflection */}
          <path d="M-2,0.5 Q0,1 2,0.5" fill="none" stroke="#38bdf8" strokeWidth="0.08" opacity="0.3" />
        </g>
      );
    default:
      return null;
  }
}

type IconProps = {
  type: TravelIconType;
  x: number;
  y: number;
  scale?: number;
};

export function TravelIconGraphic({ type, x, y, scale = 1 }: IconProps) {
  const s = scale;
  switch (type) {
    case "airport":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <circle cx="0" cy="0" r="1.2" fill="#1e293b" stroke="#38bdf8" strokeWidth="0.15" opacity="0.8" />
          {/* Airplane shape */}
          <path d="M0,-0.7 L0.3,0.1 L0.8,0.3 L0.8,0.5 L0.2,0.3 L0.15,0.8 L0.35,0.9 L0.35,1 L-0.35,1 L-0.35,0.9 L-0.15,0.8 L-0.2,0.3 L-0.8,0.5 L-0.8,0.3 L-0.3,0.1 Z" fill="#38bdf8" opacity="0.9" />
        </g>
      );
    case "railway":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <circle cx="0" cy="0" r="1.2" fill="#1e293b" stroke="#f59e0b" strokeWidth="0.15" opacity="0.8" />
          {/* Train engine */}
          <rect x="-0.5" y="-0.4" width="0.9" height="0.7" fill="#f59e0b" opacity="0.85" rx="0.1" />
          <rect x="-0.3" y="-0.7" width="0.5" height="0.3" fill="#f59e0b" opacity="0.7" rx="0.05" />
          <circle cx="-0.25" cy="0.4" r="0.15" fill="#78350f" />
          <circle cx="0.25" cy="0.4" r="0.15" fill="#78350f" />
          {/* Track */}
          <line x1="-0.7" y1="0.55" x2="0.7" y2="0.55" stroke="#92400e" strokeWidth="0.06" />
        </g>
      );
    case "desert_safari":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <circle cx="0" cy="0" r="1.2" fill="#1e293b" stroke="#eab308" strokeWidth="0.15" opacity="0.8" />
          {/* Camel */}
          <path d="M-0.5,0.2 Q-0.3,-0.3 -0.1,0.2 L0.1,0.2 Q0.3,-0.4 0.5,0.2" fill="none" stroke="#eab308" strokeWidth="0.12" />
          <line x1="-0.3" y1="0.2" x2="-0.3" y2="0.5" stroke="#eab308" strokeWidth="0.08" />
          <line x1="0.3" y1="0.2" x2="0.3" y2="0.5" stroke="#eab308" strokeWidth="0.08" />
          <line x1="0.5" y1="0.2" x2="0.6" y2="-0.1" stroke="#eab308" strokeWidth="0.08" />
          <circle cx="0.6" cy="-0.15" r="0.08" fill="#eab308" />
          {/* Dunes */}
          <path d="M-0.8,0.5 Q-0.4,0.3 0,0.5 Q0.4,0.3 0.8,0.5" fill="none" stroke="#eab308" strokeWidth="0.06" opacity="0.5" />
        </g>
      );
    case "hospital":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <circle cx="0" cy="0" r="1" fill="#1e293b" stroke="#ef4444" strokeWidth="0.15" opacity="0.8" />
          <rect x="-0.15" y="-0.5" width="0.3" height="0.9" fill="#ef4444" opacity="0.9" />
          <rect x="-0.45" y="-0.2" width="0.9" height="0.3" fill="#ef4444" opacity="0.9" />
        </g>
      );
    case "hotel":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <circle cx="0" cy="0" r="1" fill="#1e293b" stroke="#a855f7" strokeWidth="0.15" opacity="0.8" />
          <rect x="-0.3" y="-0.5" width="0.6" height="0.9" fill="#a855f7" opacity="0.8" rx="0.05" />
          <rect x="-0.2" y="-0.35" width="0.15" height="0.15" fill="#1e293b" />
          <rect x="0.05" y="-0.35" width="0.15" height="0.15" fill="#1e293b" />
          <rect x="-0.2" y="-0.1" width="0.15" height="0.15" fill="#1e293b" />
          <rect x="0.05" y="-0.1" width="0.15" height="0.15" fill="#1e293b" />
        </g>
      );
    case "market":
      return (
        <g transform={`translate(${x},${y}) scale(${s})`}>
          <circle cx="0" cy="0" r="1" fill="#1e293b" stroke="#84cc16" strokeWidth="0.15" opacity="0.8" />
          {/* Shopping bag */}
          <path d="M-0.3,-0.1 L0.3,-0.1 L0.4,0.5 L-0.4,0.5 Z" fill="#84cc16" opacity="0.8" />
          <path d="M-0.2,-0.1 Q-0.2,-0.35 0,-0.35 Q0.2,-0.35 0.2,-0.1" fill="none" stroke="#84cc16" strokeWidth="0.1" />
        </g>
      );
    default:
      return null;
  }
}

export function CompassRose({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} className="select-none pointer-events-none">
      <circle cx="0" cy="0" r="3.5" fill="#0f172a" stroke="#334155" strokeWidth="0.15" opacity="0.7" />
      <circle cx="0" cy="0" r="2.8" fill="none" stroke="#475569" strokeWidth="0.08" />
      {/* N arrow */}
      <path d="M0,-3 L0.5,0 L0,0.5 L-0.5,0 Z" fill="#ef4444" opacity="0.8" />
      {/* S arrow */}
      <path d="M0,3 L0.5,0 L0,-0.5 L-0.5,0 Z" fill="#64748b" opacity="0.6" />
      <text x="0" y="-3.8" fill="#94a3b8" fontSize="1.2" textAnchor="middle" className="font-sans">N</text>
      <text x="0" y="4.5" fill="#64748b" fontSize="1" textAnchor="middle" className="font-sans">S</text>
      <text x="-4" y="0.3" fill="#64748b" fontSize="1" textAnchor="middle" className="font-sans">W</text>
      <text x="4" y="0.3" fill="#64748b" fontSize="1" textAnchor="middle" className="font-sans">E</text>
    </g>
  );
}

export function SunMoon({ x, y, isNight }: { x: number; y: number; isNight: boolean }) {
  return (
    <g transform={`translate(${x},${y})`} className="select-none pointer-events-none">
      {isNight ? (
        <g>
          <circle cx="0" cy="0" r="2" fill="#1e293b" stroke="#64748b" strokeWidth="0.12" />
          <circle cx="-0.6" cy="-0.4" r="1.8" fill="#0f172a" />
          {/* Stars */}
          <circle cx="2.5" cy="-1.5" r="0.15" fill="#cbd5e1" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="-2.8" cy="0.5" r="0.12" fill="#cbd5e1" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="2" cy="1.8" r="0.1" fill="#cbd5e1" opacity="0.7" />
        </g>
      ) : (
        <g>
          <circle cx="0" cy="0" r="1.5" fill="#fbbf24" opacity="0.8">
            <animate attributeName="r" values="1.5;1.7;1.5" dur="4s" repeatCount="indefinite" />
          </circle>
          {/* Rays */}
          <line x1="0" y1="-2.5" x2="0" y2="-1.8" stroke="#fbbf24" strokeWidth="0.15" opacity="0.5" />
          <line x1="0" y1="2.5" x2="0" y2="1.8" stroke="#fbbf24" strokeWidth="0.15" opacity="0.5" />
          <line x1="-2.5" y1="0" x2="-1.8" y2="0" stroke="#fbbf24" strokeWidth="0.15" opacity="0.5" />
          <line x1="2.5" y1="0" x2="1.8" y2="0" stroke="#fbbf24" strokeWidth="0.15" opacity="0.5" />
          <line x1="-1.8" y1="-1.8" x2="-1.3" y2="-1.3" stroke="#fbbf24" strokeWidth="0.12" opacity="0.4" />
          <line x1="1.8" y1="-1.8" x2="1.3" y2="-1.3" stroke="#fbbf24" strokeWidth="0.12" opacity="0.4" />
          <line x1="-1.8" y1="1.8" x2="-1.3" y2="1.3" stroke="#fbbf24" strokeWidth="0.12" opacity="0.4" />
          <line x1="1.8" y1="1.8" x2="1.3" y2="1.3" stroke="#fbbf24" strokeWidth="0.12" opacity="0.4" />
        </g>
      )}
    </g>
  );
}
