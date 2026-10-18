// components/icons/AnimatedWifi.tsx
import styled, { keyframes, css } from 'styled-components'
import type { WifiStatus } from '../../utils/wifiStatus'

interface Props {
  status?: WifiStatus
  size?: number
  className?: string
}

const COLORS: Record<WifiStatus, string> = {
  yellow: '#ffd700',
  green:  '#51cf66',
  red:    '#ff4d4f',
}

const wave = keyframes`
  0%, 100% { opacity: 0.25; }
  50%      { opacity: 1; }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.12); }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
`

const Wrap = styled.div<{ $color: string; $status: WifiStatus; $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  transition: color 0.4s ease, filter 0.4s ease;
  filter: drop-shadow(0 0 6px ${p => p.$color}66);

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .dot {
    animation: ${p =>
      p.$status === 'red'
        ? css`${blink} 0.8s ease-in-out infinite`
        : p.$status === 'green'
        ? css`${pulse} 1.6s ease-in-out infinite`
        : 'none'};
    transform-origin: center;
  }

  .arc-1 { animation: ${wave} 1.6s ease-in-out infinite; }
  .arc-2 { animation: ${wave} 1.6s ease-in-out 0.2s infinite; }
  .arc-3 { animation: ${wave} 1.6s ease-in-out 0.4s infinite; }

  ${p =>
    p.$status === 'red' &&
    css`
      .arc-1, .arc-2, .arc-3 { animation-duration: 0.7s; }
    `}

  ${p =>
    p.$status === 'green' &&
    css`
      .arc-1, .arc-2, .arc-3 { animation-duration: 2s; }
    `}
`

export default function AnimatedWifi({ status = 'yellow', size = 24, className }: Props) {
  return (
    <Wrap $color={COLORS[status]} $status={status} $size={size} className={className}
          aria-label={`wifi ${status}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round">
        <circle className="dot" cx="12" cy="19" r="1.4" fill="currentColor" stroke="none" />
        <path className="arc-1" d="M6.5 15.5a8 8 0 0 1 11 0" />
        <path className="arc-2" d="M3.5 12a13 13 0 0 1 17 0" />
        <path className="arc-3" d="M0.5 8.5a18 18 0 0 1 23 0" />
      </svg>
    </Wrap>
  )
}