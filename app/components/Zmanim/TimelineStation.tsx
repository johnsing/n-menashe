// components/TimelineStation.tsx
import styled from 'styled-components'
import { FiClock, FiMapPin } from 'react-icons/fi'
import AnimatedWifi from '@/app/components/icons/AnimatedWifi'
import { getWifiStatus, formatCountdown } from '@/app/utils/wifiStatus'

export interface Station {
  id: string
  name: string
  time: Date | string
  location?: string
}

interface Props {
  stations: Station[]
  now: Date
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Row = styled.div<{ $status: 'yellow' | 'green' | 'red' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  background: #1a1a1a;
  border: 1px solid
    ${p =>
      p.$status === 'green'
        ? 'rgba(81, 207, 102, 0.35)'
        : p.$status === 'red'
        ? 'rgba(255, 77, 79, 0.35)'
        : '#2a2a2a'};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: rgba(255, 215, 0, 0.35);
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

const Countdown = styled.div<{ $status: string }>`
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 700;
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
    display: none;
  }
`

export default function TimelineStation({ stations, now }: Props) {
  const sorted = [...stations].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  )

  return (
    <List>
      {sorted.map(station => {
        const status = getWifiStatus(station.time, now)
        const countdown = formatCountdown(station.time, now)
        const timeStr = new Date(station.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        return (
          <Row key={station.id} $status={status}>
            <Info>
              <div className="name">{station.name}</div>
              <div className="meta">
                <span><FiClock /> {timeStr}</span>
                {station.location && (
                  <span><FiMapPin /> {station.location}</span>
                )}
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