import { cities } from "./data";

export type SubArea = {
  id: string;
  name: string;
  urduName: string;
  city: string;
  parentArea?: string;
  safetyScore: number;
  description: string;
  nativeName?: string;
  timeRisk: "day" | "night" | "both";
  incidentType?: string;
  offsetX: number;
  offsetY: number;
};

export const subAreas: SubArea[] = [
  // ===== KARACHI (40+ sub-areas) =====
  { id: "sa-khi-01", name: "Nursery", urduName: "نرسری", city: "Karachi", parentArea: "Shahrah-e-Faisal", safetyScore: 45, description: "Busy intersection on Shahrah-e-Faisal. Phone snatching hotspot at traffic signals.", nativeName: "Nursary Mor", timeRisk: "both", incidentType: "phone_snatching", offsetX: 0.5, offsetY: -1.2 },
  { id: "sa-khi-02", name: "Buns Road", urduName: "بنز روڈ", city: "Karachi", parentArea: "Saddar", safetyScore: 38, description: "Narrow road in Saddar. Pickpocketing and bag snatching. Avoid after dark.", timeRisk: "night", incidentType: "street_crime", offsetX: -1.5, offsetY: 0.5 },
  { id: "sa-khi-03", name: "Hyderi", urduName: "حیدری", city: "Karachi", parentArea: "Saddar", safetyScore: 42, description: "Popular market in Saddar. Crowded. Phone snatching at signals.", nativeName: "Hyderi Market", timeRisk: "both", incidentType: "phone_snatching", offsetX: -0.8, offsetY: -0.8 },
  { id: "sa-khi-04", name: "Manzoor Colony", urduName: "منظور کالونی", city: "Karachi", parentArea: "Korangi", safetyScore: 35, description: "Residential colony near Korangi. Street crime after dark. Use main roads.", timeRisk: "night", incidentType: "street_crime", offsetX: 1.2, offsetY: 1.5 },
  { id: "sa-khi-05", name: "Tariq Road", urduName: "طارق روڈ", city: "Karachi", parentArea: "Shahrah-e-Faisal", safetyScore: 55, description: "Popular shopping street. Daytime safe; evening phone snatching at signals.", nativeName: "Tariq Road Market", timeRisk: "both", incidentType: "phone_snatching", offsetX: 0.8, offsetY: 0.3 },
  { id: "sa-khi-06", name: "Gulshan-e-Iqbal", urduName: "گلشن اقبال", city: "Karachi", parentArea: "University Road", safetyScore: 65, description: "Large residential area. Generally safe; avoid isolated blocks after 11 PM.", timeRisk: "both", offsetX: 1.5, offsetY: -2 },
  { id: "sa-khi-07", name: "DHA Phase 4-6", urduName: "ڈی ایچ اے فیز 4-6", city: "Karachi", parentArea: "Clifton", safetyScore: 85, description: "Well-secured, patrolled, gated community. Safe for families.", timeRisk: "both", offsetX: -2, offsetY: -1 },
  { id: "sa-khi-08", name: "Korangi No. 5", urduName: "کورنگی نمبر 5", city: "Karachi", parentArea: "Korangi", safetyScore: 40, description: "Industrial-residential mix. Caution after dark. Use Korangi Creek Road.", timeRisk: "night", incidentType: "street_crime", offsetX: 2.5, offsetY: 2 },
  { id: "sa-khi-09", name: "Liaquatabad", urduName: "لیاقت آباد", city: "Karachi", parentArea: "Gulberg Town", safetyScore: 42, description: "Densely populated. Street crime. Use main Liaquat Road.", nativeName: "Lalukhet", timeRisk: "night", incidentType: "street_crime", offsetX: 0, offsetY: 2.5 },
  { id: "sa-khi-10", name: "North Nazimabad", urduName: "نارتھ ناظم آباد", city: "Karachi", parentArea: "Gulberg Town", safetyScore: 60, description: "Planned residential. Moderate safety. Blocks H and K are safer.", timeRisk: "both", offsetX: -0.5, offsetY: 4 },
  { id: "sa-khi-11", name: "Federal B Area", urduName: "فیڈرل بی ایریا", city: "Karachi", parentArea: "Gulberg Town", safetyScore: 55, description: "Residential. Moderate crime. Avoid blocks 15-18 at night.", timeRisk: "both", offsetX: 1, offsetY: 3.5 },
  { id: "sa-khi-12", name: "Malir Halt", urduName: "ملیر ہالٹ", city: "Karachi", parentArea: "Shahrah-e-Faisal", safetyScore: 45, description: "Approach to Malir. Highway robberies at night. Daytime travel.", timeRisk: "night", incidentType: "street_crime", offsetX: 3, offsetY: 1 },
  { id: "sa-khi-13", name: "Kharadar", urduName: "کھارادر", city: "Karachi", parentArea: "Saddar", safetyScore: 35, description: "Old city. Very crowded. Pickpocketing. Keep valuables hidden.", nativeName: "Kharadar Bazaar", timeRisk: "day", incidentType: "street_crime", offsetX: -2.5, offsetY: 1 },
  { id: "sa-khi-14", name: "Memon Nagar", urduName: "میمن نگر", city: "Karachi", parentArea: "Korangi", safetyScore: 48, description: "Residential near Korangi. Moderate safety. Use main roads at night.", timeRisk: "night", offsetX: 2, offsetY: 2.5 },
  { id: "sa-khi-15", name: "Zamzama", urduName: "زمزمہ", city: "Karachi", parentArea: "Clifton", safetyScore: 82, description: "Upscale commercial street in Clifton. Well-lit, safe for dining.", timeRisk: "both", offsetX: -2.5, offsetY: -1.5 },
  { id: "sa-khi-16", name: "Burns Road", urduName: "برنس روڈ", city: "Karachi", parentArea: "Saddar", safetyScore: 44, description: "Famous food street. Very crowded evenings. Pickpocketing risk.", nativeName: "Burns Road Food Street", timeRisk: "both", incidentType: "street_crime", offsetX: -1.8, offsetY: -0.3 },
  { id: "sa-khi-17", name: "Empress Market", urduName: "ایمپریس مارکیٹ", city: "Karachi", parentArea: "Saddar", safetyScore: 40, description: "Historic market. Very crowded. Pickpocketing common.", timeRisk: "day", incidentType: "street_crime", offsetX: -1.2, offsetY: 1.2 },
  { id: "sa-khi-18", name: "Gulistan-e-Johar", urduName: "گلستان جوہر", city: "Karachi", parentArea: "University Road", safetyScore: 50, description: "Large residential. Blocks 2-7 safer; outer blocks need caution.", timeRisk: "night", incidentType: "street_crime", offsetX: 2.5, offsetY: -1.5 },
  { id: "sa-khi-19", name: "Bahadurabad", urduName: "بہادر آباد", city: "Karachi", parentArea: "Gulshan-e-Iqbal", safetyScore: 68, description: "Popular commercial and residential. Well-lit main roads. Safe.", nativeName: "Bahadurabad Chowrangi", timeRisk: "both", offsetX: 1.8, offsetY: -1.5 },
  { id: "sa-khi-20", name: "Orangi Town", urduName: "اورنگی ٹاؤن", city: "Karachi", parentArea: "Baldia", safetyScore: 30, description: "Large informal settlement. High crime. Avoid after dark entirely.", timeRisk: "night", incidentType: "street_crime", offsetX: -3, offsetY: 2 },
  { id: "sa-khi-21", name: "PECHS", urduName: "پی ای سی ایچ ایس", city: "Karachi", parentArea: "Shahrah-e-Faisal", safetyScore: 70, description: "Planned residential/commercial. Block 2 and 6 are well-lit and safe.", nativeName: "Pakistan Employees Coop Housing Society", timeRisk: "both", offsetX: 0.2, offsetY: -0.5 },
  { id: "sa-khi-22", name: "Teen Talwar", urduName: "تین تلوار", city: "Karachi", parentArea: "Clifton", safetyScore: 80, description: "Iconic Clifton monument roundabout. Well-lit, patrolled. Safe.", timeRisk: "both", offsetX: -2.2, offsetY: -0.8 },
  { id: "sa-khi-23", name: "Boat Basin", urduName: "بوٹ بیسن", city: "Karachi", parentArea: "Clifton", safetyScore: 78, description: "Popular food and family area. Well-lit, safe evenings.", timeRisk: "both", offsetX: -1.8, offsetY: -0.5 },
  { id: "sa-khi-24", name: "Seaview", urduName: "سی ویو", city: "Karachi", parentArea: "Clifton", safetyScore: 75, description: "Beachfront area. Safe till sunset. Avoid beach after dark.", timeRisk: "both", offsetX: -3, offsetY: -0.5 },
  { id: "sa-khi-25", name: "NIPA Chowrangi", urduName: "نیپا چوراہی", city: "Karachi", parentArea: "University Road", safetyScore: 58, description: "Major intersection. Congested. Keep valuables hidden at signals.", timeRisk: "both", incidentType: "phone_snatching", offsetX: 1.2, offsetY: -1 },
  { id: "sa-khi-26", name: "Hassan Square", urduName: "حسن اسکوائر", city: "Karachi", parentArea: "Gulshan-e-Iqbal", safetyScore: 62, description: "Residential-commercial junction. Moderate safety. Main roads OK.", timeRisk: "both", offsetX: 1, offsetY: -1.8 },
  { id: "sa-khi-27", name: "Sohrab Goth", urduName: "سہراب گوٹھ", city: "Karachi", parentArea: "Super Highway", safetyScore: 40, description: "Northern entry point. Congested bus terminal area. Caution at night.", timeRisk: "night", incidentType: "street_crime", offsetX: 3.5, offsetY: -3 },
  { id: "sa-khi-28", name: "Model Colony", urduName: "ماڈل کالونی", city: "Karachi", parentArea: "Malir", safetyScore: 55, description: "Residential near airport. Moderate safety. Use main Malir Road.", timeRisk: "both", offsetX: 3, offsetY: 0.5 },
  { id: "sa-khi-29", name: "Surjani Town", urduName: "سرجانی ٹاؤن", city: "Karachi", parentArea: "North Karachi", safetyScore: 45, description: "Far northern residential. Less developed. Caution after dark.", timeRisk: "night", incidentType: "street_crime", offsetX: -1, offsetY: 5 },
  { id: "sa-khi-30", name: "Kemari", urduName: "کیماری", city: "Karachi", parentArea: "Lyari", safetyScore: 48, description: "Port area. Use Manora ferry in daytime. Avoid dockyards at night.", timeRisk: "day", offsetX: -3.5, offsetY: 0.5 },
  { id: "sa-khi-31", name: "Gizri", urduName: "گضری", city: "Karachi", parentArea: "Clifton", safetyScore: 72, description: "Residential near Clifton. Moderate-to-safe. Main roads well-lit.", timeRisk: "both", offsetX: -2.8, offsetY: -0.3 },
  { id: "sa-khi-32", name: "Lyari", urduName: "لیاری", city: "Karachi", parentArea: "Lyari Town", safetyScore: 35, description: "Historic dense neighborhood. Street crime. Use expressway, avoid side streets.", timeRisk: "night", incidentType: "street_crime", offsetX: -2.8, offsetY: 0.8 },
  { id: "sa-khi-33", name: "SITE Area", urduName: "سائٹ ایریا", city: "Karachi", parentArea: "Industrial Zone", safetyScore: 42, description: "Industrial area. Avoid after dark. Truck traffic and poor lighting.", timeRisk: "night", incidentType: "street_crime", offsetX: -2, offsetY: 2 },
  { id: "sa-khi-34", name: "Nazimabad", urduName: "ناظم آباد", city: "Karachi", parentArea: "Gulberg Town", safetyScore: 58, description: "Central residential. Moderate safety. Main markets are busier and safer.", timeRisk: "both", offsetX: -0.3, offsetY: 3.5 },

  // ===== LAHORE (25+ sub-areas) =====
  { id: "sa-lhr-01", name: "Liberty Market", urduName: "لبرٹی مارکیٹ", city: "Lahore", parentArea: "Gulberg", safetyScore: 68, description: "Popular shopping area. Motorbike bag snatchers at night.", timeRisk: "night", incidentType: "street_crime", offsetX: -1, offsetY: 0.8 },
  { id: "sa-lhr-02", name: "Anarkali", urduName: "انارکلی", city: "Lahore", parentArea: "Old City", safetyScore: 45, description: "Historic bazaar. Very crowded. Pickpocketing. Keep wallets secure.", nativeName: "Anarkali Bazaar", timeRisk: "day", incidentType: "street_crime", offsetX: -2, offsetY: 1.5 },
  { id: "sa-lhr-03", name: "Johar Town", urduName: "جوہر ٹاؤن", city: "Lahore", parentArea: "Ferozepur Road", safetyScore: 70, description: "Large residential. Generally safe. Blocks L and M are well-patrolled.", timeRisk: "both", offsetX: 1.5, offsetY: 2 },
  { id: "sa-lhr-04", name: "Model Town", urduName: "ماڈل ٹاؤن", city: "Lahore", parentArea: "Ferozepur Road", safetyScore: 76, description: "Affluent planned residential. Gated with security. Safe.", timeRisk: "both", offsetX: 0.5, offsetY: 2.5 },
  { id: "sa-lhr-05", name: "Township", urduName: "ٹاؤن شپ", city: "Lahore", parentArea: "Ferozepur Road", safetyScore: 55, description: "Residential. Moderate crime. Avoid blocks C and D after 10 PM.", timeRisk: "night", incidentType: "street_crime", offsetX: 2, offsetY: 2.5 },
  { id: "sa-lhr-06", name: "Walled City", urduName: "اندرون شہر", city: "Lahore", parentArea: "Old City", safetyScore: 40, description: "Delhi Gate, Lohari Gate. Extremely crowded. Avoid after dark.", nativeName: "Androon Lahore", timeRisk: "day", incidentType: "street_crime", offsetX: -2.5, offsetY: 2 },
  { id: "sa-lhr-07", name: "Walton Road", urduName: "والٹن روڈ", city: "Lahore", parentArea: "Cantt", safetyScore: 72, description: "Cantt area road. Well-secured. Safe during day and evening.", timeRisk: "both", offsetX: -2.5, offsetY: -0.5 },
  { id: "sa-lhr-08", name: "Ichhra", urduName: "اشرا", city: "Lahore", parentArea: "Ferozepur Road", safetyScore: 52, description: "Famous cloth market. Very crowded. Pickpocketing risk. Daytime.", nativeName: "Ichhra Bazaar", timeRisk: "day", incidentType: "street_crime", offsetX: -1.5, offsetY: 1.5 },
  { id: "sa-lhr-09", name: "Garden Town", urduName: "گارڈن ٹاؤن", city: "Lahore", parentArea: "Ferozepur Road", safetyScore: 72, description: "Residential. Safe and well-lit. Good for families.", timeRisk: "both", offsetX: 0, offsetY: 1.5 },
  { id: "sa-lhr-10", name: "Samanabad", urduName: "سمان آباد", city: "Lahore", parentArea: "Ferozepur Road", safetyScore: 60, description: "Old residential. Moderate safety. Main boulevard safer than side streets.", timeRisk: "both", offsetX: -1, offsetY: 2.5 },
  { id: "sa-lhr-11", name: "Y-Block DHA", urduName: "وائی بلاک ڈی ایچ اے", city: "Lahore", parentArea: "DHA", safetyScore: 88, description: "Commercial hub of DHA Lahore. Safest shopping and dining. Active late.", timeRisk: "both", offsetX: 2.5, offsetY: 1 },
  { id: "sa-lhr-12", name: "Baghbanpura", urduName: "باغبان پورہ", city: "Lahore", parentArea: "Shahdara", safetyScore: 45, description: "Old residential near Shalimar Gardens. Caution at night.", timeRisk: "night", incidentType: "street_crime", offsetX: -3, offsetY: -1 },
  { id: "sa-lhr-13", name: "Fortress Stadium", urduName: "فورٹریس اسٹیڈیم", city: "Lahore", parentArea: "Cantt", safetyScore: 78, description: "Shopping and entertainment hub. Well-lit, patrolled. Safe evenings.", timeRisk: "both", offsetX: -2, offsetY: 0 },
  { id: "sa-lhr-14", name: "Mall Road", urduName: "مال روڈ", city: "Lahore", parentArea: "Cantt", safetyScore: 80, description: "Historic main boulevard. Well-monitored. Safe for tourists.", timeRisk: "both", offsetX: -1.5, offsetY: 0.5 },
  { id: "sa-lhr-15", name: "Mozang", urduName: "موزنگ", city: "Lahore", parentArea: "Old City", safetyScore: 50, description: "Dense old area. Pickpocketing risk. Daytime recommended.", timeRisk: "day", incidentType: "street_crime", offsetX: -1.8, offsetY: 1 },
  { id: "sa-lhr-16", name: "Mughalpura", urduName: "مغل پورہ", city: "Lahore", parentArea: "Shahdara", safetyScore: 48, description: "Old residential near railway workshops. Caution at night.", timeRisk: "night", incidentType: "street_crime", offsetX: -2.5, offsetY: -0.5 },
  { id: "sa-lhr-17", name: "Badami Bagh", urduName: "بادامی باغ", city: "Lahore", parentArea: "Old City", safetyScore: 40, description: "Bus terminal and wholesale market. Very crowded. Pickpocketing.", timeRisk: "day", incidentType: "street_crime", offsetX: -2.2, offsetY: 1.8 },
  { id: "sa-lhr-18", name: "Allama Iqbal Town", urduName: "علامہ اقبال ٹاؤن", city: "Lahore", parentArea: "Ferozepur Road", safetyScore: 65, description: "Large residential. Moderate-to-safe. Main blocks well-lit.", timeRisk: "both", offsetX: 1, offsetY: 2.8 },
  { id: "sa-lhr-19", name: "Bahria Town Lahore", urduName: "بحریہ ٹاؤن", city: "Lahore", parentArea: "DHA", safetyScore: 87, description: "Gated community. Very safe. Security patrols 24/7.", timeRisk: "both", offsetX: 3, offsetY: 1.5 },
  { id: "sa-lhr-20", name: "Thokar Niaz Baig", urduName: "تھوکر نیا بیگ", city: "Lahore", parentArea: "Canal Road", safetyScore: 58, description: "Major M-2 junction. Busy. Caution at night on approach roads.", timeRisk: "both", offsetX: 2.8, offsetY: 2 },

  // ===== ISLAMABAD (15+ sub-areas) =====
  { id: "sa-isb-01", name: "F-6 Markaz", urduName: "ایف-6 مرکز", city: "Islamabad", parentArea: "F-6", safetyScore: 90, description: "Super Market. Safest commercial area. Family-friendly.", timeRisk: "both", offsetX: -1.5, offsetY: -0.5 },
  { id: "sa-isb-02", name: "G-9 Markaz", urduName: "جی-9 مرکز", city: "Islamabad", parentArea: "G-9", safetyScore: 80, description: "Karachi Company area. Busy but safe. Well-lit.", nativeName: "Karachi Company", timeRisk: "both", offsetX: -1, offsetY: 1.5 },
  { id: "sa-isb-03", name: "I-8 Markaz", urduName: "آئی-8 مرکز", city: "Islamabad", parentArea: "I-8", safetyScore: 85, description: "Residential and commercial. Safe, well-lit. Good for families.", timeRisk: "both", offsetX: 0.5, offsetY: 2 },
  { id: "sa-isb-04", name: "G-11 Markaz", urduName: "جی-11 مرکز", city: "Islamabad", parentArea: "G-11", safetyScore: 78, description: "Famous food street area. Safe evenings. Well-lit.", timeRisk: "both", offsetX: -2, offsetY: 1.5 },
  { id: "sa-isb-05", name: "Bahria Town Phase 7", urduName: "بحریہ ٹاؤن فیز 7", city: "Islamabad", parentArea: "Bahria Town", safetyScore: 88, description: "Gated community. Very safe. Security patrols 24/7.", timeRisk: "both", offsetX: 2.5, offsetY: 2.5 },
  { id: "sa-isb-06", name: "Sector H-12", urduName: "سیکٹر ایچ-12", city: "Islamabad", parentArea: "Kashmir Highway", safetyScore: 70, description: "NUST university area. Safe during day. Less patrolled at night.", timeRisk: "both", offsetX: -2.5, offsetY: 0.5 },
  { id: "sa-isb-07", name: "D-Chowk", urduName: "ڈی چوک", city: "Islamabad", parentArea: "Blue Area", safetyScore: 75, description: "Political gathering point. Safe but avoid during protests/rallies.", timeRisk: "both", offsetX: 0, offsetY: 0 },
  { id: "sa-isb-08", name: "Centaurus Mall", urduName: "سینٹورس مال", city: "Islamabad", parentArea: "Blue Area", safetyScore: 85, description: "Premium shopping mall. Well-secured. Safe for families.", timeRisk: "both", offsetX: 0.5, offsetY: 0.5 },
  { id: "sa-isb-09", name: "Aabpara", urduName: "آب پارہ", city: "Islamabad", parentArea: "G-6", safetyScore: 82, description: "Market and food area. Safe. Well-patrolled.", timeRisk: "both", offsetX: -1.2, offsetY: 0.8 },
  { id: "sa-isb-10", name: "Melody Market", urduName: "میلوڈی مارکیٹ", city: "Islamabad", parentArea: "G-6", safetyScore: 83, description: "Food court and market. Very safe. Popular with families.", timeRisk: "both", offsetX: -0.8, offsetY: 0.3 },
  { id: "sa-isb-11", name: "F-7 Markaz", urduName: "ایف-7 مرکز", city: "Islamabad", parentArea: "F-7", safetyScore: 91, description: "Kohsar Market. Safest shopping. Family-friendly, well-patrolled.", timeRisk: "both", offsetX: -1.8, offsetY: -0.8 },
  { id: "sa-isb-12", name: "Diplomatic Enclave", urduName: "ڈپلومیٹک انکلیو", city: "Islamabad", parentArea: "G-5", safetyScore: 92, description: "High-security zone. Embassies. Very safe. Restricted access.", timeRisk: "both", offsetX: -0.5, offsetY: 1.2 },
  { id: "sa-isb-13", name: "Rawal Lake", urduName: "راول جھیل", city: "Islamabad", parentArea: "Margalla Hills", safetyScore: 84, description: "Scenic picnic spot. Safe in daytime. Avoid after dark.", timeRisk: "day", offsetX: 3, offsetY: 1 },

  // ===== RAWALPINDI (12 sub-areas) =====
  { id: "sa-rwp-01", name: "Raja Bazaar", urduName: "راجا بازار", city: "Rawalpindi", parentArea: "Saddar", safetyScore: 45, description: "Crowded old bazaar. Pickpocketing. Daytime only.", nativeName: "Raja Bazaar Saddar", timeRisk: "day", incidentType: "street_crime", offsetX: -1, offsetY: 0.5 },
  { id: "sa-rwp-02", name: "Commercial Market", urduName: "کمرشل مارکیٹ", city: "Rawalpindi", parentArea: "Satellite Town", safetyScore: 62, description: "Busy commercial. Moderate safety. Don't leave valuables visible.", timeRisk: "both", offsetX: 1, offsetY: -1 },
  { id: "sa-rwp-03", name: "Peshawar Road", urduName: "پشاور روڈ", city: "Rawalpindi", parentArea: "Cantt", safetyScore: 75, description: "Cantt road, well-patrolled. Safe. Connects to Islamabad via Faizabad.", timeRisk: "both", offsetX: -2, offsetY: -1 },
  { id: "sa-rwp-04", name: "Satellite Town", urduName: "سیٹلائٹ ٹاؤن", city: "Rawalpindi", parentArea: "Murree Road", safetyScore: 65, description: "Residential. Moderate safety. Main roads well-lit.", timeRisk: "both", offsetX: 1, offsetY: -0.5 },
  { id: "sa-rwp-05", name: "Chandni Chowk", urduName: "چاندنی چوک", city: "Rawalpindi", parentArea: "Murree Road", safetyScore: 55, description: "Busy intersection. Congested. Keep windows up at signals.", timeRisk: "both", incidentType: "phone_snatching", offsetX: 1.5, offsetY: 1.5 },
  { id: "sa-rwp-06", name: "Marrir Chowk", urduName: "مریڑ چوک", city: "Rawalpindi", parentArea: "Murree Road", safetyScore: 48, description: "Busy intersection. High congestion. Phone snatching at signals.", timeRisk: "both", incidentType: "phone_snatching", offsetX: 0.5, offsetY: 0.8 },
  { id: "sa-rwp-07", name: "Committee Chowk", urduName: "کمیٹی چوک", city: "Rawalpindi", parentArea: "Murree Road", safetyScore: 55, description: "Busy intersection on Murree Road. Congested; keep valuables hidden.", timeRisk: "both", offsetX: 0.8, offsetY: 0.3 },
  { id: "sa-rwp-08", name: "Tench Bhatta", urduName: "ٹینچ بھٹہ", city: "Rawalpindi", parentArea: "Cantt", safetyScore: 68, description: "Cantt residential area. Well-secured. Moderate-to-safe.", timeRisk: "both", offsetX: -2.5, offsetY: 0.5 },
  { id: "sa-rwp-09", name: "Shamsabad", urduName: "شمس آباد", city: "Rawalpindi", parentArea: "Murree Road", safetyScore: 60, description: "Commercial area on Murree Road. Busy. Moderate safety.", timeRisk: "both", offsetX: 1.2, offsetY: 1 },
  { id: "sa-rwp-10", name: "Faizabad", urduName: "فیض آباد", city: "Rawalpindi", parentArea: "Murree Road", safetyScore: 65, description: "Interchange between Islamabad and Rawalpindi. Well-lit. Safe.", timeRisk: "both", offsetX: 2, offsetY: 0.5 },
  { id: "sa-rwp-11", name: "Pir Wadhai", urduName: "پیر ودھائی", city: "Rawalpindi", parentArea: "IJP Road", safetyScore: 45, description: "Transport hub. Very congested. Pickpocketing. Daytime only.", timeRisk: "day", incidentType: "street_crime", offsetX: 2.5, offsetY: -0.5 },

  // ===== PESHAWAR (10 sub-areas) =====
  { id: "sa-psh-01", name: "Saddar Bazaar", urduName: "صدر بازار", city: "Peshawar", parentArea: "Cantt", safetyScore: 65, description: "Cantt bazaar. Better patrolled. Moderate safety.", timeRisk: "both", offsetX: -1.5, offsetY: 0.5 },
  { id: "sa-psh-02", name: "Qissa Khwani", urduName: "قصہ خوانی", city: "Peshawar", parentArea: "Old City", safetyScore: 42, description: "Historic bazaar. Very crowded. Pickpocketing.", nativeName: "Qissa Khwani Bazaar", timeRisk: "day", incidentType: "street_crime", offsetX: 0.5, offsetY: 0.8 },
  { id: "sa-psh-03", name: "University Town", urduName: "یونیورسٹی ٹاؤن", city: "Peshawar", parentArea: "Hayatabad", safetyScore: 78, description: "Academic and residential. Safe, well-lit. Good for families.", timeRisk: "both", offsetX: 1.5, offsetY: 1.5 },
  { id: "sa-psh-04", name: "Gulbahar", urduName: "گل بہار", city: "Peshawar", parentArea: "GT Road", safetyScore: 50, description: "Residential on GT Road. Moderate crime. Use main GT Road at night.", timeRisk: "night", incidentType: "street_crime", offsetX: -1.5, offsetY: -1 },
  { id: "sa-psh-05", name: "Khyber Bazaar", urduName: "خیبر بازار", city: "Peshawar", parentArea: "Old City", safetyScore: 48, description: "Old city commercial. Crowded. Daytime recommended.", timeRisk: "day", incidentType: "street_crime", offsetX: 0, offsetY: 1.2 },
  { id: "sa-psh-06", name: "Hayatabad Phase 3", urduName: "ہایہtabاد فیز 3", city: "Peshawar", parentArea: "Hayatabad", safetyScore: 80, description: "Modern planned area. Well-lit, secure. Family-friendly.", timeRisk: "both", offsetX: 2, offsetY: 1.8 },
  { id: "sa-psh-07", name: "Karkhano Market", urduName: "کرخانو مارکیٹ", city: "Peshawar", parentArea: "Jamrud Road", safetyScore: 55, description: "Border market. Smuggling concerns. Daytime only. Keep valuables hidden.", timeRisk: "day", incidentType: "black_market", offsetX: 2.5, offsetY: 0.5 },
  { id: "sa-psh-08", name: "Tehkal", urduName: "تہکال", city: "Peshawar", parentArea: "University Road", safetyScore: 60, description: "Residential near university. Moderate safety. Main road OK.", timeRisk: "both", offsetX: 1, offsetY: 0 },

  // ===== MULTAN (8 sub-areas) =====
  { id: "sa-mtn-01", name: "Chowk Ghanta Ghar", urduName: "چوک گھنٹہ گھر", city: "Multan", parentArea: "Old City", safetyScore: 50, description: "Clock tower square. Crowded. Pickpocketing. Daytime.", nativeName: "Ghanta Ghar", timeRisk: "day", incidentType: "street_crime", offsetX: -1, offsetY: 0.5 },
  { id: "sa-mtn-02", name: "Gulgasht Colony", urduName: "گلگشت کالونی", city: "Multan", parentArea: "Bosan Road", safetyScore: 72, description: "Residential near Bosan Road. Safe, well-lit. Good for families.", timeRisk: "both", offsetX: 1.5, offsetY: -0.5 },
  { id: "sa-mtn-03", name: "Baba Safra Reun", urduName: "بابا صفری رن", city: "Multan", parentArea: "Old City", safetyScore: 45, description: "Old city. Narrow streets. Caution after dark.", timeRisk: "night", incidentType: "street_crime", offsetX: -1.5, offsetY: 1 },
  { id: "sa-mtn-04", name: "Shamsabad", urduName: "شمس آباد", city: "Multan", parentArea: "Vehari Road", safetyScore: 60, description: "Residential on Vehari Road. Moderate safety. Main road OK.", timeRisk: "both", offsetX: 1.2, offsetY: 1.5 },
  { id: "sa-mtn-05", name: "Mumtazabad", urduName: "ممتاز آباد", city: "Multan", parentArea: "Vehari Road", safetyScore: 52, description: "Dense residential. Moderate crime. Use main roads.", timeRisk: "both", offsetX: 0.5, offsetY: 2 },
  { id: "sa-mtn-06", name: "Shah Rukn-e-Alam Colony", urduName: "شاہ رکن عالم کالونی", city: "Multan", parentArea: "Bosan Road", safetyScore: 68, description: "Residential near the famous shrine. Safe during day.", timeRisk: "both", offsetX: -0.5, offsetY: -1 },

  // ===== HYDERABAD (6 sub-areas) =====
  { id: "sa-hyd-01", name: "Latifabad Unit 7-8", urduName: "لطیف آباد یونٹ 7-8", city: "Hyderabad", parentArea: "Latifabad", safetyScore: 55, description: "Residential units. Moderate crime. Main roads safer at night.", timeRisk: "night", incidentType: "street_crime", offsetX: -1, offsetY: 0.5 },
  { id: "sa-hyd-02", name: "Qasimabad", urduName: "قاسم آباد", city: "Hyderabad", parentArea: "Thandi Sadak", safetyScore: 70, description: "Newer residential. Better lit, safer. Popular with families.", timeRisk: "both", offsetX: 1.5, offsetY: -0.5 },
  { id: "sa-hyd-03", name: "Hirabad", urduName: "ہیر آباد", city: "Hyderabad", parentArea: "Auto Bazaar", safetyScore: 45, description: "Old commercial. Crowded. Pickpocketing. Daytime.", timeRisk: "day", incidentType: "street_crime", offsetX: 0.5, offsetY: 1 },
  { id: "sa-hyd-04", name: "Civil Lines", urduName: "سول لائنز", city: "Hyderabad", parentArea: "Thandi Sadak", safetyScore: 75, description: "Administrative area. Well-lit, patrolled. Safe.", timeRisk: "both", offsetX: 0.8, offsetY: -1 },
  { id: "sa-hyd-05", name: "Giddu Chowk", urduName: "گڈو چوک", city: "Hyderabad", parentArea: "Auto Bazaar", safetyScore: 48, description: "Busy intersection. Congested. Daytime recommended.", timeRisk: "day", offsetX: 1, offsetY: 0.8 },

  // ===== QUETTA (7 sub-areas) =====
  { id: "sa-quet-01", name: "Passancha Road", urduName: "پسانچہ روڈ", city: "Quetta", parentArea: "Spini Road", safetyScore: 30, description: "Outlying area. High risk. Avoid after dark. Limited police.", timeRisk: "night", incidentType: "street_crime", offsetX: -1.5, offsetY: 1.5 },
  { id: "sa-quet-02", name: "Sariab Road", urduName: "سریاب روڈ", city: "Quetta", parentArea: "Zarghoon Road", safetyScore: 35, description: "Southern approach. Avoid after dark. Check news before travel.", timeRisk: "night", incidentType: "street_crime", offsetX: 0.5, offsetY: 2 },
  { id: "sa-quet-03", name: "Mezan Chowk", urduName: "میزان چوک", city: "Quetta", parentArea: "Jinnah Road", safetyScore: 65, description: "Central roundabout. Busy. Moderate safety daytime.", timeRisk: "both", offsetX: 0, offsetY: -0.5 },
  { id: "sa-quet-04", name: "Satellite Town", urduName: "سیٹلائٹ ٹاؤن", city: "Quetta", parentArea: "Jinnah Road", safetyScore: 68, description: "Residential area. Moderate-to-safe. Well-lit main roads.", timeRisk: "both", offsetX: 0.5, offsetY: -1 },
  { id: "sa-quet-05", name: "Brewery Road", urduName: "بریوری روڈ", city: "Quetta", parentArea: "Zarghoon Road", safetyScore: 55, description: "Approach to Hanna Lake. Scenic. Daytime recommended.", timeRisk: "day", offsetX: 1.5, offsetY: -0.5 },
  { id: "sa-quet-06", name: "Hanna Lake", urduName: "ہنا جھیل", city: "Quetta", parentArea: "Brewery Road", safetyScore: 70, description: "Scenic picnic spot. Safe daytime. Avoid after dark.", timeRisk: "day", offsetX: 2.5, offsetY: -1.5 },

  // ===== GILGIT / HUNZA (10 sub-areas) =====
  { id: "sa-gb-01", name: "Konodas", urduName: "کونودس", city: "Gilgit", parentArea: "Gilgit City Road", safetyScore: 78, description: "Village on KKH. Very low crime. Road condition is main concern.", timeRisk: "day", offsetX: -1, offsetY: 1 },
  { id: "sa-gb-02", name: "Karimabad Bazaar", urduName: "کریم آباد بازار", city: "Gilgit", parentArea: "Hunza Valley Road", safetyScore: 85, description: "Hunza's main bazaar. Extremely safe. Tourist-friendly.", timeRisk: "both", offsetX: 2.5, offsetY: -1.5 },
  { id: "sa-gb-03", name: "Nagar Bazaar", urduName: "نگر بازار", city: "Gilgit", parentArea: "Nagar Road", safetyScore: 82, description: "Nagar Valley bazaar. Very safe. Low crime. Road can be rough.", timeRisk: "day", offsetX: -1.5, offsetY: -0.5 },
  { id: "sa-gb-04", name: "Aliabad", urduName: "علی آباد", city: "Gilgit", parentArea: "Hunza Valley Road", safetyScore: 83, description: "Commercial center of Hunza. Safe. Tourist hub.", timeRisk: "both", offsetX: 2, offsetY: -1 },
  { id: "sa-gb-05", name: "Passu", urduName: "پاسو", city: "Gilgit", parentArea: "KKH", safetyScore: 80, description: "Famous Passu Cones village. Very safe. Remote — carry supplies.", timeRisk: "day", offsetX: 3.5, offsetY: -2.5 },
  { id: "sa-gb-06", name: "Sost", urduName: "سست", city: "Gilgit", parentArea: "KKH", safetyScore: 78, description: "Border town with China. Safe. Basic facilities. Customs checkpoint.", timeRisk: "day", offsetX: 4.5, offsetY: -3 },
  { id: "sa-gb-07", name: "Danyore", urduName: "دنیور", city: "Gilgit", parentArea: "Gilgit City Road", safetyScore: 80, description: "Suburb of Gilgit. Very low crime. Suspension bridge is a landmark.", timeRisk: "both", offsetX: -0.5, offsetY: 0.8 },
  { id: "sa-gb-08", name: "Naltar Valley", urduName: "نالتر ویلی", city: "Gilgit", parentArea: "Naltar Road", safetyScore: 85, description: "Ski resort and forest valley. Extremely safe. Road is rough.", timeRisk: "day", offsetX: -3, offsetY: -1 },

  // ===== MUZAFFARABAD (6 sub-areas) =====
  { id: "sa-ajk-01", name: "Upper Adda", urduName: "اپر اڈہ", city: "Muzaffarabad", parentArea: "Muzaffarabad City Road", safetyScore: 80, description: "Central bus/taxi stand. Safe. Good starting point for Neelum Valley.", timeRisk: "both", offsetX: 0.5, offsetY: -0.5 },
  { id: "sa-ajk-02", name: "Athmuqam", urduName: "آٹھمقام", city: "Muzaffarabad", parentArea: "Neelum Valley Road", safetyScore: 85, description: "Neelum Valley town. Extremely safe. Landslide risk in monsoon.", timeRisk: "day", offsetX: 2.5, offsetY: -1 },
  { id: "sa-ajk-03", name: "Domel", urduName: "دومل", city: "Muzaffarabad", parentArea: "Kohala Road", safetyScore: 75, description: "Junction of Neelum and Jhelum rivers. Safe. Scenic. Road caution.", timeRisk: "day", offsetX: 1.5, offsetY: 0.5 },
  { id: "sa-ajk-04", name: "Chattar", urduName: "چھتر", city: "Muzaffarabad", parentArea: "Kohala Road", safetyScore: 78, description: "Scenic spot on Muzaffarabad Road. Safe. Popular picnic area.", timeRisk: "day", offsetX: 0, offsetY: 1.5 },
  { id: "sa-ajk-05", name: "Pir Chinasi", urduName: "پیر چینسی", city: "Muzaffarabad", parentArea: "Mountain Road", safetyScore: 76, description: "Hilltop shrine. Very safe. Road is steep — drive carefully.", timeRisk: "day", offsetX: 2, offsetY: 1.5 },

  // ===== FAISALABAD (6 sub-areas) =====
  { id: "sa-fsd-01", name: "D Ground", urduName: "ڈی گراؤنڈ", city: "Faisalabad", parentArea: "People's Colony", safetyScore: 72, description: "Popular commercial area. Safe evenings. Well-lit main roads.", timeRisk: "both", offsetX: 1, offsetY: -0.5 },
  { id: "sa-fsd-02", name: "Ghulam Muhammad Abad", urduName: "غلام محمد آباد", city: "Faisalabad", parentArea: "Madina Town", safetyScore: 55, description: "Dense residential. Moderate crime. Use main roads at night.", timeRisk: "night", incidentType: "street_crime", offsetX: -0.5, offsetY: 1.5 },
  { id: "sa-fsd-03", name: "Jaranwala Road", urduName: "جڑانوالہ روڈ", city: "Faisalabad", parentArea: "Industrial Area", safetyScore: 48, description: "Industrial area approach. Caution after dark. Truck traffic.", timeRisk: "night", incidentType: "street_crime", offsetX: 2, offsetY: 1 },
  { id: "sa-fsd-04", name: "Jinnah Colony", urduName: "جناح کالونی", city: "Faisalabad", parentArea: "People's Colony", safetyScore: 70, description: "Central residential. Moderate-to-safe. Well-lit main roads.", timeRisk: "both", offsetX: 0.5, offsetY: -1 },
  { id: "sa-fsd-05", name: "Clock Tower (Ghanta Ghar)", urduName: "گھنٹہ گھر", city: "Faisalabad", parentArea: "City Center", safetyScore: 60, description: "Eight bazaars radiate from clock tower. Crowded. Daytime.", timeRisk: "day", incidentType: "street_crime", offsetX: 0, offsetY: 0.5 },

  // ===== SUKKUR (4 sub-areas) =====
  { id: "sa-skk-01", name: "Minara Road", urduName: "منارہ روڈ", city: "Sukkur", parentArea: "City Center", safetyScore: 68, description: "Main city road. Moderate safety. Busier during day.", timeRisk: "both", offsetX: 0.5, offsetY: -0.5 },
  { id: "sa-skk-02", name: "Bunder Road", urduName: "بندر روڈ", city: "Sukkur", parentArea: "Riverside", safetyScore: 60, description: "Riverside road. Avoid isolated sections after dark.", timeRisk: "night", offsetX: -0.5, offsetY: 0.5 },
  { id: "sa-skk-03", name: "Lansdowne Bridge", urduName: "لینزڈاؤن پل", city: "Sukkur", parentArea: "Riverside", safetyScore: 65, description: "Historic bridge. Safe crossing daytime. Avoid walking at night.", timeRisk: "day", offsetX: -1, offsetY: 0.8 },
  { id: "sa-skk-04", name: "Barrage Colony", urduName: "بیراج کالونی", city: "Sukkur", parentArea: "City Center", safetyScore: 72, description: "Residential near Sukkur Barrage. Safe. Well-maintained area.", timeRisk: "both", offsetX: 1, offsetY: 0.8 },

  // ===== GWADAR (5 sub-areas) =====
  { id: "sa-gwd-01", name: "Marine Drive", urduName: "میرین ڈرائیو", city: "Gwadar", parentArea: "Coast", safetyScore: 70, description: "Coastal road. Scenic. Safe daytime. Developing area.", timeRisk: "both", offsetX: 0.5, offsetY: 0.5 },
  { id: "sa-gwd-02", name: "Koh-e-Batil", urduName: "کوہ بطل", city: "Gwadar", parentArea: "Coast", safetyScore: 65, description: "Hammerhead peninsula. Scenic viewpoint. Daytime recommended.", timeRisk: "day", offsetX: -0.5, offsetY: -0.5 },
  { id: "sa-gwd-03", name: "Gwadar Port", urduName: "گواردر بندرگاہ", city: "Gwadar", parentArea: "Port", safetyScore: 72, description: "CPEC port area. Restricted access. Well-secured.", timeRisk: "both", offsetX: 1.5, offsetY: 0.8 },
  { id: "sa-gwd-04", name: "Jiwani", urduName: "جیونی", city: "Gwadar", parentArea: "Coast", safetyScore: 60, description: "Coastal town near Iran border. Remote. Travel in daytime.", timeRisk: "day", offsetX: -2.5, offsetY: 1 },

  // ===== SIALKOT (5 sub-areas) =====
  { id: "sa-slk-01", name: "Cantt", urduName: "کینٹ", city: "Sialkot", parentArea: "Cantt", safetyScore: 78, description: "Cantonment area. Well-secured, low crime. Safe.", timeRisk: "both", offsetX: -0.5, offsetY: -0.5 },
  { id: "sa-slk-02", name: "Paris Road", urduName: "پیرس روڈ", city: "Sialkot", parentArea: "Cantt", safetyScore: 75, description: "Main commercial road. Safe. Well-lit. Popular shopping.", timeRisk: "both", offsetX: 0, offsetY: 0 },
  { id: "sa-slk-03", name: "Imam Sahib", urduName: "امام صاحب", city: "Sialkot", parentArea: "Old City", safetyScore: 55, description: "Old bazaar area. Crowded. Moderate safety. Daytime.", timeRisk: "day", offsetX: 1, offsetY: 0.5 },
  { id: "sa-slk-04", name: "Daska Road", urduName: "ڈسکہ روڈ", city: "Sialkot", parentArea: "Highway", safetyScore: 62, description: "Highway to Daska. Moderate safety. Daytime travel.", timeRisk: "both", offsetX: 1.5, offsetY: -1 },

  // ===== BAHAWALPUR (5 sub-areas) =====
  { id: "sa-bwp-01", name: "Model Town", urduName: "ماڈل ٹاؤن", city: "Bahawalpur", parentArea: "Cantt", safetyScore: 75, description: "Planned residential. Safe. Well-lit. Good for families.", timeRisk: "both", offsetX: 0.5, offsetY: -0.5 },
  { id: "sa-bwp-02", name: "Farid Gate", urduName: "فرید گیٹ", city: "Bahawalpur", parentArea: "Old City", safetyScore: 50, description: "Historic gate of old city. Crowded bazaar. Daytime recommended.", timeRisk: "day", incidentType: "street_crime", offsetX: -1, offsetY: 0.5 },
  { id: "sa-bwp-03", name: "Circular Road", urduName: "سرکلر روڈ", city: "Bahawalpur", parentArea: "City Center", safetyScore: 65, description: "Main city road. Moderate safety. Well-trafficked.", timeRisk: "both", offsetX: 0, offsetY: 0 },
  { id: "sa-bwp-04", name: "Cholistan Safari", urduName: "چولستان سفاری", city: "Bahawalpur", parentArea: "Desert", safetyScore: 60, description: "Desert safari zone. Use registered guides. Travel in convoy.", timeRisk: "day", offsetX: 2, offsetY: 1.5 },

  // ===== ABBOTTABAD (4 sub-areas) =====
  { id: "sa-abt-01", name: "Supply Bazaar", urduName: "سپلائی بازار", city: "Abbottabad", parentArea: "City Center", safetyScore: 78, description: "Main market. Safe. Well-lit. Popular hill city destination.", timeRisk: "both", offsetX: 0, offsetY: 0 },
  { id: "sa-abt-02", name: "Cantt", urduName: "کینٹ", city: "Abbottabad", parentArea: "Cantt", safetyScore: 82, description: "Cantonment area. Very safe. Well-secured.", timeRisk: "both", offsetX: -0.8, offsetY: -0.5 },
  { id: "sa-abt-03", name: "Shimla Hill", urduName: "شملہ ہل", city: "Abbottabad", parentArea: "Pine Road", safetyScore: 80, description: "Scenic viewpoint. Safe daytime. Road is steep.", timeRisk: "day", offsetX: 1, offsetY: -1 },

  // ===== SKARDU (4 sub-areas) =====
  { id: "sa-skd-01", name: "Sadpara", urduName: "سدپارہ", city: "Skardu", parentArea: "KKH", safetyScore: 82, description: "Village near Sadpara Lake. Very safe. Road can be rough.", timeRisk: "day", offsetX: -1, offsetY: 0.5 },
  { id: "sa-skd-02", name: "Kachura Lake", urduName: "کاچورہ جھیل", city: "Skardu", parentArea: "Shigar Road", safetyScore: 84, description: "Shangrila Lake. Extremely safe. Tourist-friendly. Scenic.", timeRisk: "day", offsetX: 1.5, offsetY: -0.5 },
  { id: "sa-skd-03", name: "Shigar", urduName: "شگر", city: "Skardu", parentArea: "Shigar Road", safetyScore: 83, description: "Shigar Valley. Very safe. Fort restoration. Tourist destination.", timeRisk: "day", offsetX: 2, offsetY: 0.5 },

  // ===== MINGORA/SWAT (4 sub-areas) =====
  { id: "sa-mng-01", name: "Mingora City", urduName: "مینگورہ شہر", city: "Mingora (Swat)", parentArea: "City Center", safetyScore: 70, description: "Main Swat city. Restored. Moderate safety. Main bazaar busy.", timeRisk: "both", offsetX: 0, offsetY: 0 },
  { id: "sa-mng-02", name: "Saidu Sharif", urduName: "سیدو شریف", city: "Mingora (Swat)", parentArea: "Cantt", safetyScore: 73, description: "Administrative center. Safer than Mingora. Well-patrolled.", timeRisk: "both", offsetX: -0.5, offsetY: -0.5 },
  { id: "sa-mng-03", name: "Malam Jabba", urduName: "مالم جبہ", city: "Mingora (Swat)", parentArea: "Mountain Road", safetyScore: 75, description: "Ski resort. Safe. Tourist-friendly. Road can be rough in winter.", timeRisk: "day", offsetX: 1, offsetY: -1.5 },
  { id: "sa-mng-04", name: "Kalam", urduName: "کالم", city: "Mingora (Swat)", parentArea: "Swat Valley Road", safetyScore: 78, description: "Upper Swat valley. Very safe. Scenic. Check road conditions.", timeRisk: "day", offsetX: -1.5, offsetY: -1.5 },
];

export function getSubAreasByCity(cityName: string): SubArea[] {
  return subAreas.filter((sa) => sa.city === cityName);
}

export function searchSubAreas(query: string): SubArea[] {
  const q = query.toLowerCase().trim();
  if (!q) return subAreas;
  return subAreas.filter(
    (sa) =>
      sa.name.toLowerCase().includes(q) ||
      sa.urduName.includes(q) ||
      sa.city.toLowerCase().includes(q) ||
      sa.nativeName?.toLowerCase().includes(q) ||
      (sa.parentArea?.toLowerCase().includes(q) ?? false)
  );
}

export function getSubAreaPosition(subArea: SubArea): { x: number; y: number } {
  const city = cities.find((c) => c.name === subArea.city);
  if (!city) return { x: 50, y: 50 };
  return {
    x: city.x + subArea.offsetX,
    y: city.y + subArea.offsetY,
  };
}
