import { incidents, cities, type SafetyIncident } from "./data";
import { roads, findRoadByName, type Road } from "./roads";

export type RouteSegment = {
  name: string;
  urdu?: string;
  status: "safe" | "caution" | "danger";
  note: string;
  roadType?: string;
};

export type Route = {
  id: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  totalDistance: string;
  estimatedTime: string;
  safetyRating: number;
  segments: RouteSegment[];
  tips: string[];
  nativeTerms: { term: string; meaning: string }[];
};

export function findRoute(fromCityId: string, toCityId: string): Route {
  const fromCity = cities.find((c) => c.id === fromCityId);
  const toCity = cities.find((c) => c.id === toCityId);
  if (!fromCity || !toCity) return placeholderRoute();

  const relevantIncidents = incidents.filter(
    (inc) => inc.city === fromCity.name || inc.city === toCity.name
  );

  const dangerCount = relevantIncidents.filter((i) => i.severity === "high").length;
  const safetyRating = Math.max(
    20,
    Math.min(98, Math.round((fromCity.safetyScore + toCity.safetyScore) / 2 - dangerCount * 5))
  );

  const segments = buildSegments(fromCity, toCity, relevantIncidents);
  const tips = buildTips(fromCity, toCity, relevantIncidents, segments);
  const nativeTerms = buildNativeTerms(fromCity, toCity);

  const distance = estimateDistance(fromCity, toCity);
  const time = estimateTime(distance, segments);

  return {
    id: `${fromCityId}-${toCityId}`,
    from: fromCity.name,
    to: toCity.name,
    fromCity: fromCity.name,
    toCity: toCity.name,
    totalDistance: distance,
    estimatedTime: time,
    safetyRating,
    segments,
    tips,
    nativeTerms,
  };
}

export function findRoadRoute(fromRoadName: string, toRoadName: string): Route {
  const fromRoad = findRoadByName(fromRoadName);
  const toRoad = findRoadByName(toRoadName);
  if (!fromRoad || !toRoad) return placeholderRoute();

  const segments: RouteSegment[] = [];

  // Origin road segment
  segments.push({
    name: fromRoad.name,
    urdu: fromRoad.urduName,
    status: safetyFromScore(fromRoad.safetyScore),
    note: fromRoad.description,
    roadType: fromRoad.type,
  });

  // Connecting roads
  const connectingRoads = findConnectingRoads(fromRoad, toRoad);
  for (const road of connectingRoads) {
    if (road.id === fromRoad.id || road.id === toRoad.id) continue;
    segments.push({
      name: road.name,
      urdu: road.urduName,
      status: safetyFromScore(road.safetyScore),
      note: road.description,
      roadType: road.type,
    });
  }

  // Destination road segment
  if (toRoad.id !== fromRoad.id) {
    segments.push({
      name: toRoad.name,
      urdu: toRoad.urduName,
      status: safetyFromScore(toRoad.safetyScore),
      note: toRoad.description,
      roadType: toRoad.type,
    });
  }

  const allRoads = [fromRoad, ...connectingRoads, toRoad];
  const avgSafety = Math.round(
    allRoads.reduce((a, r) => a + r.safetyScore, 0) / Math.max(allRoads.length, 1)
  );

  const tips = buildRoadTips(fromRoad, toRoad, segments);
  const nativeTerms = buildNativeTermsFromRoads(fromRoad, toRoad);
  const distance = estimateRoadDistance(allRoads);
  const time = estimateTime(distance, segments);

  return {
    id: `${fromRoad.id}-${toRoad.id}`,
    from: fromRoad.name,
    to: toRoad.name,
    fromCity: fromRoad.city,
    toCity: toRoad.city,
    totalDistance: distance,
    estimatedTime: time,
    safetyRating: avgSafety,
    segments,
    tips,
    nativeTerms,
  };
}

function findConnectingRoads(fromRoad: Road, toRoad: Road): Road[] {
  // Same city: find directly connected roads
  if (fromRoad.city === toRoad.city) {
    const visited = new Set<string>([fromRoad.id]);
    const result: Road[] = [];

    // Check if directly connected
    if (fromRoad.connectsTo.includes(toRoad.name)) {
      return [];
    }

    // Find intermediate roads
    for (const connName of fromRoad.connectsTo) {
      const conn = roads.find((r) => r.name === connName && r.city === fromRoad.city);
      if (conn && !visited.has(conn.id)) {
        visited.add(conn.id);
        if (conn.connectsTo.includes(toRoad.name) || conn.id === toRoad.id) {
          result.push(conn);
          return result;
        }
        // Check one more level
        for (const conn2Name of conn.connectsTo) {
          const conn2 = roads.find((r) => r.name === conn2Name && r.city === fromRoad.city);
          if (conn2 && !visited.has(conn2.id) && (conn2.connectsTo.includes(toRoad.name) || conn2.id === toRoad.id)) {
            result.push(conn, conn2);
            return result;
          }
        }
      }
    }
    return result;
  }

  // Different cities: find highway/motorway connectors
  const fromCityRoads = roads.filter((r) => r.city === fromRoad.city && (r.type === "highway" || r.type === "motorway"));
  const toCityRoads = roads.filter((r) => r.city === toRoad.city && (r.type === "highway" || r.type === "motorway"));
  const nationalRoads = roads.filter((r) => r.city === "Multi-city");

  // Find best exit highway from origin city
  const exitRoad = fromCityRoads.find((r) => r.connectsTo.some((c) => nationalRoads.some((n) => n.name === c))) || fromCityRoads[0];
  // Find best entry highway to destination city
  const entryRoad = toCityRoads.find((r) => r.connectsTo.some((c) => nationalRoads.some((n) => n.name === c))) || toCityRoads[0];
  // Find national highway connecting them
  const nationalConn = nationalRoads.find(
    (n) => exitRoad?.connectsTo.includes(n.name) && n.connectsTo.some((c) => entryRoad?.connectsTo.includes(c))
  ) || nationalRoads[0];

  const connectors: Road[] = [];
  if (exitRoad && exitRoad.id !== fromRoad.id) connectors.push(exitRoad);
  if (nationalConn && !connectors.some((c) => c.id === nationalConn.id)) connectors.push(nationalConn);
  if (entryRoad && entryRoad.id !== toRoad.id && !connectors.some((c) => c.id === entryRoad.id)) connectors.push(entryRoad);

  return connectors;
}

function buildRoadTips(fromRoad: Road, toRoad: Road, segments: RouteSegment[]): string[] {
  const tips: string[] = [];

  const dangerSegs = segments.filter((s) => s.status === "danger");
  if (dangerSegs.length > 0) {
    tips.push(`Avoid ${dangerSegs.map((s) => s.name).join(", ")} after dark.`);
  }

  const safeSegs = segments.filter((s) => s.status === "safe");
  if (safeSegs.length > 0) {
    tips.push(`Safer segments on this route: ${safeSegs.map((s) => s.name).join(", ")}.`);
  }

  // Find safer alternatives from incident data
  const alts = fromRoad.connectsTo
    .concat(toRoad.connectsTo)
    .filter((name) => {
      const r = roads.find((rd) => rd.name === name);
      return r && r.safetyScore > Math.min(fromRoad.safetyScore, toRoad.safetyScore);
    })
    .slice(0, 3);
  if (alts.length > 0) {
    tips.push(`Safer alternative roads: ${alts.join(", ")}.`);
  }

  if (fromRoad.city !== toRoad.city) {
    tips.push("Carry your CNIC and vehicle documents — inter-city travel may involve checkpoints.");
  }

  if (fromRoad.province === "Gilgit-Baltistan" || toRoad.province === "Gilgit-Baltistan") {
    tips.push("Check KKH road status before departing. Landslides can close sections for hours.");
  }

  if (fromRoad.timeRisk === "night" || toRoad.timeRisk === "night") {
    tips.push("Part of this route is risky at night. Plan to travel during daylight hours.");
  }

  tips.push("Keep emergency contacts saved: Police 15, Rescue 1122, Edhi 115.");
  tips.push("Share your live location with a family member before departing.");

  return tips;
}

function buildNativeTermsFromRoads(fromRoad: Road, toRoad: Road): { term: string; meaning: string }[] {
  const terms: { term: string; meaning: string }[] = [
    { term: "Shahrah", meaning: "Main road / avenue (e.g. Shahrah-e-Faisal)" },
    { term: "Chowk", meaning: "Roundabout or intersection (e.g. Kalma Chowk)" },
    { term: "Mor", meaning: "Turn or corner in Punjabi (e.g. Batti Chowk mor)" },
    { term: "Pul", meaning: "Bridge (e.g. Gulshan Pul, Ravi Pul)" },
    { term: "Bazaar", meaning: "Market area — often crowded, stay alert" },
    { term: "Adda", meaning: "Bus/vehicle stop or stand" },
    { term: "Cantt", meaning: "Cantonment — usually well-secured area" },
    { term: "Mohalla", meaning: "Neighborhood or locality" },
    { term: "Chungi", meaning: "Toll checkpoint or traffic island (common in Punjab)" },
    { term: "Pull", meaning: "Bridge or overpass in Sindh/Punjab" },
  ];

  if (fromRoad.province === "Sindh" || toRoad.province === "Sindh") {
    terms.push({ term: "Goth", meaning: "Village or small settlement in Sindh" });
  }
  if (fromRoad.province === "Khyber Pakhtunkhwa" || toRoad.province === "Khyber Pakhtunkhwa") {
    terms.push({ term: "Tehsil", meaning: "Administrative subdivision" });
    terms.push({ term: "Khad", meaning: "Dry riverbed — avoid in monsoon" });
  }
  if (fromRoad.province === "Gilgit-Baltistan" || toRoad.province === "Gilgit-Baltistan") {
    terms.push({ term: "Babusar", meaning: "High mountain pass — check before crossing" });
  }

  return terms;
}

function estimateRoadDistance(allRoads: Road[]): string {
  let totalKm = 0;
  for (let i = 0; i < allRoads.length; i++) {
    if (i === 0) {
      totalKm += 3;
    } else if (allRoads[i].city !== allRoads[i - 1].city) {
      totalKm += 80;
    } else {
      totalKm += 4;
    }
  }
  return `${totalKm} km`;
}

function buildSegments(
  fromCity: (typeof cities)[number],
  toCity: (typeof cities)[number],
  relevantIncidents: SafetyIncident[]
): RouteSegment[] {
  const cityIncidents = (cityName: string) =>
    relevantIncidents.filter((i) => i.city === cityName);

  const segs: RouteSegment[] = [];

  for (const inc of cityIncidents(fromCity.name)) {
    const status: RouteSegment["status"] =
      inc.type === "safe_area" ? "safe" : inc.severity === "high" ? "danger" : "caution";
    segs.push({ name: inc.area, status, note: inc.description });
  }

  segs.push({
    name: `Highway: ${fromCity.name} → ${toCity.name}`,
    urdu: "شاہرا",
    status: safetyFromScore((fromCity.safetyScore + toCity.safetyScore) / 2),
    note:
      fromCity.province === toCity.province
        ? `Intra-provincial travel within ${fromCity.province}.`
        : `Cross-provincial travel: ${fromCity.province} → ${toCity.province}. Plan for checkpoints.`,
  });

  for (const inc of cityIncidents(toCity.name)) {
    const status: RouteSegment["status"] =
      inc.type === "safe_area" ? "safe" : inc.severity === "high" ? "danger" : "caution";
    segs.push({ name: inc.area, status, note: inc.description });
  }

  return segs.length > 0 ? segs : [{ name: "Route planned", status: "safe", note: "No major incidents reported." }];
}

function safetyFromScore(score: number): RouteSegment["status"] {
  if (score >= 75) return "safe";
  if (score >= 55) return "caution";
  return "danger";
}

function buildTips(
  fromCity: (typeof cities)[number],
  toCity: (typeof cities)[number],
  relevantIncidents: SafetyIncident[],
  segments: RouteSegment[]
): string[] {
  const tips: string[] = [];

  const dangerSegs = segments.filter((s) => s.status === "danger");
  if (dangerSegs.length > 0) {
    tips.push(`Avoid ${dangerSegs.map((s) => s.name).join(", ")} after dark.`);
  }

  const safeSegs = segments.filter((s) => s.status === "safe");
  if (safeSegs.length > 0) {
    tips.push(`Safer zones on this route: ${safeSegs.map((s) => s.name).join(", ")}.`);
  }

  const alts = relevantIncidents
    .filter((i) => i.severity !== "low")
    .flatMap((i) => i.safeAlternatives)
    .slice(0, 3);
  if (alts.length > 0) {
    tips.push(`Recommended alternatives: ${alts.join("; ")}.`);
  }

  if (fromCity.province !== toCity.province) {
    tips.push("Carry your CNIC and vehicle documents — inter-provincial checkpoints are common.");
  }

  if (fromCity.province === "Gilgit-Baltistan" || toCity.province === "Gilgit-Baltistan") {
    tips.push("Check KKH road status before departing. Landslides can close sections for hours.");
  }

  tips.push("Keep emergency contacts saved: Police 15, Rescue 1122, Edhi 115.");
  tips.push("Share your live location with a family member before departing.");

  return tips;
}

function buildNativeTerms(
  fromCity: (typeof cities)[number],
  toCity: (typeof cities)[number]
): { term: string; meaning: string }[] {
  const terms: { term: string; meaning: string }[] = [
    { term: "Shahrah", meaning: "Main road / avenue (e.g. Shahrah-e-Faisal)" },
    { term: "Chowk", meaning: "Roundabout or intersection (e.g. Kalma Chowk)" },
    { term: "Mor", meaning: "Turn or corner in Punjabi (e.g. Batti Chowk mor)" },
    { term: "Pul", meaning: "Bridge (e.g. Gulshan Pul, Ravi Pul)" },
    { term: "Bazaar", meaning: "Market area — often crowded, stay alert" },
    { term: "Adda", meaning: "Bus/vehicle stop or stand" },
    { term: "Cantt", meaning: "Cantonment — usually well-secured area" },
    { term: "Mohalla", meaning: "Neighborhood or locality" },
  ];

  if (fromCity.province === "Sindh" || toCity.province === "Sindh") {
    terms.push({ term: "Goth", meaning: "Village or small settlement in Sindh" });
  }
  if (fromCity.province === "Khyber Pakhtunkhwa" || toCity.province === "Khyber Pakhtunkhwa") {
    terms.push({ term: "Tehsil", meaning: "Administrative subdivision" });
    terms.push({ term: "Khad", meaning: "Dry riverbed — avoid in monsoon" });
  }

  return terms;
}

function estimateDistance(
  fromCity: (typeof cities)[number],
  toCity: (typeof cities)[number]
): string {
  const dx = fromCity.x - toCity.x;
  const dy = fromCity.y - toCity.y;
  const raw = Math.sqrt(dx * dx + dy * dy);
  const km = Math.round(raw * 18);
  return `${km} km`;
}

function estimateTime(distance: string, segments: RouteSegment[]): string {
  const km = parseInt(distance);
  const hasHighway = segments.some((s) => s.name.startsWith("Highway") || s.roadType === "highway" || s.roadType === "motorway");
  const avgSpeed = hasHighway ? 60 : 35;
  const dangerPenalty = segments.filter((s) => s.status === "danger").length * 0.3;
  const hours = km / avgSpeed + dangerPenalty;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

function placeholderRoute(): Route {
  return {
    id: "none",
    from: "—",
    to: "—",
    fromCity: "—",
    toCity: "—",
    totalDistance: "—",
    estimatedTime: "—",
    safetyRating: 0,
    segments: [],
    tips: ["Select a starting road and destination road to plan your route."],
    nativeTerms: [],
  };
}
