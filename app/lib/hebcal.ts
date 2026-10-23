// app/lib/hebcal.ts
// Typed, validated client for the Hebcal zmanim API.
// The raw JSON is parsed through zod so a malformed response fails loudly
// at the boundary instead of corrupting state downstream.
import { format } from "date-fns";
import { z } from "zod";
import type { Station } from "@/app/components/Zmanim/TimelineStation";
import { isCurrentLocation, type ZmanimLocation } from "@/app/utils/zmanimLocations";

const API_BASE = "https://www.hebcal.com/zmanim";

// Hebcal returns ISO-8601 times with a UTC offset, e.g. "2026-10-23T06:12:00+03:00"
const isoDateTime = z.iso.datetime({ offset: true });

const hebcalResponseSchema = z.object({
  date: z.string(),
  location: z.object({ title: z.string() }).partial(),
  times: z.record(z.string(), isoDateTime),
});

export type HebcalResponse = z.infer<typeof hebcalResponseSchema>;

// Which zmanim appear on the board, in chronological order.
export const ZMANIM_STATIONS: { key: string; name: string; hebrew: string }[] = [
  { key: "chatzotNight",     name: "Chatzot (Midnight)",     hebrew: "חצות הלילה" },
  { key: "alotHaShachar",    name: "Alot HaShachar",         hebrew: "עלות השחר" },
  { key: "misheyakir",       name: "Misheyakir (Tallis)",    hebrew: "משיכיר" },
  { key: "sunrise",          name: "Netz — Sunrise",         hebrew: "הנץ החמה" },
  { key: "sofZmanShmaMGA",   name: "Latest Shema (MGA)",     hebrew: "סוף זמן שמע" },
  { key: "sofZmanShma",      name: "Latest Shema (Gra)",     hebrew: "סוף זמן שמע" },
  { key: "sofZmanTfillaMGA", name: "Latest Shacharit (MGA)", hebrew: "סוף זמן תפלה" },
  { key: "sofZmanTfilla",    name: "Latest Shacharit (Gra)", hebrew: "סוף זמן תפלה" },
  { key: "chatzot",          name: "Chatzot (Midday)",       hebrew: "חצות היום" },
  { key: "minchaGedola",     name: "Mincha Gedola",          hebrew: "מנחה גדולה" },
  { key: "minchaKetana",     name: "Mincha Ketana",          hebrew: "מנחה קטנה" },
  { key: "plagHaMincha",     name: "Plag HaMincha",          hebrew: "פלג המנחה" },
  { key: "sunset",           name: "Shkiah — Sunset",        hebrew: "שקיעה" },
  { key: "beinHaShmashos",   name: "Bein HaShmashos",        hebrew: "בין השמשות" },
  { key: "tzeit42min",       name: "Tzeit (42 min)",         hebrew: "צאת הכוכבים" },
  { key: "tzeit72min",       name: "Tzeit — Rabbeinu Tam",   hebrew: "ר״ת · 72 דקות" },
];

/** Local calendar date in Hebcal's expected format: YYYY-MM-DD */
export const toApiDate = (d: Date): string => format(d, "yyyy-MM-dd");

export interface ZmanimResult {
  stations: Station[];
  locationTitle: string;
}

export async function fetchZmanim(
  date: Date,
  loc: ZmanimLocation,
): Promise<ZmanimResult> {
  const url = `${API_BASE}?cfg=json&${loc.params}&date=${toApiDate(date)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Hebcal request failed (${res.status})`);

  // Throws a ZodError with a readable message if the shape changed.
  const data = hebcalResponseSchema.parse(await res.json());

  const stations: Station[] = ZMANIM_STATIONS
    .filter((z) => data.times[z.key])
    .map((z) => ({
      id: z.key,
      name: z.name,
      hebrew: z.hebrew,
      time: new Date(data.times[z.key]),
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return {
    stations,
    locationTitle: isCurrentLocation(loc)
      ? loc.label
      : (data.location.title ?? loc.label),
  };
}
