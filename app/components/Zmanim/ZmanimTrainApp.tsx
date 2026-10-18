// pages/ZmanimTrainApp.tsx
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import TransitHeader from '@/app/components/Zmanim/TransitHeader'
import TimelineStation, { type Station } from '@/app/components/Zmanim/TimelineStation'

// ── Sample data (replace with API / props) ─────────────────
const getStations = (now: Date): Station[] => {
  const base = now.getTime()
  const min = 60_000

  return [
    { id: 's1', name: 'Shacharit',        time: new Date(base + 2 * min),  location: 'Main Hall' },
    { id: 's2', name: 'Torah Study',      time: new Date(base + 8 * min),  location: 'Beit Midrash' },
    { id: 's3', name: 'Mincha',           time: new Date(base + 20 * min), location: 'Main Hall' },
    { id: 's4', name: 'Maariv',           time: new Date(base - 10 * min), location: 'Main Hall' },
    { id: 's5', name: 'Evening Class',    time: new Date(base + 60 * min), location: 'Room 2' },
  ]
}

// ── Styled ────────────────────────────────────────────────
const App = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`

const Content = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 20px 80px;

  @media (max-width: 768px) {
    padding: 20px 16px 80px;
  }
`

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #ffd700;
    border-radius: 2px;
  }
`

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
    .time { font-size: 30px; }
  }
`

// ── App ───────────────────────────────────────────────────
export default function ZmanimTrainApp() {
  const [now, setNow] = useState(new Date())

  // Live tick every 15s
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])

  const stations = getStations(now)
  const nextStation = [...stations]
    .filter(s => new Date(s.time).getTime() > now.getTime())
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())[0]

  return (
    <App>
      <TransitHeader
        title="Zmanim Train"
        subtitle={`${stations.length} upcoming`}
        location="Jerusalem"
        nextEventTime={nextStation?.time}
      />

      <Content>
        <LiveClock>
          <div className="time">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="date">
            {now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </LiveClock>

        <SectionTitle>Schedule</SectionTitle>
        <TimelineStation stations={stations} now={now} />
      </Content>
    </App>
  )
}