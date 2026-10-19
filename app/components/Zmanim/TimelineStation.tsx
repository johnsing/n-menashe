// app/components/Zmanim/TimelineStation.tsx
"use client";

import styled, { css } from 'styled-components'
import { FiClock } from 'react-icons/fi'
import AnimatedWifi from '@/app/components/icons/AnimatedWifi'
import { getWifiStatus, formatCountdown } from '@/app/utils/wifiStatus'

export interface Station {
  id: string
  name: string
  hebrew?: string
  time: Date | string
  location?: string
}

interface Props {
  stations: Station[]
  now: Date
  /** id of the next upcoming zman — gets the "board now" highlight */
  nextId?: string
}

type Status = 'yellow' | 'green' | 'red'

const statusBorder = (s: Status, next: boolean): string => {
  if (next) return 'rgba(255, 215, 0, 0.65)'
  if (s === 'green') return 'rgba(81, 207, 102, 0.35)'
  if (s === 'red') return 'rgba(255, 77, 79, 0.35)'
  return '#2a2a2a'
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Row = styled.div<{ $status: Status; $next: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  background: ${p => (p.$next ? '#1e1a10' : '#1a1a1a')};
  border: 1px solid ${p => statusBorder(p.$status, p.$next)};
  border-radius: 12px;
  transition: border-color 0.3s ease, background 0.3s ease;
  ${p =>
    p.$next &&
    css`
      box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.1), 0 0 20px rgba(255, 215, 0, 0.07);
    `}

  &:hover {
    border-color: rgba(255, 215, 0, 0.45);
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    gap: 10px;
  }
`

const Info = styled.div`
  flex: 1;
  min-width: 0;

  .name {
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .heb {
    color: #777;
    font-size: 12px;
    font-weight: 400;
    margin-left: 6px;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
    color: #888;
    font-size: 12px;
    flex-wrap: wrap;

    span { display: flex; align-items: center; gap: 4px; }
    svg { font-size: 11px; }
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`

const Countdown = styled.div<{ $status: Status }>`
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  background: ${p =>
    p.$status === 'green'
      ? 'rgba(81, 207, 102, 0.15)'
      : p.$status === 'red'
      ? 'rgba(255, 77, 79, 0.15)'
      : 'rgba(255, 215, 0, 0.12)'};
  color: ${p =>
    p.$status === 'green' ? '#51cf66' :
    p.$status === 'red' ? '#ff4d4f' : '#ffd700'};

  @media (max-width: 480px) {
    padding: 3px 8px;
    font-size: 11px;
  }
`

const NextBadge = styled.span`
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 50px;
  background: rgba(255, 215, 0, 0.15);
  color: #ffd700;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  vertical-align: 2px;
`

export default function TimelineStation({ stations, now, nextId }: Props) {
  const sorted = [...stations].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  )

  return (
    <List>
      {sorted.map(station => {
        const status = getWifiStatus(station.time, now)
        const countdown = formatCountdown(station.time, now)
        const isNext = station.id === nextId
        const timeStr = new Date(station.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        return (
          <Row key={station.id} $status={status} $next={isNext}>
            <Info>
              <div className="name">
                {station.name}
                {station.hebrew && <span className="heb" lang="he">{station.hebrew}</span>}
                {isNext && <NextBadge>Next</NextBadge>}
              </div>
              <div className="meta">
                <span><FiClock aria-hidden="true" /> {timeStr}</span>
                {station.location && <span>{station.location}</span>}
              </div>
            </Info>

            <Right>
              <Countdown $status={status}>{countdown}</Countdown>
              <AnimatedWifi status={status} size={26} />
            </Right>
          </Row>
        )
      })}
    </List>
  )
}
