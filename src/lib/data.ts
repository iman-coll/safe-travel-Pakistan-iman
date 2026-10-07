export type City = {
  id: string;
  name: string;
  urduName: string;
  province: string;
  x: number;
  y: number;
  safetyScore: number;
  population: string;
  summary: string;
};

export type SafetyIncident = {
  id: string;
  area: string;
  city: string;
  type:
    | "phone_snatching"
    | "street_crime"
    | "unsafe_road"
    | "safe_area"
    | "kidnapping"
    | "black_market";
  severity: "low" | "medium" | "high";
  description: string;
  timeOfDay: "day" | "night" | "both";
  reportCount: number;
  safeAlternatives: string[];
};

export const cities: City[] = [
  {
    id: "karachi",
    name: "Karachi",
    urduName: "کراچی",
    province: "Sindh",
    x: 22,
    y: 78,
    safetyScore: 58,
    population: "16.8M",
    summary:
      "Pakistan's largest city. Stay alert in Saddar, Korangi, and Baldia after dark. Clifton, DHA, and Gulshan are comparatively safer.",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    urduName: "حیدرآباد",
    province: "Sindh",
    x: 26,
    y: 72,
    safetyScore: 66,
    population: "1.7M",
    summary:
      "Second-largest Sindh city. Auto Bazaar and Safari Road need caution at night; central areas are manageable during the day.",
  },
  {
    id: "sukkur",
    name: "Sukkur",
    urduName: "سکھر",
    province: "Sindh",
    x: 33,
    y: 62,
    safetyScore: 70,
    population: "0.6M",
    summary:
      "Rohri and Sukkur bypass roads are generally safe during daytime; avoid riverbank isolated areas after sunset.",
  },
  {
    id: "multan",
    name: "Multan",
    urduName: "ملتان",
    province: "Punjab",
    x: 38,
    y: 56,
    safetyScore: 72,
    population: "2.0M",
    summary:
      "Historic city. Cantt and Bosan Road are well-monitored; crowded bazaars need basic pickpocket awareness.",
  },
  {
    id: "lahore",
    name: "Lahore",
    urduName: "لاہور",
    province: "Punjab",
    x: 55,
    y: 40,
    safetyScore: 74,
    population: "13.5M",
    summary:
      "Cultural capital. DHA, Gulberg, and Johar Town are safe. Avoid isolated roads in Shahdara and old city at night.",
  },
  {
    id: "faisalabad",
    name: "Faisalabad",
    urduName: "فیصل آباد",
    province: "Punjab",
    x: 50,
    y: 42,
    safetyScore: 71,
    population: "3.2M",
    summary:
      "Industrial hub. People's Colony and Madina Town are safe; western industrial areas need caution after dark.",
  },
  {
    id: "rawalpindi",
    name: "Rawalpindi",
    urduName: "راولپنڈی",
    province: "Punjab",
    x: 60,
    y: 32,
    safetyScore: 73,
    population: "2.3M",
    summary:
      "Twin city to Islamabad. Cantt and Saddar can be congested; use Mall Road or Faisal Avenue as alternates.",
  },
  {
    id: "islamabad",
    name: "Islamabad",
    urduName: "اسلام آباد",
    province: "Islamabad Capital",
    x: 62,
    y: 30,
    safetyScore: 88,
    population: "1.2M",
    summary:
      "Capital city — consistently ranked safest major city. F and G sectors are well-lit and patrolled. Blue Area stays active late.",
  },
  {
    id: "peshawar",
    name: "Peshawar",
    urduName: "پشاور",
    province: "Khyber Pakhtunkhwa",
    x: 55,
    y: 20,
    safetyScore: 64,
    population: "2.0M",
    summary:
      "Historic gateway city. Cantt and Hayatabad are safest. Avoid border-fringe areas and travel during daylight.",
  },
  {
    id: "quetta",
    name: "Quetta",
    urduName: "کوئٹہ",
    province: "Balochistan",
    x: 30,
    y: 32,
    safetyScore: 60,
    population: "1.0M",
    summary:
      "Provincial capital. Cantt and Jinnah Road are manageable. Avoid outlying hills after dark; check news before travel.",
  },
  {
    id: "gilgit",
    name: "Gilgit",
    urduName: "گلگت",
    province: "Gilgit-Baltistan",
    x: 57,
    y: 8,
    safetyScore: 80,
    population: "0.2M",
    summary:
      "Gateway to the north. Generally welcoming; road safety and weather are bigger concerns than crime. Travel in convoy on KKH.",
  },
  {
    id: "muzaffarabad",
    name: "Muzaffarabad",
    urduName: "مظفر آباد",
    province: "Azad Kashmir",
    x: 66,
    y: 20,
    safetyScore: 82,
    population: "0.2M",
    summary:
      "Capital of Azad Kashmir. Very low street crime. Main risks are landslide-prone roads during monsoon.",
  },
  {
    id: "gwadar",
    name: "Gwadar",
    urduName: "گواردر",
    province: "Balochistan",
    x: 15,
    y: 55,
    safetyScore: 67,
    population: "0.1M",
    summary:
      "Port city on the Makran coast. Developing fast. Marine Drive and port area are safe; avoid isolated coastal roads after dark.",
  },
  {
    id: "sialkot",
    name: "Sialkot",
    urduName: "سیالکوٹ",
    province: "Punjab",
    x: 58,
    y: 35,
    safetyScore: 75,
    population: "0.7M",
    summary:
      "Export hub known for sports goods and leather. Cantt and Paris Road are safe; old city areas need basic caution at night.",
  },
  {
    id: "bahawalpur",
    name: "Bahawalpur",
    urduName: "بہاولپور",
    province: "Punjab",
    x: 43,
    y: 48,
    safetyScore: 73,
    population: "0.8M",
    summary:
      "Former princely state. Cantt and Model Town are well-monitored. Cholistan desert safaris require guided tours.",
  },
  {
    id: "abbottabad",
    name: "Abbottabad",
    urduName: "ایبٹ آباد",
    province: "Khyber Pakhtunkhwa",
    x: 58,
    y: 24,
    safetyScore: 79,
    population: "0.2M",
    summary:
      "Hill city with cool climate. Cantt and Supply Bazaar are safe. Mountain roads need caution in winter.",
  },
  {
    id: "skardu",
    name: "Skardu",
    urduName: "سکردو",
    province: "Gilgit-Baltistan",
    x: 63,
    y: 12,
    safetyScore: 83,
    population: "0.1M",
    summary:
      "Gateway to Karakoram peaks. Extremely low crime. Weather and road conditions are the primary concerns.",
  },
  {
    id: "mingora",
    name: "Mingora (Swat)",
    urduName: "مینگورہ (سوات)",
    province: "Khyber Pakhtunkhwa",
    x: 53,
    y: 24,
    safetyScore: 71,
    population: "0.3M",
    summary:
      "Main city of Swat Valley. Restored tourism. Saidu Sharif and Fizagat are safe; check security updates for upper valley.",
  },
];

export const incidents: SafetyIncident[] = [
  {
    id: "inc-001",
    area: "Shahrah-e-Faisal",
    city: "Karachi",
    type: "phone_snatching",
    severity: "high",
    description:
      "Frequent phone snatching at traffic lights between Tariq Road and Korangi crossing. Bikers grab phones from car windows and rickshaws.",
    timeOfDay: "both",
    reportCount: 47,
    safeAlternatives: ["Use Korangi Creek Road", "Keep phones inside while driving", "Avoid after 9 PM"],
  },
  {
    id: "inc-002",
    area: "Saddar",
    city: "Karachi",
    type: "street_crime",
    severity: "high",
    description:
      "Armed muggings reported in Saddar after 10 PM. Target: pedestrians and people returning from markets.",
    timeOfDay: "night",
    reportCount: 31,
    safeAlternatives: ["Use Empress Market bypass", "Travel by car not foot at night", "Use Preedy Street route"],
  },
  {
    id: "inc-003",
    area: "Baldia Town / Northern Bypass",
    city: "Karachi",
    type: "unsafe_road",
    severity: "high",
    description:
      "Carjacking incidents on Northern Bypass. Poor lighting and low traffic make it a target zone.",
    timeOfDay: "night",
    reportCount: 22,
    safeAlternatives: ["Use RCD Highway instead", "Travel before 7 PM", "Do not stop for strangers"],
  },
  {
    id: "inc-004",
    area: "Korangi Road",
    city: "Karachi",
    type: "unsafe_road",
    severity: "high",
    description:
      "Accident-prone and poorly lit stretch near Hinochki. Phone snatching also reported.",
    timeOfDay: "night",
    reportCount: 18,
    safeAlternatives: ["Use Korangi Creek Road", "Use Jam Sadiq Bridge route", "Daytime travel only"],
  },
  {
    id: "inc-005",
    area: "Clifton & Boat Basin",
    city: "Karachi",
    type: "safe_area",
    severity: "low",
    description:
      "Well-lit, patrolled, CCTV-covered. Popular with families. Safe for tourists during day and early evening.",
    timeOfDay: "both",
    reportCount: 3,
    safeAlternatives: ["Park in designated areas", "Enjoy beach till sunset"],
  },
  {
    id: "inc-006",
    area: "Gulberg Main Boulevard",
    city: "Lahore",
    type: "street_crime",
    severity: "medium",
    description:
      "Occasional bag snatching by motorbike riders in Gulberg III. More frequent near Liberty roundabout.",
    timeOfDay: "night",
    reportCount: 14,
    safeAlternatives: ["Use MM Alam Road (better lit)", "Avoid walking after 11 PM", "Use ride-hailing apps"],
  },
  {
    id: "inc-007",
    area: "DHA Phase 5-8",
    city: "Lahore",
    type: "safe_area",
    severity: "low",
    description:
      "DHA Lahore is among the safest neighborhoods. Active security patrols, guarded gates, good lighting.",
    timeOfDay: "both",
    reportCount: 4,
    safeAlternatives: ["Y-Block commercial is lively till late"],
  },
  {
    id: "inc-008",
    area: "Shahdara",
    city: "Lahore",
    type: "street_crime",
    severity: "medium",
    description:
      "Isolated sections of Shahdara have reported muggings. Avoid Ravi bridge approach lanes at night.",
    timeOfDay: "night",
    reportCount: 12,
    safeAlternatives: ["Use Motorway M-2 loop", "Use Azadi Interchange", "Daytime only for old city"],
  },
  {
    id: "inc-009",
    area: "Murree Road",
    city: "Rawalpindi",
    type: "unsafe_road",
    severity: "medium",
    description:
      "Heavy congestion and occasional muggings near Saddar. Traffic accidents common at evening rush.",
    timeOfDay: "both",
    reportCount: 16,
    safeAlternatives: ["Use Mall Road", "Use Faisal Avenue via Islamabad", "Use IJP Road in daytime"],
  },
  {
    id: "inc-010",
    area: "F-7 & F-6 Markaz",
    city: "Islamabad",
    type: "safe_area",
    severity: "low",
    description:
      "Safest commercial zones in Islamabad. Kohsar Market and Super Market are family-friendly and well-patrolled.",
    timeOfDay: "both",
    reportCount: 2,
    safeAlternatives: ["Blue Area also safe till midnight"],
  },
  {
    id: "inc-011",
    area: "Board Bazar",
    city: "Peshawar",
    type: "street_crime",
    severity: "medium",
    description:
      "Pickpocketing in crowded narrow lanes. Keep valuables hidden and bags zipped and in front.",
    timeOfDay: "day",
    reportCount: 10,
    safeAlternatives: ["Use Hayatabad for shopping", "Keep to Cantt areas", "Avoid carrying large cash"],
  },
  {
    id: "inc-012",
    area: "Hayatabad",
    city: "Peshawar",
    type: "safe_area",
    severity: "low",
    description:
      "Modern planned area with good security. Phase complexes are well-lit and family-friendly.",
    timeOfDay: "both",
    reportCount: 3,
    safeAlternatives: ["Use Jamrud Road for highway access"],
  },
  {
    id: "inc-013",
    area: "Safari Road / Auto Bazaar",
    city: "Hyderabad",
    type: "street_crime",
    severity: "medium",
    description:
      "Chain snatching and road quality issues. Road deteriorates after rains, increasing accident risk.",
    timeOfDay: "both",
    reportCount: 9,
    safeAlternatives: ["Use Thandi Sadak route", "Use Latifabad bypass", "Daytime preferred"],
  },
  {
    id: "inc-014",
    area: "Thar Desert Road",
    city: "Sukkur",
    type: "unsafe_road",
    severity: "medium",
    description:
      "Long stretches without fuel, mobile signal, or help. Extreme heat risk in summer.",
    timeOfDay: "both",
    reportCount: 5,
    safeAlternatives: ["Carry water and fuel", "Travel in convoy", "Inform someone of your route"],
  },
  {
    id: "inc-015",
    area: "Cantt Area",
    city: "Quetta",
    type: "safe_area",
    severity: "low",
    description:
      "Cantt and Jinnah Road are the most secure areas. Check news before heading to outlying hills.",
    timeOfDay: "both",
    reportCount: 4,
    safeAlternatives: ["Avoid Spini Road after dark"],
  },
  {
    id: "inc-016",
    area: "KKH near Chilas",
    city: "Gilgit",
    type: "unsafe_road",
    severity: "medium",
    description:
      "Karakoram Highway sections near Chilas are narrow and landslide-prone. Rockfall after rain.",
    timeOfDay: "both",
    reportCount: 7,
    safeAlternatives: ["Travel in daylight only", "Use NATCO bus services", "Check GB traffic updates"],
  },
];

export const incidentTypeMeta: Record<
  SafetyIncident["type"],
  { label: string; urdu: string; color: string; icon: string }
> = {
  phone_snatching: {
    label: "Phone Snatching",
    urdu: "فون چوری",
    color: "#ef4444",
    icon: "smartphone",
  },
  street_crime: {
    label: "Street Crime",
    urdu: "سٹرائم کرائم",
    color: "#f97316",
    icon: "alert-triangle",
  },
  unsafe_road: {
    label: "Unsafe Road",
    urdu: "خطرناک سڑک",
    color: "#eab308",
    icon: "road",
  },
  safe_area: {
    label: "Safe Area",
    urdu: "محفوظ علاقہ",
    color: "#22c55e",
    icon: "shield-check",
  },
  kidnapping: {
    label: "Kidnapping Risk",
    urdu: "اغوا",
    color: "#dc2626",
    icon: "user-x",
  },
  black_market: {
    label: "Black Market Activity",
    urdu: "کالا بازار",
    color: "#7c3aed",
    icon: "ban",
  },
};

export const severityMeta: Record<
  SafetyIncident["severity"],
  { label: string; color: string; bg: string }
> = {
  low: { label: "Low", color: "#16a34a", bg: "bg-green-500/10" },
  medium: { label: "Medium", color: "#ca8a04", bg: "bg-amber-500/10" },
  high: { label: "High", color: "#dc2626", bg: "bg-red-500/10" },
};

export const emergencyContacts = [
  { name: "Police Emergency", number: "15", desc: "Rescue / Police nationwide" },
  { name: "Rescue 1122", number: "1122", desc: "Ambulance, fire & rescue" },
  { name: "Edhi Foundation", number: "115", desc: "Ambulance & welfare" },
  { name: "Chhipa Welfare", number: "1020", desc: "Ambulance (Karachi)" },
  { name: "Highway Police", number: "130", desc: "Motorway & highway patrol" },
  { name: "Pakistan Rangers", number: "1101", desc: "Civil armed force support" },
];
