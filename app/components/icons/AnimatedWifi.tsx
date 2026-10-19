// components/icons/AnimatedWifi.tsx
import type { WifiStatus } from '../../utils/wifiStatus'

interface Props {
  status?: WifiStatus
  size?: number
  className?: string
}

const COLORS: Record<WifiStatus, string> = {
  yellow: 'text-gold drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]',
  green:  'text-status-green drop-shadow-[0_0_6px_rgba(81,207,102,0.4)]',
  red:    'text-status-red drop-shadow-[0_0_6px_rgba(255,77,79,0.4)]',
}

const ARC_SPEED: Record<WifiStatus, string> = {
  yellow: '[animation-duration:1.6s]',
  green:  '[animation-duration:2s]',
  red:    '[animation-duration:0.7s]',
}

const DOT_ANIM: Record<WifiStatus, string> = {
  yellow: '',
  green:  'animate-pulse-dot',
  red:    'animate-blink',
}

export default function AnimatedWifi({ status = 'yellow', size = 24, className = '' }: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center transition-colors duration-[400ms] ${COLORS[status]} ${className}`}
      style={{ width: size, height: size }}
      aria-label={`wifi ${status}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full overflow-visible"
      >
        <circle className={`origin-center ${DOT_ANIM[status]}`} cx="12" cy="19" r="1.4" fill="currentColor" stroke="none" />
        <path className={`animate-wave ${ARC_SPEED[status]}`} d="M6.5 15.5a8 8 0 0 1 11 0" />
        <path className={`animate-wave ${ARC_SPEED[status]} [animation-delay:0.2s]`} d="M3.5 12a13 13 0 0 1 17 0" />
        <path className={`animate-wave ${ARC_SPEED[status]} [animation-delay:0.4s]`} d="M0.5 8.5a18 18 0 0 1 23 0" />
      </svg>
    </div>
  )
}