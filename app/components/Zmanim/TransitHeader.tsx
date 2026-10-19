// app/components/Zmanim/TransitHeader.tsx
"use client";

import styled from 'styled-components'
import { FiClock, FiMapPin, FiRefreshCw } from 'react-icons/fi'
import AnimatedWifi from '@/app/components/icons/AnimatedWifi'
import { getWifiStatus, formatCountdown } from '@/app/utils/wifiStatus'

interface TransitHeaderProps {
  title: string
  subtitle?: string
  nextEventTime?: Date | string
  location?: string
  loading?: boolean
}

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  padding: 14px 20px;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1400px;
  margin: 0 auto;
`

const TitleBlock = styled.div`
  min-width: 0;
  flex: 1;

  h1 {
    color: #ffd700;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .subtitle {
    color: #888;
    font-size: 12px;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    svg { font-size: 12px; vertical-align: -1px; }
  }

  @media (max-width: 480px) {
    h1 { font-size: 16px; letter-spacing: 1px; }
    .subtitle { font-size: 11px; }
  }
`

const StatusBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`

const Countdown = styled.div<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 50px;
  color: ${p => (p.$loading ? '#666' : '#ccc')};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;

  svg { font-size: 14px; color: #ffd700; }

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 11px;
  }
`

export default function TransitHeader({
  title,
  subtitle,
  nextEventTime,
  location,
  loading = false,
}: TransitHeaderProps) {
  const status = nextEventTime ? getWifiStatus(nextEventTime) : 'yellow'
  const countdown = nextEventTime ? formatCountdown(nextEventTime) : null

  return (
    <Header>
      <Row>
        <TitleBlock>
          <h1>{title}</h1>
          {(subtitle || location) && (
            <div className="subtitle">
              {loading && <FiRefreshCw aria-hidden="true" />}
              {location && <><FiMapPin aria-hidden="true" /> {location}</>}
              {location && subtitle && <span> · </span>}
              {subtitle}
            </div>
          )}
        </TitleBlock>

        <StatusBlock>
          <Countdown $loading={loading} title="Time until next zman">
            {loading ? <FiRefreshCw aria-hidden="true" /> : <FiClock aria-hidden="true" />}
            {loading ? 'Updating' : countdown ?? '—'}
          </Countdown>
          <AnimatedWifi status={status} size={26} />
        </StatusBlock>
      </Row>
    </Header>
  )
}
