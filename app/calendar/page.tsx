// app/calendar/page.tsx
import { Suspense } from 'react'
import ZmanimTrainApp from '@/app/components/Zmanim/ZmanimTrainApp'

export default function CalendarPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '60vh',
            background: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffd700',
            fontSize: 14,
            letterSpacing: 1,
          }}
        >
          LOADING ZMANIM…
        </div>
      }
    >
      <ZmanimTrainApp />
    </Suspense>
  );
}