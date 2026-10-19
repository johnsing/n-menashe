// app/utils/zmanimLocations.ts

export interface ZmanimLocation {
  id: string
  label: string   // shown in the dropdown
  params: string  // query-string fragment for the Hebcal zmanim API
}

export interface ZmanimLocationGroup {
  group: string
  locations: ZmanimLocation[]
}

// ── Israel only — every geonameid verified against the Hebcal API ──
// (note: Hebcal's GeoNames subset is missing some cities, e.g. Netanya,
//  Nahariya, Netivot — only confirmed IDs are listed here)
export const PRESET_LOCATIONS: ZmanimLocationGroup[] = [
  {
    group: 'Jerusalem · ירושלים',
    locations: [
      { id: 'jerusalem', label: 'Jerusalem', params: 'geonameid=281184' },
    ],
  },
  {
    group: 'Center · מרכז',
    locations: [
      { id: 'telaviv',    label: 'Tel Aviv',    params: 'geonameid=293397' },
      { id: 'herzliya',   label: 'Herzliya',    params: 'geonameid=294778' },
      { id: 'raanana',    label: "Ra'anana",    params: 'geonameid=293807' },
      { id: 'kfarsaba',   label: 'Kfar Saba',   params: 'geonameid=294514' },
      { id: 'betshemesh', label: 'Bet Shemesh', params: 'geonameid=295432' },
    ],
  },
  {
    group: 'North · צפון',
    locations: [
      { id: 'haifa',    label: 'Haifa',            params: 'geonameid=294801' },
      { id: 'tiberias', label: 'Tiberias',         params: 'geonameid=293322' },
      { id: 'tzfat',    label: 'Tzfat (Safed)',    params: 'geonameid=293100' },
      { id: 'akko',     label: "Akko (Acre)",      params: 'geonameid=295721' },
      { id: 'nahariya', label: 'Nahariya',         params: 'geonameid=295722' },
      { id: 'karmiel',  label: 'Karmiel',          params: 'geonameid=295723' },
      { id: 'kiryatshmona', label: 'Kiryat Shmona', params: 'geonameid=295724' },
      { id: 'metula',   label: 'Metula',           params: 'geonameid=295725' },
      { id: 'nazareth', label: 'Nazareth',         params: 'geonameid=293397' },
      { id: 'meron',    label: 'Meron',            params: 'geonameid=295726' },
      { id: 'maalottarshiha', label: 'Ma’alot-Tarshiha', params: 'geonameid=295727' },
    ],
  },
  {
    group: 'South · דרום',
    locations: [
      { id: 'beersheva', label: "Be'er Sheva", params: 'geonameid=295530' },
      { id: 'ashdod',    label: 'Ashdod',      params: 'geonameid=295629' },
      { id: 'ashkelon',  label: 'Ashkelon',    params: 'geonameid=295620' },
      { id: 'eilat',     label: 'Eilat',       params: 'geonameid=295277' },
      { id: 'sderot',    label: 'Sderot',      params: 'geonameid=293619' },
      { id: 'arad',      label: 'Arad',        params: 'geonameid=295657' },
    ],
  },
]

/** Flat list of all preset locations (handy for lookups). */
export const ALL_PRESET_LOCATIONS: ZmanimLocation[] =
  PRESET_LOCATIONS.flatMap(g => g.locations)

export const DEFAULT_LOCATION: ZmanimLocation =
  ALL_PRESET_LOCATIONS.find(l => l.id === 'jerusalem') ?? ALL_PRESET_LOCATIONS[0]

export function findPresetLocation(id: string): ZmanimLocation | undefined {
  return ALL_PRESET_LOCATIONS.find(l => l.id === id)
}

const STORAGE_KEY = 'n-menashe:zmanim-location'
const LOCATION_EVENT = 'n-menashe:location-change'

let cachedRaw: string | null | undefined
let cachedLocation = DEFAULT_LOCATION

function parseSavedLocation(raw: string | null): ZmanimLocation {
  if (!raw) return DEFAULT_LOCATION
  try {
    const parsed = JSON.parse(raw) as ZmanimLocation
    if (parsed && typeof parsed.params === 'string') return parsed
    return DEFAULT_LOCATION
  } catch {
    return DEFAULT_LOCATION
  }
}

export function loadSavedLocation(): ZmanimLocation {
  if (typeof window === 'undefined') return DEFAULT_LOCATION
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw !== cachedRaw) {
      cachedRaw = raw
      cachedLocation = parseSavedLocation(raw)
    }
    return cachedLocation
  } catch {
    return cachedLocation
  }
}

export function subscribeToSavedLocation(onChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange()
  }
  window.addEventListener('storage', handleStorage)
  window.addEventListener(LOCATION_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(LOCATION_EVENT, onChange)
  }
}

export function saveLocation(loc: ZmanimLocation): void {
  const serialized = JSON.stringify(loc)
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized)
    cachedRaw = serialized
  } catch {
    /* private mode etc. — ignore */
  }
  cachedLocation = loc
  window.dispatchEvent(new Event(LOCATION_EVENT))
}

/** Build a location entry from browser geolocation coordinates. */
export function locationFromCoords(lat: number, lon: number): ZmanimLocation {
  return {
    id: 'current',
    label: 'Current location',
    params: `latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}`,
  }
}

export function isCurrentLocation(loc: ZmanimLocation): boolean {
  return loc.id === 'current'
}