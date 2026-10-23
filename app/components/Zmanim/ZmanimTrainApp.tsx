// app/components/Zmanim/ZmanimTrainApp.tsx
"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslations } from "next-intl";
import { FiNavigation } from "react-icons/fi";
import { format } from "date-fns";
import TransitHeader from "@/app/components/Zmanim/TransitHeader";
import TimelineStation, { type Station } from "@/app/components/Zmanim/TimelineStation";
import { fetchZmanim, toApiDate } from "@/app/lib/hebcal";
import {
  PRESET_LOCATIONS,
  ALL_PRESET_LOCATIONS,
  findPresetLocation,
  loadSavedLocation,
  subscribeToSavedLocation,
  saveLocation,
  locationFromCoords,
  isCurrentLocation,
  type ZmanimLocation,
} from "@/app/utils/zmanimLocations";

let clockSnapshot: Date | null = null;
let clockInterval: ReturnType<typeof setInterval> | undefined;
const clockSubscribers = new Set<() => void>();

function subscribeToClock(onChange: () => void) {
  clockSubscribers.add(onChange);
  if (!clockInterval) {
    clockSnapshot = new Date();
    clockInterval = setInterval(() => {
      clockSnapshot = new Date();
      clockSubscribers.forEach((subscriber) => subscriber());
    }, 15_000);
    onChange();
  }

  return () => {
    clockSubscribers.delete(onChange);
    if (clockSubscribers.size === 0 && clockInterval) {
      clearInterval(clockInterval);
      clockInterval = undefined;
      clockSnapshot = null;
    }
  };
}

const getClockSnapshot = () => clockSnapshot;
const getServerClockSnapshot = () => null;
const getServerLocationSnapshot = () =>
  ALL_PRESET_LOCATIONS.find((l) => l.id === "jerusalem") ?? ALL_PRESET_LOCATIONS[0];

// ── Styled ────────────────────────────────────────────────
const App = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

const Content = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 20px 80px;

  @media (max-width: 768px) {
    padding: 20px 16px 80px;
  }
`;

// ── Location picker ───────────────────────────────────────
const PickerRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  flex: 1;
  min-width: 180px;
  padding: 10px 16px;
  background: #1a1a1a;
  color: #eee;
  border: 1px solid #2a2a2a;
  border-radius: 50px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 38px;
  transition: border-color 0.15s ease;

  &:hover,
  &:focus {
    border-color: rgba(255, 215, 0, 0.4);
    outline: none;
  }

  option,
  optgroup {
    background: #1a1a1a;
    color: #eee;
  }
`;

const GeoButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 50px;
  border: 1px solid rgba(255, 215, 0, 0.4);
  background: transparent;
  color: #ffd700;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 215, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    font-size: 14px;
  }
`;

const GeoHint = styled.p`
  width: 100%;
  margin: -8px 0 0 6px;
  font-size: 12px;
  color: #ff8080;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 4px;
    height: 16px;
    background: #ffd700;
    border-radius: 2px;
  }
`;

const LiveClock = styled.div`
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, #1a1a1a, #141414);
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  margin-bottom: 24px;

  .time {
    color: #ffd700;
    font-size: 42px;
    font-weight: 800;
    letter-spacing: 2px;
    font-variant-numeric: tabular-nums;
  }

  .date {
    color: #888;
    font-size: 13px;
    margin-top: 4px;
  }

  @media (max-width: 480px) {
    padding: 18px 12px;
    .time {
      font-size: 30px;
    }
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 1; }
`;

const Skeleton = styled.div`
  height: 64px;
  border-radius: 12px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  margin-bottom: 10px;
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

const ErrorBox = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
  color: #ff8080;
  background: #1a1a1a;
  border: 1px solid rgba(255, 77, 79, 0.35);
  border-radius: 12px;

  strong {
    display: block;
    margin-bottom: 0.4rem;
    color: #ffb3b3;
  }
  small {
    color: #888;
  }

  .retry {
    margin-top: 1rem;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    border: 1px solid #ffd700;
    background: transparent;
    color: #ffd700;
    font-weight: 700;
    font-size: 0.85rem;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: rgba(255, 215, 0, 0.12);
    }
  }
`;

const EmptyBox = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
  color: #888;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  font-size: 0.9rem;
`;

// ── App ───────────────────────────────────────────────────
//
// Prerender-safe: `new Date()` and localStorage are NEVER read during
// render. Browser values are read by external-store subscriptions after
// hydration, keeping Next.js 16's static prerender deterministic.
export default function ZmanimTrainApp() {
  const t = useTranslations("zmanim");
  const now = useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getServerClockSnapshot,
  );
  const location = useSyncExternalStore(
    subscribeToSavedLocation,
    loadSavedLocation,
    getServerLocationSnapshot,
  );
  const [stations, setStations] = useState<Station[]>([]);
  const [locationTitle, setLocationTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  // Bump this to retry — the effect below is the single source of fetching.
  const [retryCount, setRetryCount] = useState(0);

  const dateKey = now ? toApiDate(now) : "";

  // Fetch on mount, location changes, date changes, and manual retries.
  useEffect(() => {
    if (!dateKey) return;
    let active = true;
    const date = new Date(`${dateKey}T00:00:00`);

    const refresh = async () => {
      try {
        const result = await fetchZmanim(date, location);
        if (!active) return;
        setStations(result.stations);
        setLocationTitle(result.locationTitle);
        setError(null);
      } catch (e) {
        if (active)
          setError(e instanceof Error ? e.message : "Failed to load zmanim");
      } finally {
        if (active) setLoading(false);
      }
    };

    void refresh();
    return () => {
      active = false;
    };
  }, [dateKey, location, retryCount]);

  // ── Location handlers (event handlers — safe) ──────────
  const choosePreset = (id: string) => {
    const loc = findPresetLocation(id);
    if (!loc) return;
    setGeoError(null);
    setLoading(true);
    setError(null);
    saveLocation(loc);
  };

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setGeoError("Geolocation is not supported by this browser.");
      return;
    }
    setGeoLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = locationFromCoords(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        setLoading(true);
        setError(null);
        saveLocation(loc);
        setGeoLoading(false);
      },
      (err) => {
        setGeoLoading(false);
        setGeoError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied — choose a city from the list instead."
            : "Could not determine your location. Try again or pick a city.",
        );
      },
      { timeout: 10_000, maximumAge: 300_000 },
    );
  };

  // Next upcoming zman (across the whole day)
  const nextStation = useMemo(() => {
    if (!now) return null;
    return (
      stations.find((s) => new Date(s.time).getTime() > now.getTime()) ?? null
    );
  }, [stations, now]);

  // Train-board behaviour: keep the last hour + everything upcoming
  const visible = useMemo(() => {
    if (!now) return [];
    const cutoff = now.getTime() - 60 * 60_000;
    return stations.filter((s) => new Date(s.time).getTime() >= cutoff);
  }, [stations, now]);

  // If the saved location isn't one of the presets (e.g. an old save),
  // offer it as an extra option so the select never shows a blank value.
  const isPreset = ALL_PRESET_LOCATIONS.some((l) => l.id === location.id);

  const selectOptions = (
    <>
      {isCurrentLocation(location) && (
        <option value="current">📍 Current location</option>
      )}
      {!isCurrentLocation(location) && !isPreset && (
        <option value={location.id}>{location.label}</option>
      )}
      {PRESET_LOCATIONS.map((group) => (
        <optgroup key={group.group} label={group.group}>
          {group.locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  );

  return (
    <App>
      <TransitHeader
        title={t("title")}
        subtitle={error ? t("offline") : `${visible.length} stops · today`}
        location={locationTitle || location.label}
        nextEventTime={now ? nextStation?.time : undefined}
        loading={loading}
      />

      <Content>
        {/* Location picker */}
        <PickerRow>
          <Select
            value={location.id}
            onChange={(e) => choosePreset(e.target.value)}
            aria-label={t("chooseLocation")}
          >
            {selectOptions}
          </Select>
          <GeoButton type="button" onClick={useMyLocation} disabled={geoLoading}>
            <FiNavigation aria-hidden="true" />
            {geoLoading ? t("locating") : t("useMyLocation")}
          </GeoButton>
          {geoError && (
            <GeoHint role="alert">{geoError}</GeoHint>
          )}
        </PickerRow>

        <LiveClock>
          <div className="time">
            {now ? format(now, "HH:mm") : "--:--"}
          </div>
          <div className="date">
            {now
              ? format(now, "EEEE, MMMM d")
              : "Loading…"}
          </div>
        </LiveClock>

        <SectionTitle>{t("todaysZmanim")}</SectionTitle>

        {error ? (
          <ErrorBox>
            <strong>{t("couldntReach")}</strong>
            <small>{error}</small>
            <div>
              <button
                className="retry"
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  setRetryCount((c) => c + 1);
                }}
              >
                {t("tryAgain")}
              </button>
            </div>
          </ErrorBox>
        ) : loading && stations.length === 0 ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : visible.length === 0 ? (
          <EmptyBox>{t("allPassed")}</EmptyBox>
        ) : (
          <TimelineStation
            stations={visible}
            now={now ?? new Date()}
            nextId={nextStation?.id}
          />
        )}
      </Content>
    </App>
  );
}
