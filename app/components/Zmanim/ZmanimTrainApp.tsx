// components/ZmanimTrainApp.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import TransitHeader from './TransitHeader';
import TimelineStation from './TimelineStation';
import { 
  FiSunrise, 
  FiEye, 
  FiSun, 
  FiClock, 
  FiSunset, 
  FiMoon, 
  FiActivity,
  FiStar
} from 'react-icons/fi';

interface ZmanimRawItem {
  key: ZmanimKey;
  label: string;
  todayIso: string;
  tomorrowIso: string;
  icon: React.ReactNode;
}

type ZmanimKey =
  | 'chatzotNight'
  | 'alotHaShachar'
  | 'misheyakir'
  | 'misheyakirMachmir'
  | 'dawn'
  | 'sunrise'
  | 'sofZmanShma'
  | 'sofZmanShmaMGA'
  | 'sofZmanTfila'
  | 'sofZmanTfilaMGA'
  | 'chatzot'
  | 'minchaGedola'
  | 'minchaKetana'
  | 'plagHaMincha'
  | 'sunset'
  | 'dusk'
  | 'beinHaShmashos'
  | 'tzeit7083deg'
  | 'tzeit85deg'
  | 'tzeit42min'
  | 'tzeit50min'
  | 'tzeit72min'
  | 'alosBaalHatanya'
  | 'sofZmanShmaBaalHatanya'
  | 'sofZmanTfilaBaalHatanya'
  | 'minchaGedolaBaalHatanya'
  | 'minchaKetanaBaalHatanya'
  | 'plagHaminchaBaalHatanya'
  | 'tzaisBaalHatanya';

interface HebcalZmanimResponse {
  times?: Partial<Record<ZmanimKey, string>>;
  location?: { name?: string };
}

interface HebcalCalendarResponse {
  items?: Array<{ title: string }>;
}

export default function ZmanimTrainApp() {
  const [zmanimRaw, setZmanimRaw] = useState<ZmanimRawItem[]>([]);
  const [holiday, setHoliday] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState<string>('Detecting location...');
  const [now, setNow] = useState<Date>(new Date());

  // Tick every second for live countdown updates
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const processZmanimData = useCallback((zmanimDataToday: HebcalZmanimResponse, zmanimDataTomorrow: HebcalZmanimResponse) => {
    if (zmanimDataToday.times && zmanimDataTomorrow.times) {
      const keys: Array<{ key: ZmanimKey; label: string; icon: React.ReactNode }> = [
        { key: 'chatzotNight', label: 'Chatzot Night (Midnight)', icon: <FiMoon /> },
        { key: 'alotHaShachar', label: 'Alot HaShachar (Dawn)', icon: <FiSunrise /> },
        { key: 'alosBaalHatanya', label: 'Alot HaShachar (Baal Hatanya)', icon: <FiSunrise /> },
        { key: 'misheyakir', label: 'Misheyakir (11.5°)', icon: <FiEye /> },
        { key: 'misheyakirMachmir', label: 'Misheyakir Machmir (10.2°)', icon: <FiEye /> },
        { key: 'dawn', label: 'Civil Dawn (6°)', icon: <FiSunrise /> },
        { key: 'sunrise', label: 'Netz HaChamah (Sunrise)', icon: <FiSun /> },
        { key: 'sofZmanShma', label: 'Sof Zman Shma (GRA)', icon: <FiClock /> },
        { key: 'sofZmanShmaMGA', label: 'Sof Zman Shma (MGA)', icon: <FiClock /> },
        { key: 'sofZmanShmaBaalHatanya', label: 'Sof Zman Shma (Baal Hatanya)', icon: <FiClock /> },
        { key: 'sofZmanTfila', label: 'Sof Zman Tefillah (GRA)', icon: <FiClock /> },
        { key: 'sofZmanTfilaMGA', label: 'Sof Zman Tefillah (MGA)', icon: <FiClock /> },
        { key: 'sofZmanTfilaBaalHatanya', label: 'Sof Zman Tefillah (Baal Hatanya)', icon: <FiClock /> },
        { key: 'chatzot', label: 'Chatzot (Midday)', icon: <FiSun /> },
        { key: 'minchaGedola', label: 'Mincha Gedola', icon: <FiActivity /> },
        { key: 'minchaGedolaBaalHatanya', label: 'Mincha Gedola (Baal Hatanya)', icon: <FiActivity /> },
        { key: 'minchaKetana', label: 'Mincha Ketana', icon: <FiActivity /> },
        { key: 'minchaKetanaBaalHatanya', label: 'Mincha Ketana (Baal Hatanya)', icon: <FiActivity /> },
        { key: 'plagHaMincha', label: 'Plag HaMincha', icon: <FiSunset /> },
        { key: 'plagHaminchaBaalHatanya', label: 'Plag HaMincha (Baal Hatanya)', icon: <FiSunset /> },
        { key: 'sunset', label: 'Shkiah (Sunset)', icon: <FiSunset /> },
        { key: 'dusk', label: 'Civil Dusk (6°)', icon: <FiMoon /> },
        { key: 'beinHaShmashos', label: 'Bein HaShmashos (Twilight)', icon: <FiMoon /> },
        { key: 'tzeit7083deg', label: 'Tzeit Hakochavim (7.083°)', icon: <FiStar /> },
        { key: 'tzeit85deg', label: 'Tzeit Hakochavim (8.5°)', icon: <FiStar /> },
        { key: 'tzeit42min', label: 'Tzeit Hakochavim (42 Min)', icon: <FiStar /> },
        { key: 'tzeit50min', label: 'Tzeit Hakochavim (50 Min)', icon: <FiStar /> },
        { key: 'tzeit72min', label: 'Tzeit Rabbeinu Tam (72 Min)', icon: <FiStar /> },
        { key: 'tzaisBaalHatanya', label: 'Tzeit (Baal Hatanya 6°)', icon: <FiStar /> },
      ];

      const items: ZmanimRawItem[] = keys.map((item) => ({
        key: item.key,
        label: item.label,
        todayIso: zmanimDataToday.times?.[item.key] ?? '',
        tomorrowIso: zmanimDataTomorrow.times?.[item.key] ?? '',
        icon: item.icon,
      })).filter((i) => i.todayIso !== '');

      setZmanimRaw(items);
    }
  }, []);

  const processCalendarData = useCallback((calData: HebcalCalendarResponse) => {
    if (calData.items && calData.items.length > 0) {
      const events = calData.items.map((item) => item.title).join(' • ');
      setHoliday(events);
    } else {
      setHoliday('');
    }
  }, []);

  const fetchScheduleByCity = useCallback(async (cityName: string) => {
    try {
      setLoading(true);
      const todayObj = new Date();
      const todayStr = todayObj.toISOString().split('T')[0];
      const tomorrowObj = new Date(todayObj);
      tomorrowObj.setDate(tomorrowObj.getDate() + 1);
      const tomorrowStr = tomorrowObj.toISOString().split('T')[0];
      
      const [zmanimResToday, zmanimResTomorrow] = await Promise.all([
        fetch(`https://www.hebcal.com/zmanim?cfg=json&city=${encodeURIComponent(cityName)}&date=${todayStr}`),
        fetch(`https://www.hebcal.com/zmanim?cfg=json&city=${encodeURIComponent(cityName)}&date=${tomorrowStr}`)
      ]);

      const zmanimDataToday: HebcalZmanimResponse = await zmanimResToday.json();
      const zmanimDataTomorrow: HebcalZmanimResponse = await zmanimResTomorrow.json();
      
      processZmanimData(zmanimDataToday, zmanimDataTomorrow);

      if (zmanimDataToday.location && zmanimDataToday.location.name) {
        setLocationName(zmanimDataToday.location.name);
      } else {
        setLocationName(cityName);
      }

      const calRes = await fetch(`https://www.hebcal.com/hebcal?v=1&cfg=json&start=${todayStr}&end=${todayStr}&lg=s&city=${encodeURIComponent(cityName)}`);
      const calData: HebcalCalendarResponse = await calRes.json();
      processCalendarData(calData);
    } catch (err) {
      console.error('Failed city schedule', err);
      setLocationName('Location not found');
    } finally {
      setLoading(false);
    }
  }, [processCalendarData, processZmanimData]);

  const fetchScheduleWithCoordinates = useCallback(async (lat: number, lon: number, tzid: string) => {
    try {
      const todayObj = new Date();
      const todayStr = todayObj.toISOString().split('T')[0];
      const tomorrowObj = new Date(todayObj);
      tomorrowObj.setDate(tomorrowObj.getDate() + 1);
      const tomorrowStr = tomorrowObj.toISOString().split('T')[0];
      
      const [zmanimResToday, zmanimResTomorrow] = await Promise.all([
        fetch(`https://www.hebcal.com/zmanim?cfg=json&latitude=${lat}&longitude=${lon}&tzid=${encodeURIComponent(tzid)}&date=${todayStr}`),
        fetch(`https://www.hebcal.com/zmanim?cfg=json&latitude=${lat}&longitude=${lon}&tzid=${encodeURIComponent(tzid)}&date=${tomorrowStr}`)
      ]);
      
      const zmanimDataToday: HebcalZmanimResponse = await zmanimResToday.json();
      const zmanimDataTomorrow: HebcalZmanimResponse = await zmanimResTomorrow.json();
      
      processZmanimData(zmanimDataToday, zmanimDataTomorrow);

      if (zmanimDataToday.location?.name) {
        setLocationName(zmanimDataToday.location.name);
      } else {
        setLocationName(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
      }

      const calRes = await fetch(
        `https://www.hebcal.com/hebcal?v=1&cfg=json&start=${todayStr}&end=${todayStr}&lg=s&latitude=${lat}&longitude=${lon}&tzid=${encodeURIComponent(tzid)}`
      );
      const calData: HebcalCalendarResponse = await calRes.json();
      processCalendarData(calData);
    } catch (err) {
      console.error('Failed coordinate schedule', err);
      await fetchScheduleByCity('Tel Aviv');
    } finally {
      setLoading(false);
    }
  }, [fetchScheduleByCity, processCalendarData, processZmanimData]);

  const handleRequestGeo = useCallback(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jerusalem';
          void fetchScheduleWithCoordinates(lat, lon, tzid);
        },
        (error) => {
          console.warn('Geolocation denied. Falling back to Tel Aviv.', error);
          void fetchScheduleByCity('Tel Aviv');
        },
        { timeout: 10000 }
      );
    } else {
      void fetchScheduleByCity('Tel Aviv');
    }
  }, [fetchScheduleByCity, fetchScheduleWithCoordinates]);

  useEffect(() => {
    const timer = window.setTimeout(handleRequestGeo, 0);
    return () => window.clearTimeout(timer);
  }, [handleRequestGeo]);

  function formatTime(isoString: string) {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  function getStationStatus(todayIso: string, tomorrowIso: string, key: ZmanimKey) {
    const thresholdMinutes = key === 'chatzot' ? 15 : 5;
    const thresholdMs = thresholdMinutes * 60 * 1000;
    const currentTime = now.getTime();

    if (todayIso) {
      const targetTimeToday = new Date(todayIso).getTime();
      const diffMs = targetTimeToday - currentTime;

      if (diffMs >= 0) {
        if (diffMs <= thresholdMs) {
          const minutes = Math.floor(diffMs / 60000);
          const seconds = Math.floor((diffMs % 60000) / 1000);
          return {
            activeIso: todayIso,
            status: 'approaching' as const,
            countdownText: `${minutes}m ${seconds}s`,
            isTomorrow: false,
          };
        }
        return {
          activeIso: todayIso,
          status: 'future' as const,
          countdownText: '',
          isTomorrow: false,
        };
      }
    }

    // Today's time has passed, automatically roll over to tomorrow's schedule
    if (tomorrowIso) {
      const targetTimeTomorrow = new Date(tomorrowIso).getTime();
      const diffTomorrowMs = targetTimeTomorrow - currentTime;

      if (diffTomorrowMs >= 0 && diffTomorrowMs <= thresholdMs) {
        const minutes = Math.floor(diffTomorrowMs / 60000);
        const seconds = Math.floor((diffTomorrowMs % 60000) / 1000);
        return {
          activeIso: tomorrowIso,
          status: 'approaching' as const,
          countdownText: `${minutes}m ${seconds}s`,
          isTomorrow: true,
        };
      }

      return {
        activeIso: tomorrowIso,
        status: 'future' as const,
        countdownText: '',
        isTomorrow: true,
      };
    }

    return {
      activeIso: todayIso || tomorrowIso,
      status: 'future' as const,
      countdownText: '',
      isTomorrow: false,
    };
  }

  // Section Filters
  const nightDawnKeys: ZmanimKey[] = ['chatzotNight', 'alotHaShachar', 'alosBaalHatanya', 'misheyakir', 'misheyakirMachmir', 'dawn'];
  const morningKeys: ZmanimKey[] = ['sunrise', 'sofZmanShma', 'sofZmanShmaMGA', 'sofZmanShmaBaalHatanya', 'sofZmanTfila', 'sofZmanTfilaMGA', 'sofZmanTfilaBaalHatanya'];
  const middayKeys: ZmanimKey[] = ['chatzot'];
  const afternoonKeys: ZmanimKey[] = ['minchaGedola', 'minchaGedolaBaalHatanya', 'minchaKetana', 'minchaKetanaBaalHatanya', 'plagHaMincha', 'plagHaminchaBaalHatanya'];
  const eveningKeys: ZmanimKey[] = ['sunset', 'dusk', 'beinHaShmashos', 'tzeit7083deg', 'tzeit85deg', 'tzeit42min', 'tzeit50min', 'tzeit72min', 'tzaisBaalHatanya'];

  const nightDawnItems = zmanimRaw.filter((item) => nightDawnKeys.includes(item.key));
  const morningItems = zmanimRaw.filter((item) => morningKeys.includes(item.key));
  const middayItems = zmanimRaw.filter((item) => middayKeys.includes(item.key));
  const afternoonItems = zmanimRaw.filter((item) => afternoonKeys.includes(item.key));
  const eveningItems = zmanimRaw.filter((item) => eveningKeys.includes(item.key));

  return (
    <main className="container">
      <TransitHeader 
        holiday={holiday} 
        locationName={locationName} 
        isTomorrow={false}
        onLocationSubmit={(city) => fetchScheduleByCity(city)} 
        onUseGeo={handleRequestGeo}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-[var(--muted)] space-y-3">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Calculating transit stops...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Section 1: Night & Early Dawn */}
          {nightDawnItems.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3 px-1">
                🌙 Night &amp; Early Dawn
              </h3>
              <div className="space-y-3">
                {nightDawnItems.map((item) => {
                  const { activeIso, status, countdownText, isTomorrow: stationIsTomorrow } = getStationStatus(item.todayIso, item.tomorrowIso, item.key);
                  return (
                    <TimelineStation
                      key={item.key}
                      label={item.label}
                      time={formatTime(activeIso)}
                      status={status}
                      countdownText={countdownText}
                      isTomorrow={stationIsTomorrow}
                      icon={item.icon}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 2: Morning Schedule */}
          {morningItems.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3 px-1">
                🌅 Morning Schedule (Sunrise to Tefillah)
              </h3>
              <div className="space-y-3">
                {morningItems.map((item) => {
                  const { activeIso, status, countdownText, isTomorrow: stationIsTomorrow } = getStationStatus(item.todayIso, item.tomorrowIso, item.key);
                  return (
                    <TimelineStation
                      key={item.key}
                      label={item.label}
                      time={formatTime(activeIso)}
                      status={status}
                      countdownText={countdownText}
                      isTomorrow={stationIsTomorrow}
                      icon={item.icon}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: Midday */}
          {middayItems.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3 px-1">
                ☀️ Midday (15-Min Warning)
              </h3>
              <div className="space-y-3">
                {middayItems.map((item) => {
                  const { activeIso, status, countdownText, isTomorrow: stationIsTomorrow } = getStationStatus(item.todayIso, item.tomorrowIso, item.key);
                  return (
                    <TimelineStation
                      key={item.key}
                      label={item.label}
                      time={formatTime(activeIso)}
                      status={status}
                      countdownText={countdownText}
                      isTomorrow={stationIsTomorrow}
                      icon={item.icon}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 4: Afternoon & Mincha Schedule */}
          {afternoonItems.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3 px-1">
                🌤️ Afternoon &amp; Mincha Schedule
              </h3>
              <div className="space-y-3">
                {afternoonItems.map((item) => {
                  const { activeIso, status, countdownText, isTomorrow: stationIsTomorrow } = getStationStatus(item.todayIso, item.tomorrowIso, item.key);
                  return (
                    <TimelineStation
                      key={item.key}
                      label={item.label}
                      time={formatTime(activeIso)}
                      status={status}
                      countdownText={countdownText}
                      isTomorrow={stationIsTomorrow}
                      icon={item.icon}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 5: Evening & Nightfall Schedule */}
          {eveningItems.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3 px-1">
                🌆 Evening &amp; Nightfall Schedule
              </h3>
              <div className="space-y-3">
                {eveningItems.map((item) => {
                  const { activeIso, status, countdownText, isTomorrow: stationIsTomorrow } = getStationStatus(item.todayIso, item.tomorrowIso, item.key);
                  return (
                    <TimelineStation
                      key={item.key}
                      label={item.label}
                      time={formatTime(activeIso)}
                      status={status}
                      countdownText={countdownText}
                      isTomorrow={stationIsTomorrow}
                      icon={item.icon}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}