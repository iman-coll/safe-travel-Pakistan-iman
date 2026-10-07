export type LandmarkType =
  | "faisal_mosque"
  | "badshahi_mosque"
  | "mazar_e_quaid"
  | "mountain_peaks"
  | "coastline"
  | "shrine"
  | "fort"
  | "lake";

export type Landmark = {
  id: string;
  type: LandmarkType;
  name: string;
  urduName: string;
  city: string;
  x: number;
  y: number;
  description: string;
};

export const landmarks: Landmark[] = [
  { id: "lm-01", type: "faisal_mosque", name: "Faisal Mosque", urduName: "فیصل مسجد", city: "Islamabad", x: 62, y: 28, description: "Iconic tent-shaped mosque at the foot of Margalla Hills." },
  { id: "lm-02", type: "badshahi_mosque", name: "Badshahi Mosque", urduName: "بدشاہی مسجد", city: "Lahore", x: 55, y: 38, description: "Mughal-era grand mosque with massive domes and minarets." },
  { id: "lm-03", type: "mazar_e_quaid", name: "Mazar-e-Quaid", urduName: "مزار قائد", city: "Karachi", x: 22, y: 76, description: "Marble mausoleum of Quaid-e-Azam Muhammad Ali Jinnah." },
  { id: "lm-04", type: "mountain_peaks", name: "Hunza Peaks", urduName: "ہنزہ چوٹیاں", city: "Gilgit", x: 60, y: 6, description: "Snow-capped peaks of the Karakoram range with hikers and tents." },
  { id: "lm-05", type: "coastline", name: "Gwadar Coast", urduName: "گواردر ساحل", city: "Gwadar", x: 15, y: 55, description: "Curved Makran coastline with fishing boats and palm trees." },
  { id: "lm-06", type: "shrine", name: "Shah Rukn-e-Alam", urduName: "شاہ رکن عالم", city: "Multan", x: 38, y: 54, description: "Sufi shrine with blue dome, Multan's most famous landmark." },
  { id: "lm-07", type: "fort", name: "Rohtas Fort", urduName: "روہتاس قلعہ", city: "Rawalpindi", x: 60, y: 30, description: "Historic fort near GT Road (shown as Rawalpindi landmark)." },
  { id: "lm-08", type: "lake", name: "Saif-ul-Maluk", urduName: "سیف الملوک", city: "Muzaffarabad", x: 67, y: 17, description: "Alpine lake in Kaghan Valley near AJK border." },
];

export type TravelIconType = "airport" | "railway" | "desert_safari" | "hospital" | "hotel" | "market";

export type TravelIcon = {
  id: string;
  type: TravelIconType;
  name: string;
  city: string;
  x: number;
  y: number;
};

export const travelIcons: TravelIcon[] = [
  { id: "ti-01", type: "airport", name: "Jinnah Intl Airport", city: "Karachi", x: 24, y: 75 },
  { id: "ti-02", type: "airport", name: "Islamabad Intl Airport", city: "Islamabad", x: 58, y: 33 },
  { id: "ti-03", type: "airport", name: "Allama Iqbal Airport", city: "Lahore", x: 53, y: 38 },
  { id: "ti-04", type: "airport", name: "Bacha Khan Airport", city: "Peshawar", x: 54, y: 19 },
  { id: "ti-05", type: "railway", name: "Karachi City Station", city: "Karachi", x: 21, y: 77 },
  { id: "ti-06", type: "railway", name: "Lahore Junction", city: "Lahore", x: 56, y: 39 },
  { id: "ti-07", type: "railway", name: "Rawalpindi Station", city: "Rawalpindi", x: 61, y: 31 },
  { id: "ti-08", type: "railway", name: "Multan Cantt Station", city: "Multan", x: 39, y: 55 },
  { id: "ti-09", type: "railway", name: "Peshawar Cantt Station", city: "Peshawar", x: 55, y: 21 },
  { id: "ti-10", type: "railway", name: "Sukkur Junction", city: "Sukkur", x: 33, y: 61 },
  { id: "ti-11", type: "desert_safari", name: "Cholistan Desert", city: "Bahawalpur", x: 43, y: 48 },
  { id: "ti-12", type: "desert_safari", name: "Thar Desert", city: "Hyderabad", x: 30, y: 70 },
  { id: "ti-13", type: "hospital", name: "PIMS Islamabad", city: "Islamabad", x: 61, y: 31 },
  { id: "ti-14", type: "hospital", name: "Aga Khan Karachi", city: "Karachi", x: 23, y: 79 },
  { id: "ti-15", type: "hospital", name: "Services Lahore", city: "Lahore", x: 54, y: 41 },
  { id: "ti-16", type: "hotel", name: "Serena Islamabad", city: "Islamabad", x: 63, y: 29 },
  { id: "ti-17", type: "hotel", name: "Pearl Continental Lahore", city: "Lahore", x: 56, y: 40 },
  { id: "ti-18", type: "hotel", name: "Movenpick Karachi", city: "Karachi", x: 21, y: 78 },
  { id: "ti-19", type: "market", name: "Empress Market", city: "Karachi", x: 20, y: 79 },
  { id: "ti-20", type: "market", name: "Anarkali Bazaar", city: "Lahore", x: 54, y: 39 },
  { id: "ti-21", type: "market", name: "Raja Bazaar", city: "Rawalpindi", x: 60, y: 32 },
];

export type RouteLine = {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  type: "safe" | "scenic" | "hazard";
  label: string;
};

export const routeLines: RouteLine[] = [
  { id: "rl-01", fromX: 62, fromY: 30, toX: 55, toY: 40, type: "safe", label: "M-2 Motorway" },
  { id: "rl-02", fromX: 55, fromY: 40, toX: 38, toY: 56, type: "safe", label: "M-3/M-4 Motorway" },
  { id: "rl-03", fromX: 38, fromY: 56, toX: 33, toY: 62, type: "safe", label: "M-5 Motorway" },
  { id: "rl-04", fromX: 33, fromY: 62, toX: 26, toY: 72, type: "safe", label: "M-6/M-9" },
  { id: "rl-05", fromX: 26, fromY: 72, toX: 22, toY: 78, type: "safe", label: "M-9 to Karachi" },
  { id: "rl-06", fromX: 62, fromY: 30, toX: 55, toY: 20, type: "safe", label: "M-1 Motorway" },
  { id: "rl-07", fromX: 57, fromY: 8, toX: 60, toY: 6, type: "scenic", label: "KKH to Hunza" },
  { id: "rl-08", fromX: 57, fromY: 8, toX: 66, toY: 20, type: "scenic", label: "Neelum Valley" },
  { id: "rl-09", fromX: 15, fromY: 55, toX: 22, toY: 78, type: "scenic", label: "Makran Coastal" },
  { id: "rl-10", fromX: 30, fromY: 32, toX: 22, toY: 78, type: "hazard", label: "N-25 Quetta-Karachi" },
  { id: "rl-11", fromX: 55, fromY: 20, toX: 57, toY: 8, type: "hazard", label: "KKH Chilas Section" },
];

export type TerrainFeature = {
  id: string;
  type: "mountain" | "desert" | "coast" | "river";
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
};

export const terrainFeatures: TerrainFeature[] = [
  { id: "tf-01", type: "mountain", x: 55, y: 5, w: 18, h: 15, label: "Himalayas & Karakoram" },
  { id: "tf-02", type: "mountain", x: 63, y: 18, w: 10, h: 10, label: "Margalla Hills" },
  { id: "tf-03", type: "desert", x: 38, y: 45, w: 14, h: 12, label: "Cholistan Desert" },
  { id: "tf-04", type: "desert", x: 28, y: 65, w: 10, h: 10, label: "Thar Desert" },
  { id: "tf-05", type: "coast", x: 12, y: 50, w: 12, h: 30, label: "Arabian Sea Coast" },
  { id: "tf-06", type: "river", x: 20, y: 40, w: 40, h: 3, label: "Indus River" },
];
