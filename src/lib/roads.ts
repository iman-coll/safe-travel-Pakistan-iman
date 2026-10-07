export type RoadType =
  | "highway"
  | "motorway"
  | "road"
  | "bridge"
  | "chowk"
  | "roundabout"
  | "flyover"
  | "u_turn"
  | "bazaar_road";

export type Road = {
  id: string;
  name: string;
  urduName: string;
  type: RoadType;
  city: string;
  province: string;
  safetyScore: number;
  description: string;
  nativeName?: string;
  connectsTo: string[];
  timeRisk: "day" | "night" | "both";
  incidentType?: string;
};

export const roadTypeMeta: Record<
  RoadType,
  { label: string; urdu: string; color: string; icon: string }
> = {
  highway: { label: "Highway", urdu: "شاہرا", color: "#3b82f6", icon: "road" },
  motorway: { label: "Motorway", urdu: "موٹروے", color: "#0ea5e9", icon: "road" },
  road: { label: "Road", urdu: "سڑک", color: "#64748b", icon: "road" },
  bridge: { label: "Bridge", urdu: "پل", color: "#8b5cf6", icon: "bridge" },
  chowk: { label: "Chowk", urdu: "چوک", color: "#f59e0b", icon: "circle" },
  roundabout: { label: "Roundabout", urdu: "گول چکر", color: "#f59e0b", icon: "circle" },
  flyover: { label: "Flyover", urdu: "فلائی اوور", color: "#06b6d4", icon: "building" },
  u_turn: { label: "U-Turn", urdu: "یو ٹرن", color: "#ec4899", icon: "rotate-cw" },
  bazaar_road: { label: "Bazaar Road", urdu: "بازار سڑک", color: "#84cc16", icon: "shopping-cart" },
};

export const roads: Road[] = [
  // ===== KARACHI =====
  { id: "khi-01", name: "Shahrah-e-Faisal", urduName: "شاہراہ فیصل", type: "highway", city: "Karachi", province: "Sindh", safetyScore: 35, description: "Major arterial road. High phone-snatching at traffic lights. Bikers target phones from car windows.", nativeName: "Faisal Ke Raaste", connectsTo: ["Korangi Road", "Drigh Road", "Shahrah-e-Quaideen"], timeRisk: "both", incidentType: "phone_snatching" },
  { id: "khi-02", name: "Korangi Road", urduName: "کورنگی روڈ", type: "road", city: "Karachi", province: "Sindh", safetyScore: 40, description: "Poorly lit stretch near Hinochki. Accident-prone and phone snatching reported.", connectsTo: ["Shahrah-e-Faisal", "Korangi Creek Road", "Jam Sadiq Bridge"], timeRisk: "night", incidentType: "unsafe_road" },
  { id: "khi-03", name: "Korangi Creek Road", urduName: "کورنگی کریک روڈ", type: "road", city: "Karachi", province: "Sindh", safetyScore: 72, description: "Safer alternative to Korangi Road. Better lighting, less crime.", connectsTo: ["Korangi Road", "DHA Phase 8"], timeRisk: "both" },
  { id: "khi-04", name: "Clifton Bridge", urduName: "کلفتن پل", type: "bridge", city: "Karachi", province: "Sindh", safetyScore: 78, description: "Well-lit bridge connecting Clifton to Kemari. Safe crossing.", connectsTo: ["Clifton Road", "Moulvi Tamizuddin Khan Road"], timeRisk: "both" },
  { id: "khi-05", name: "Saddar", urduName: "صدر", type: "bazaar_road", city: "Karachi", province: "Sindh", safetyScore: 30, description: "Armed muggings after 10 PM. Crowded bazaar area with narrow lanes.", nativeName: "Saddar Bazaar", connectsTo: ["Preedy Street", "Empress Market Road", "Zebunnissa Street"], timeRisk: "night", incidentType: "street_crime" },
  { id: "khi-06", name: "Preedy Street", urduName: "پریڈی سٹریٹ", type: "road", city: "Karachi", province: "Sindh", safetyScore: 65, description: "Safer alternative route through Saddar. Use instead of main Saddar roads at night.", connectsTo: ["Saddar", "Abdullah Haroon Road"], timeRisk: "both" },
  { id: "khi-07", name: "Northern Bypass (M-10)", urduName: "ناردرن بائی پاس", type: "highway", city: "Karachi", province: "Sindh", safetyScore: 25, description: "Carjacking hotspot. Poor lighting, low traffic at night. Avoid after 8 PM.", connectsTo: ["RCD Highway", "Super Highway", "Lyari Expressway"], timeRisk: "night", incidentType: "street_crime" },
  { id: "khi-08", name: "RCD Highway", urduName: "آر سی ڈی ہائی وے", type: "highway", city: "Karachi", province: "Sindh", safetyScore: 68, description: "Safer alternative to Northern Bypass for west Karachi travel.", connectsTo: ["Northern Bypass (M-10)", "Mauripur Road"], timeRisk: "both" },
  { id: "khi-09", name: "Karsaz Flyover", urduName: "کار ساز فلائی اوور", type: "flyover", city: "Karachi", province: "Sindh", safetyScore: 70, description: "Flyover bypassing Karsaz intersection. Well-constructed, smooth flow.", connectsTo: ["Shahrah-e-Faisal", "Habib Ibrahim Rahimtoola Road"], timeRisk: "both" },
  { id: "khi-10", name: "Kalma Chowk", urduName: "کلمہ چوک", type: "chowk", city: "Karachi", province: "Sindh", safetyScore: 55, description: "Busy intersection. Keep windows up and phones hidden at signals.", connectsTo: ["Shahrah-e-Faisal", "University Road"], timeRisk: "both", incidentType: "phone_snatching" },
  { id: "khi-11", name: "Clifton & Boat Basin", urduName: "کلفتن اور بوٹ بیسن", type: "bazaar_road", city: "Karachi", province: "Sindh", safetyScore: 85, description: "Well-lit, patrolled, CCTV-covered. Safe for families and tourists.", connectsTo: ["Clifton Bridge", "Zamzama Boulevard"], timeRisk: "both" },
  { id: "khi-12", name: "Super Highway (M-9)", urduName: "سپر ہائی وے", type: "highway", city: "Karachi", province: "Sindh", safetyScore: 60, description: "Connects Karachi to Hyderabad. Travel in daytime; carry water.", connectsTo: ["Northern Bypass (M-10)", "Hyderabad Bypass"], timeRisk: "day" },
  { id: "khi-13", name: "Lyari Expressway", urduName: "لیاری ایکسپریس وے", type: "highway", city: "Karachi", province: "Sindh", safetyScore: 50, description: "Expressway through Lyari. Use during daytime; some crime reports at night.", connectsTo: ["Northern Bypass (M-10)", "Mauripur Road"], timeRisk: "night", incidentType: "street_crime" },
  { id: "khi-14", name: "Gulshan Chowrangi", urduName: "گلشن چوراہی", type: "roundabout", city: "Karachi", province: "Sindh", safetyScore: 62, description: "Major roundabout in Gulshan. University Road junction. Moderate safety.", connectsTo: ["University Road", "Shahrah-e-Faisal"], timeRisk: "both" },
  { id: "khi-15", name: "Nipa U-Turn", urduName: "نیپا یو ٹرن", type: "u_turn", city: "Karachi", province: "Sindh", safetyScore: 58, description: "U-turn under Nipa flyover. Congested; keep valuables hidden.", connectsTo: ["Shahrah-e-Faisal", "University Road"], timeRisk: "both" },

  // ===== LAHORE =====
  { id: "lhr-01", name: "MM Alam Road", urduName: "ایم ایم عالم روڈ", type: "road", city: "Lahore", province: "Punjab", safetyScore: 82, description: "Well-lit commercial road in Gulberg. Safe at night. Restaurants and shops stay open late.", connectsTo: ["Gulberg Main Boulevard", "Liberty Roundabout"], timeRisk: "both" },
  { id: "lhr-02", name: "Gulberg Main Boulevard", urduName: "گلبرگ مین بلیوارڈ", type: "road", city: "Lahore", province: "Punjab", safetyScore: 65, description: "Occasional bag snatching by motorbike riders, especially near Liberty roundabout at night.", connectsTo: ["MM Alam Road", "Liberty Roundabout", "Ferozepur Road"], timeRisk: "night", incidentType: "street_crime" },
  { id: "lhr-03", name: "Liberty Roundabout", urduName: "لبرٹی گول چکر", type: "roundabout", city: "Lahore", province: "Punjab", safetyScore: 68, description: "Busy roundabout. Popular shopping area. Stay alert for motorbike bag snatchers at night.", connectsTo: ["Gulberg Main Boulevard", "MM Alam Road"], timeRisk: "night", incidentType: "street_crime" },
  { id: "lhr-04", name: "DHA Phase 5-8", urduName: "ڈی ایچ اے فیز 5-8", type: "road", city: "Lahore", province: "Punjab", safetyScore: 88, description: "Safest neighborhood in Lahore. Security patrols, guarded gates, good lighting.", connectsTo: ["Barki Road", "Ferozepur Road"], timeRisk: "both" },
  { id: "lhr-05", name: "Ravi Bridge", urduName: "راوی پل", type: "bridge", city: "Lahore", province: "Punjab", safetyScore: 45, description: "Approach lanes dangerous at night. Avoid Shahdara side after dark.", connectsTo: ["Shahdara Road", "M-2 Motorway"], timeRisk: "night", incidentType: "street_crime" },
  { id: "lhr-06", name: "Shahdara", urduName: "شاہدرہ", type: "bazaar_road", city: "Lahore", province: "Punjab", safetyScore: 40, description: "Isolated sections with mugging reports. Avoid Ravi bridge approach at night.", connectsTo: ["Ravi Bridge", "M-2 Motorway"], timeRisk: "night", incidentType: "street_crime" },
  { id: "lhr-07", name: "Azadi Interchange", urduName: "آزادی انٹرچینج", type: "flyover", city: "Lahore", province: "Punjab", safetyScore: 75, description: "Modern flyover. Safer alternative for crossing Ravi River area.", connectsTo: ["M-2 Motorway", "Ravi Bridge"], timeRisk: "both" },
  { id: "lhr-08", name: "Ferozepur Road", urduName: "فیروزپور روڈ", type: "highway", city: "Lahore", province: "Punjab", safetyScore: 58, description: "Long arterial road. Some sections need caution at night.", connectsTo: ["Gulberg Main Boulevard", "DHA Phase 5-8", "Kasur Road"], timeRisk: "both" },
  { id: "lhr-09", name: "Canal Road", urduName: "نہر روڈ", type: "road", city: "Lahore", province: "Punjab", safetyScore: 70, description: "Scenic road along canal. Generally safe; avoid very late at night on isolated sections.", connectsTo: ["Thokar Nia Baig", "M-2 Motorway"], timeRisk: "both" },
  { id: "lhr-10", name: "Kalma Chowk", urduName: "کلمہ چوک", type: "chowk", city: "Lahore", province: "Punjab", safetyScore: 66, description: "Major intersection with flyover. Busy at all hours; moderate safety.", connectsTo: ["Ferozepur Road", "Gulberg Main Boulevard"], timeRisk: "both" },
  { id: "lhr-11", name: "Thokar Nia Baig", urduName: "تھوکر نیا بیگ", type: "roundabout", city: "Lahore", province: "Punjab", safetyScore: 64, description: "Major junction for M-2 and Canal Road. Busy but exercise caution at night.", connectsTo: ["Canal Road", "M-2 Motorway", "Multan Road"], timeRisk: "both" },
  { id: "lhr-12", name: "M-2 Motorway", urduName: "ایم-2 موٹروے", type: "motorway", city: "Lahore", province: "Punjab", safetyScore: 85, description: "Lahore-Islamabad motorway. Well-patrolled, emergency phones every 2km. Safe highway.", connectsTo: ["Thokar Nia Baig", "Azadi Interchange", "Islamabad Interchange"], timeRisk: "both" },

  // ===== ISLAMABAD =====
  { id: "isb-01", name: "Faisal Avenue", urduName: "فیصل ایونیو", type: "highway", city: "Islamabad", province: "Islamabad Capital", safetyScore: 90, description: "Main avenue through Islamabad. Wide, well-lit, heavily patrolled. Very safe.", connectsTo: ["F-7 Markaz", "Blue Area", "Zero Point Interchange"], timeRisk: "both" },
  { id: "isb-02", name: "Blue Area", urduName: "بلیو ایریا", type: "road", city: "Islamabad", province: "Islamabad Capital", safetyScore: 87, description: "Commercial heart of Islamabad. Active till midnight. Safe for families.", connectsTo: ["Faisal Avenue", "Jinnah Avenue"], timeRisk: "both" },
  { id: "isb-03", name: "F-7 Markaz", urduName: "ایف-7 مرکز", type: "bazaar_road", city: "Islamabad", province: "Islamabad Capital", safetyScore: 90, description: "Safest commercial zone. Kohsar Market is family-friendly and well-patrolled.", connectsTo: ["Faisal Avenue", "F-6 Markaz"], timeRisk: "both" },
  { id: "isb-04", name: "Zero Point Interchange", urduName: "زیرو پوائنٹ انٹرچینج", type: "flyover", city: "Islamabad", province: "Islamabad Capital", safetyScore: 88, description: "Major interchange connecting Islamabad to Rawalpindi. Well-lit and safe.", connectsTo: ["Faisal Avenue", "Murree Road", "IJP Road"], timeRisk: "both" },
  { id: "isb-05", name: "IJP Road", urduName: "آئی جے پی روڈ", type: "road", city: "Islamabad", province: "Islamabad Capital", safetyScore: 60, description: "Connects Islamabad to Rawalpindi industrial area. Congested; use in daytime.", connectsTo: ["Zero Point Interchange", "Murree Road"], timeRisk: "day" },
  { id: "isb-06", name: "Kashmir Highway", urduName: "کشمیر ہائی وے", type: "highway", city: "Islamabad", province: "Islamabad Capital", safetyScore: 85, description: "East-west highway through Islamabad. Well-maintained and safe.", connectsTo: ["Faisal Avenue", "Margalla Avenue"], timeRisk: "both" },
  { id: "isb-07", name: "Margalla Avenue", urduName: "مرگلہ ایونیو", type: "road", city: "Islamabad", province: "Islamabad Capital", safetyScore: 86, description: "Scenic road along Margalla Hills. Safe during day; avoid very late at night.", connectsTo: ["Kashmir Highway", "Faisal Avenue"], timeRisk: "both" },
  { id: "isb-08", name: "Faizabad Interchange", urduName: "فیض آباد انٹرچینج", type: "flyover", city: "Islamabad", province: "Islamabad Capital", safetyScore: 80, description: "Junction between Islamabad and Rawalpindi. Can be congested at rush hours.", connectsTo: ["Murree Road", "IJP Road", "Faisal Avenue"], timeRisk: "both" },

  // ===== RAWALPINDI =====
  { id: "rwp-01", name: "Murree Road", urduName: "مری روڈ", type: "highway", city: "Rawalpindi", province: "Punjab", safetyScore: 50, description: "Heavy congestion and occasional muggings near Saddar. Accidents at evening rush.", connectsTo: ["Mall Road", "Faizabad Interchange", "IJP Road"], timeRisk: "both", incidentType: "unsafe_road" },
  { id: "rwp-02", name: "Mall Road", urduName: "مال روڈ", type: "road", city: "Rawalpindi", province: "Punjab", safetyScore: 72, description: "Safer alternative to Murree Road. Cantt area, better patrolled.", connectsTo: ["Murree Road", "Cantt Road"], timeRisk: "both" },
  { id: "rwp-03", name: "Saddar", urduName: "صدر", type: "bazaar_road", city: "Rawalpindi", province: "Punjab", safetyScore: 48, description: "Crowded bazaar. Pickpocketing risk. Avoid narrow lanes after dark.", connectsTo: ["Murree Road", "Mall Road"], timeRisk: "both", incidentType: "street_crime" },
  { id: "rwp-04", name: "Cantt Road", urduName: "کینٹ روڈ", type: "road", city: "Rawalpindi", province: "Punjab", safetyScore: 78, description: "Cantonment area road. Well-secured, low crime.", connectsTo: ["Mall Road", "Murree Road"], timeRisk: "both" },
  { id: "rwp-05", name: "Committee Chowk", urduName: "کمیٹی چوک", type: "chowk", city: "Rawalpindi", province: "Punjab", safetyScore: 55, description: "Busy intersection on Murree Road. Congested; keep valuables hidden.", connectsTo: ["Murree Road", "Mall Road"], timeRisk: "both" },

  // ===== PESHAWAR =====
  { id: "psh-01", name: "Board Bazaar Road", urduName: "بورڈ بازار روڈ", type: "bazaar_road", city: "Peshawar", province: "Khyber Pakhtunkhwa", safetyScore: 48, description: "Crowded narrow lanes. Pickpocketing common. Keep valuables hidden.", connectsTo: ["GT Road", "Khyber Road"], timeRisk: "day", incidentType: "street_crime" },
  { id: "psh-02", name: "Hayatabad Phase Road", urduName: "ہایہatabاد فیز روڈ", type: "road", city: "Peshawar", province: "Khyber Pakhtunkhwa", safetyScore: 80, description: "Modern planned area. Well-lit, secure, family-friendly.", connectsTo: ["Jamrud Road", "Ring Road"], timeRisk: "both" },
  { id: "psh-03", name: "Jamrud Road", urduName: "جام روڈ", type: "highway", city: "Peshawar", province: "Khyber Pakhtunkhwa", safetyScore: 62, description: "Connects Peshawar to Khyber Pass. Travel during daylight only.", connectsTo: ["Hayatabad Phase Road", "GT Road"], timeRisk: "day" },
  { id: "psh-04", name: "GT Road (N-5)", urduName: "جی ٹی روڈ", type: "highway", city: "Peshawar", province: "Khyber Pakhtunkhwa", safetyScore: 65, description: "Grand Trunk Road through Peshawar. Busy, moderate safety in daytime.", connectsTo: ["Board Bazaar Road", "Jamrud Road", "Ring Road"], timeRisk: "day" },
  { id: "psh-05", name: "Khyber Road", urduName: "خیبر روڈ", type: "road", city: "Peshawar", province: "Khyber Pakhtunkhwa", safetyScore: 68, description: "Main city road. Cantt area safer than bazaar sections.", connectsTo: ["GT Road", "Board Bazaar Road"], timeRisk: "both" },
  { id: "psh-06", name: "Ring Road Peshawar", urduName: "رنگ روڈ", type: "highway", city: "Peshawar", province: "Khyber Pakhtunkhwa", safetyScore: 70, description: "Bypass road around Peshawar. Safer for through traffic.", connectsTo: ["GT Road", "Jamrud Road", "Hayatabad Phase Road"], timeRisk: "both" },

  // ===== MULTAN =====
  { id: "mtn-01", name: "Bosan Road", urduName: "بوسن روڈ", type: "road", city: "Multan", province: "Punjab", safetyScore: 75, description: "Well-monitored road connecting universities and residential areas. Safe.", connectsTo: ["Vehari Road", "Multan Cantt"], timeRisk: "both" },
  { id: "mtn-02", name: "Multan Cantt", urduName: "ملتان کینٹ", type: "road", city: "Multan", province: "Punjab", safetyScore: 78, description: "Cantonment area. Well-secured, low crime.", connectsTo: ["Bosan Road", "Vehari Road"], timeRisk: "both" },
  { id: "mtn-03", name: "Chungi No. 14", urduName: "چونگی نمبر 14", type: "chowk", city: "Multan", province: "Punjab", safetyScore: 60, description: "Busy intersection on Vehari Road. Congested; moderate safety.", connectsTo: ["Bosan Road", "Vehari Road"], timeRisk: "both" },

  // ===== HYDERABAD =====
  { id: "hyd-01", name: "Safari Road", urduName: "سفاری روڈ", type: "road", city: "Hyderabad", province: "Sindh", safetyScore: 45, description: "Chain snatching and poor road quality after rains. Use caution.", connectsTo: ["Auto Bazaar Road", "Thandi Sadak"], timeRisk: "both", incidentType: "street_crime" },
  { id: "hyd-02", name: "Thandi Sadak", urduName: "ٹھنڈی سڑک", type: "road", city: "Hyderabad", province: "Sindh", safetyScore: 72, description: "Cool, tree-lined road. Safer alternative to Safari Road. Popular with families.", connectsTo: ["Safari Road", "Latifabad Bypass"], timeRisk: "both" },
  { id: "hyd-03", name: "Auto Bazaar Road", urduName: "آٹو بازار روڈ", type: "bazaar_road", city: "Hyderabad", province: "Sindh", safetyScore: 50, description: "Crowded commercial road. Pickpocketing risk. Keep bags secured.", connectsTo: ["Safari Road", "Thandi Sadak"], timeRisk: "both", incidentType: "street_crime" },
  { id: "hyd-04", name: "Latifabad Bypass", urduName: "لطیف آباد بائی پاس", type: "road", city: "Hyderabad", province: "Sindh", safetyScore: 68, description: "Bypass route avoiding city center. Safer for through traffic.", connectsTo: ["Thandi Sadak", "Super Highway (M-9)"], timeRisk: "both" },

  // ===== QUETTA =====
  { id: "quet-01", name: "Jinnah Road", urduName: "جناح روڈ", type: "road", city: "Quetta", province: "Balochistan", safetyScore: 65, description: "Main city road. Cantt area is manageable. Check news before travel.", connectsTo: ["Cantt Road", "Zarghoon Road"], timeRisk: "both" },
  { id: "quet-02", name: "Cantt Road (Quetta)", urduName: "کینٹ روڈ", type: "road", city: "Quetta", province: "Balochistan", safetyScore: 72, description: "Cantonment area. Most secure part of Quetta. Well-monitored.", connectsTo: ["Jinnah Road", "Zarghoon Road"], timeRisk: "both" },
  { id: "quet-03", name: "Zarghoon Road", urduName: "زرغون روڈ", type: "road", city: "Quetta", province: "Balochistan", safetyScore: 60, description: "Major city road. Avoid outlying sections after dark.", connectsTo: ["Jinnah Road", "Cantt Road (Quetta)"], timeRisk: "day" },
  { id: "quet-04", name: "Spini Road", urduName: "سپنی روڈ", type: "road", city: "Quetta", province: "Balochistan", safetyScore: 35, description: "Outlying area. Avoid after dark. Reports of incidents.", connectsTo: ["Zarghoon Road"], timeRisk: "night", incidentType: "street_crime" },

  // ===== GILGIT / KKH =====
  { id: "gb-01", name: "Karakoram Highway (N-35)", urduName: "قراقرم ہائی وے", type: "highway", city: "Gilgit", province: "Gilgit-Baltistan", safetyScore: 65, description: "Eighth wonder of the world. Narrow sections, landslide-prone near Chilas. Travel in daylight only.", connectsTo: ["Gilgit City Road", "Chilas Road", "Hunza Valley Road"], timeRisk: "day", incidentType: "unsafe_road" },
  { id: "gb-02", name: "Gilgit City Road", urduName: "گلگت شہر روڈ", type: "road", city: "Gilgit", province: "Gilgit-Baltistan", safetyScore: 82, description: "City center road. Very low crime. Welcoming people. Road condition is the main concern.", connectsTo: ["Karakoram Highway (N-35)", "Nagar Road"], timeRisk: "both" },
  { id: "gb-03", name: "Hunza Valley Road", urduName: "ہنزہ ویلی روڈ", type: "highway", city: "Gilgit", province: "Gilgit-Baltistan", safetyScore: 80, description: "Scenic road to Hunza. Extremely safe from crime. Weather/landslides are the risk.", connectsTo: ["Karakoram Highway (N-35)", "Karimabad Bazaar Road"], timeRisk: "day" },
  { id: "gb-04", name: "Chilas Road", urduName: "چلاس روڈ", type: "highway", city: "Gilgit", province: "Gilgit-Baltistan", safetyScore: 50, description: "Narrow, landslide-prone KKH section. Rockfall after rain. Travel in convoy.", connectsTo: ["Karakoram Highway (N-35)", "Babusar Pass Road"], timeRisk: "day", incidentType: "unsafe_road" },

  // ===== MUZAFFARABAD / AJK =====
  { id: "ajk-01", name: "Neelum Valley Road", urduName: "نیلم ویلی روڈ", type: "highway", city: "Muzaffarabad", province: "Azad Kashmir", safetyScore: 78, description: "Scenic valley road. Very low crime. Landslide risk during monsoon.", connectsTo: ["Muzaffarabad City Road", "Athmuqam Road"], timeRisk: "day" },
  { id: "ajk-02", name: "Muzaffarabad City Road", urduName: "مظفر آباد شہر روڈ", type: "road", city: "Muzaffarabad", province: "Azad Kashmir", safetyScore: 85, description: "City center. Very safe. Low street crime. Welcoming community.", connectsTo: ["Neelum Valley Road", "Kohala Road"], timeRisk: "both" },
  { id: "ajk-03", name: "Kohala Road", urduName: "کوہالہ روڈ", type: "highway", city: "Muzaffarabad", province: "Azad Kashmir", safetyScore: 72, description: "Connects Muzaffarabad to Murree/Berar. Mountain road; check for landslides.", connectsTo: ["Muzaffarabad City Road", "Murree Road"], timeRisk: "day" },

  // ===== NATIONAL HIGHWAYS =====
  { id: "nat-01", name: "N-5 National Highway", urduName: "این-5 نیشنل ہائی وے", type: "highway", city: "Multi-city", province: "National", safetyScore: 65, description: "Pakistan's longest highway: Karachi to Peshawar. Generally safe in daytime. Heavy truck traffic.", connectsTo: ["Super Highway (M-9)", "GT Road (N-5)", "Multan Road"], timeRisk: "day" },
  { id: "nat-02", name: "M-1 Motorway (Peshawar-Islamabad)", urduName: "ایم-1 موٹروے", type: "motorway", city: "Multi-city", province: "National", safetyScore: 86, description: "Well-patrolled motorway. Safe, modern highway with emergency services.", connectsTo: ["M-2 Motorway", "GT Road (N-5)", "Ring Road Peshawar"], timeRisk: "both" },
  { id: "nat-03", name: "M-3 Motorway (Lahore-Abdul Hakim)", urduName: "ایم-3 موٹروے", type: "motorway", city: "Multi-city", province: "National", safetyScore: 84, description: "Lahore to Abdul Hakim. Safe, well-maintained motorway.", connectsTo: ["M-2 Motorway", "M-4 Motorway"], timeRisk: "both" },
  { id: "nat-04", name: "M-4 Motorway (Faisalabad-Multan)", urduName: "ایم-4 موٹروے", type: "motorway", city: "Multi-city", province: "National", safetyScore: 83, description: "Faisalabad to Multan. Safe, modern motorway with service areas.", connectsTo: ["M-3 Motorway", "M-5 Motorway"], timeRisk: "both" },
  { id: "nat-05", name: "M-5 Motorway (Multan-Sukkur)", urduName: "ایم-5 موٹروے", type: "motorway", city: "Multi-city", province: "National", safetyScore: 82, description: "Multan to Sukkur. New motorway, safe and well-patrolled.", connectsTo: ["M-4 Motorway", "N-5 National Highway"], timeRisk: "both" },
];

export function getRoadsByCity(cityName: string): Road[] {
  return roads.filter((r) => r.city === cityName);
}

export function searchRoads(query: string): Road[] {
  const q = query.toLowerCase().trim();
  if (!q) return roads;
  return roads.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.urduName.includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.nativeName?.toLowerCase().includes(q) ||
      roadTypeMeta[r.type].label.toLowerCase().includes(q)
  );
}

export function findRoadByName(name: string): Road | undefined {
  return roads.find((r) => r.name === name);
}

export function findRoadsBetween(fromRoadName: string, toRoadName: string): Road[] {
  const fromRoad = findRoadByName(fromRoadName);
  const toRoad = findRoadByName(toRoadName);
  if (!fromRoad || !toRoad) return [];

  // If same city, return all roads in that city that connect
  if (fromRoad.city === toRoad.city) {
    const cityRoads = getRoadsByCity(fromRoad.city);
    return cityRoads.filter(
      (r) =>
        r.id !== fromRoad.id &&
        r.id !== toRoad.id &&
        (fromRoad.connectsTo.includes(r.name) ||
          toRoad.connectsTo.includes(r.name) ||
          r.connectsTo.includes(fromRoad.name) ||
          r.connectsTo.includes(toRoad.name))
    );
  }

  // Different cities: return connecting highways between the two cities
  return roads.filter(
    (r) =>
      (r.city === fromRoad.city || r.city === toRoad.city || r.city === "Multi-city") &&
      (r.type === "highway" || r.type === "motorway" || r.type === "flyover" || r.type === "bridge")
  );
}
