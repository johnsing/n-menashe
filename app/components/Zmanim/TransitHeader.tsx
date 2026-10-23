"use client";

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
    <header className="sticky top-0 z-[100] border-b border-[rgba(255,215,0,0.1)] bg-[rgba(10,10,10,0.95)] px-5 py-3.5 backdrop-blur-xl max-md:px-4">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-extrabold uppercase tracking-[1.5px] text-gold max-sm:text-base max-sm:tracking-normal">
            {title}
          </h1>
          {(subtitle || location) && (
            <div className="mt-0.5 truncate text-xs text-[#888] max-sm:text-[11px] [&_svg]:text-xs [&_svg]:align-[-1px]">
              {loading && <FiRefreshCw aria-hidden="true" />}
              {location && <><FiMapPin aria-hidden="true" /> {location}</>}
              {location && subtitle && <span> · </span>}
              {subtitle}
            </div>
          )}
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <div
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border border-board-border bg-board-surface px-3.5 py-1.5 text-[13px] font-semibold max-sm:px-2.5 max-sm:py-1 max-sm:text-[11px] ${loading ? 'text-[#666]' : 'text-[#ccc]'}`}
            title="Time until next zman"
          >
            {loading ? <FiRefreshCw aria-hidden="true" /> : <FiClock aria-hidden="true" />}
            {loading ? 'Updating' : (countdown ?? '—')}
          </div>
          <AnimatedWifi status={status} size={26} />
        </div>
      </div>
    </header>
  )
}