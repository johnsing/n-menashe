// app/components/Zmanim/ZmanimTrainApp.tsx
"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { FiNavigation } from 'react-icons/fi'
import TransitHeader from '@/app/components/Zmanim/TransitHeader'
import TimelineStation, { type Station } from '@/app/components/Zmanim/TimelineStation'
import {
  PRESET_LOCATIONS,
  ALL_PRESET_LOCATIONS,
  DEFAULT_LOCATION,
  findPresetLocation,
  loadSavedLocation,
  subscribeToSavedLocation,
  saveLocation,
  locationFromCoords,
  isCurrentLocation,
  type ZmanimLocation,
} from '@/app/utils/zmanimLocations'

const API_BASE = 'https://www.hebcal.com/zmanim'

interface HebcalResponse {
  date: string
  location: { title: string }
  times: Record<string, string>
}

// Which zmanim appear on the board, in chronological order.
const ZMANIM_STATIONS: { key: string; name: string; hebrew: string }[] = [
  { key: 'chatzotNight',     name: 'Chatzot (Midnight)',     hebrew: 'חצות הלילה' },
  { key: 'alotHaShachar',    name: 'Alot HaShachar',         hebrew: 'עלות השחר' },
  { key: 'misheyakir',       name: 'Misheyakir (Tallis)',    hebrew: 'משיכיר' },
  { key: 'sunrise',          name: 'Netz — Sunrise',         hebrew: 'הנץ החמה' },
  { key: 'sofZmanShmaMGA',   name: 'Latest Shema (MGA)',     hebrew: 'סוף זמן שמע' },
  { key: 'sofZmanShma',      name: 'Latest Shema (Gra)',     hebrew: 'סוף זמן שמע' },
  { key: 'sofZmanTfillaMGA', name: 'Latest Shacharit (MGA)', hebrew: 'סוף זמן תפלה' },
  { key: 'sofZmanTfilla',    name: 'Latest Shacharit (Gra)', hebrew: 'סוף זמן תפלה' },
  { key: 'chatzot',          name: 'Chatzot (Midday)',       hebrew: 'חצות היום' },
  { key: 'minchaGedola',     name: 'Mincha Gedola',          hebrew: 'מנחה גדולה' },
  { key: 'minchaKetana',     name: 'Mincha Ketana',          hebrew: 'מנחה קטנה' },
  { key: 'plagHaMincha',     name: 'Plag HaMincha',          hebrew: 'פלג המנחה' },
  { key: 'sunset',           name: 'Shkiah — Sunset',        hebrew: 'שקיעה' },
  { key: 'beinHaShmashos',   name: 'Bein HaShmashos',        hebrew: 'בין השמשות' },
  { key: 'tzeit42min',       name: 'Tzeit (42 min)',         hebrew: 'צאת הכוכבים' },
  { key: 'tzeit72min',       name: 'Tzeit — Rabbeinu Tam',   hebrew: 'ר״ת · 72 דקות' },
]

const toApiDate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

let clockSnapshot: Date | null = null
let clockInterval: ReturnType<typeof setInterval> | undefined
const clockSubscribers = new Set<() => void>()

function subscribeToClock(onChange: () => void) {
  clockSubscribers.add(onChange)
  if (!clockInterval) {
    clockSnapshot = new Date()
    clockInterval = setInterval(() => {
      clockSnapshot = new Date()
      clockSubscribers.forEach(subscriber => subscriber())
    }, 15_000)
    onChange()
  }

  return () => {
    clockSubscribers.delete(onChange)
    if (clockSubscribers.size === 0 && clockInterval) {
      clearInterval(clockInterval)
      clockInterval = undefined
      clockSnapshot = null
    }
  }
}

const getClockSnapshot = () => clockSnapshot
const getServerClockSnapshot = () => null
const getServerLocationSnapshot = () => DEFAULT_LOCATION

async function fetchZmanim(date: Date, loc: ZmanimLocation) {
  const url = `${API_BASE}?cfg=json&${loc.params}&date=${toApiDate(date)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Hebcal request failed (${res.status})`)
  const data: HebcalResponse = await res.json()

  const stations: Station[] = ZMANIM_STATIONS
    .filter(z => data.times[z.key])
    .map(z => ({
      id: z.key,
      name: z.name,
      hebrew: z.hebrew,
      time: new Date(data.times[z.key]),
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

  return {
    stations,
    locationTitle: isCurrentLocation(loc) ? loc.label : (data.location?.title ?? loc.label),
  }
}

// ── App ───────────────────────────────────────────────────
//
// Prerender-safe: `new Date()` and localStorage are NEVER read during
// render. Browser values are read by external-store subscriptions after
// hydration, keeping Next.js 16's static prerender deterministic.
export default function ZmanimTrainApp() {
  const now = useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerClockSnapshot)
  const location = useSyncExternalStore(
    subscribeToSavedLocation,
    loadSavedLocation,
    getServerLocationSnapshot
  )
  const [stations, setStations] = useState<Station[]>([])
  const [locationTitle, setLocationTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)

  const load = useCallback(async (date: Date, loc: ZmanimLocation) => {
    try {
      const result = await fetchZmanim(date, loc)
      setStations(result.stations)
      setLocationTitle(result.locationTitle)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load zmanim')
    } finally {
      setLoading(false)
    }
  }, [])

  const dateKey = now ? toApiDate(now) : ''

  // Fetch on mount, location changes, and local date changes.
  useEffect(() => {
    if (!dateKey) return
    let active = true
    const date = new Date(`${dateKey}T00:00:00`)

    const refresh = async () => {
      try {
        const result = await fetchZmanim(date, location)
        if (!active) return
        setStations(result.stations)
        setLocationTitle(result.locationTitle)
        setError(null)
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : 'Failed to load zmanim')
      } finally {
        if (active) setLoading(false)
      }
    }

    void refresh()
    return () => {
      active = false
    }
  }, [dateKey, location])

  // ── Location handlers (event handlers — safe) ──────────
  const choosePreset = (id: string) => {
    const loc = findPresetLocation(id)
    if (!loc) return
    setGeoError(null)
    setLoading(true)
    setError(null)
    saveLocation(loc)
  }

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setGeoError('Geolocation is not supported by this browser.')
      return
    }
    setGeoLoading(true)
    setGeoError(null)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc = locationFromCoords(pos.coords.latitude, pos.coords.longitude)
        setLoading(true)
        setError(null)
        saveLocation(loc)
        setGeoLoading(false)
      },
      err => {
        setGeoLoading(false)
        setGeoError(
          err.code === err.PERMISSION_DENIED
            ? 'Location permission denied — choose a city from the list instead.'
            : 'Could not determine your location. Try again or pick a city.'
        )
      },
      { timeout: 10_000, maximumAge: 300_000 }
    )
  }

  // Next upcoming zman (across the whole day)
  const nextStation = useMemo(() => {
    if (!now) return null
    return stations.find(s => new Date(s.time).getTime() > now.getTime()) ?? null
  }, [stations, now])

  // Train-board behaviour: keep the last hour + everything upcoming
  const visible = useMemo(() => {
    if (!now) return []
    const cutoff = now.getTime() - 60 * 60_000
    return stations.filter(s => new Date(s.time).getTime() >= cutoff)
  }, [stations, now])

  // If the saved location isn't one of the presets (e.g. an old save),
  // offer it as an extra option so the select never shows a blank value.
  const isPreset = ALL_PRESET_LOCATIONS.some(l => l.id === location.id)

  const selectOptions = (
    <>
      {isCurrentLocation(location) && (
        <option value="current">📍 Current location</option>
      )}
      {!isCurrentLocation(location) && !isPreset && (
        <option value={location.id}>{location.label}</option>
      )}
      {PRESET_LOCATIONS.map(group => (
        <optgroup key={group.group} label={group.group}>
          {group.locations.map(l => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </optgroup>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-board-bg">
      <TransitHeader
        title="Zmanim Train"
        subtitle={error ? 'Offline' : `${visible.length} stops · today`}
        location={locationTitle || location.label}
        nextEventTime={now ? nextStation?.time : undefined}
        loading={loading}
      />

      <main className="mx-auto w-full max-w-[900px] px-5 pb-20 pt-6 max-md:px-4">
        {/* Location picker */}
        <div className="mb-6 flex flex-wrap gap-2.5">
          <select
            className="zmanim-select min-w-[180px] flex-1 cursor-pointer rounded-full border border-board-border bg-board-surface py-2.5 pl-4 pr-9 text-sm text-[#eee] transition-colors hover:border-[rgba(255,215,0,0.4)] focus:border-[rgba(255,215,0,0.4)] focus:outline-none"
            value={location.id}
            onChange={e => choosePreset(e.target.value)}
            aria-label="Choose location"
          >
            {selectOptions}
          </select>
          <button
            type="button"
            onClick={useMyLocation}
            disabled={geoLoading}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[rgba(255,215,0,0.4)] bg-transparent px-[18px] py-2.5 font-[inherit] text-[13px] font-semibold text-gold transition-colors hover:bg-[rgba(255,215,0,0.1)] disabled:cursor-default disabled:opacity-50 [&_svg]:text-sm"
          >
            <FiNavigation aria-hidden="true" />
            {geoLoading ? 'Locating…' : 'Use my location'}
          </button>
          {geoError && (
            <p role="alert" className="-mt-2 mb-0 ml-1.5 w-full text-xs text-[#ff8080]">
              {geoError}
            </p>
          )}
        </div>

        <div className="mb-6 rounded-2xl border border-board-border bg-gradient-to-br from-[#1a1a1a] to-[#141414] px-6 py-5 text-center max-sm:px-3 max-sm:py-4">
          <div className="text-[42px] font-extrabold tracking-wider text-gold tabular-nums max-sm:text-3xl">
            {now ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
          </div>
          <div className="mt-1 text-[13px] text-[#888]">
            {now
              ? now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
              : 'Loading…'}
          </div>
        </div>

        <h2 className="mb-3.5 flex items-center gap-2 text-base font-bold text-white before:h-4 before:w-1 before:rounded-sm before:bg-gold before:content-['']">
          Today&apos;s Zmanim
        </h2>

        {error ? (
          <div className="rounded-xl border border-[rgba(255,77,79,0.35)] bg-board-surface px-6 py-8 text-center text-[#ff8080]">
            <strong className="mb-1.5 block text-[#ffb3b3]">Couldn&apos;t reach Hebcal</strong>
            <small className="text-[#888]">{error}</small>
            <div>
              <button
                className="mt-4 cursor-pointer rounded-full border border-gold bg-transparent px-5 py-2 font-[inherit] text-sm font-bold text-gold transition-colors hover:bg-[rgba(255,215,0,0.12)]"
                onClick={() => {
                  setLoading(true)
                  setError(null)
                  void load(now ?? new Date(), location)
                }}
              >
                Try again
              </button>
            </div>
          </div>
        ) : loading && stations.length === 0 ? (
          <>
            <div className="mb-2.5 h-16 animate-pulse rounded-xl border border-board-border bg-board-surface" />
            <div className="mb-2.5 h-16 animate-pulse rounded-xl border border-board-border bg-board-surface" />
            <div className="mb-2.5 h-16 animate-pulse rounded-xl border border-board-border bg-board-surface" />
            <div className="mb-2.5 h-16 animate-pulse rounded-xl border border-board-border bg-board-surface" />
          </>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-board-border bg-board-surface px-6 py-8 text-center text-sm text-[#888]">
            All of today&apos;s zmanim have passed. Tomorrow&apos;s times arrive at midnight. 🌙
          </div>
        ) : (
          <TimelineStation stations={visible} now={now ?? new Date()} nextId={nextStation?.id} />
        )}
      </main>
    </div>
  )
}