// utils/wifiStatus.ts
export type WifiStatus = 'yellow' | 'green' | 'red'

/**
 * Returns the WiFi status based on time relative to an event.
 *
 *  • More than 5 min before → yellow
 *  • 5 min or less before  → green
 *  • Past the event (≤24h) → red
 *  • More than 24h past    → yellow (reset)
 */
export function getWifiStatus(
  eventTime: Date | string,
  now: Date = new Date()
): WifiStatus {
  const event = new Date(eventTime)
  const diffMs = event.getTime() - now.getTime()
  const diffMin = diffMs / 60000

  if (diffMs < 0) {
    const hoursPast = Math.abs(diffMs) / 3_600_000
    return hoursPast < 24 ? 'red' : 'yellow'
  }

  if (diffMin <= 5) return 'green'
  return 'yellow'
}

export function formatCountdown(eventTime: Date | string, now: Date = new Date()): string {
  const diffMs = new Date(eventTime).getTime() - now.getTime()
  if (diffMs <= 0) return 'Departed'

  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins} min`
  const hrs = Math.floor(mins / 60)
  const rem = mins % 60
  return rem ? `${hrs}h ${rem}m` : `${hrs}h`
}