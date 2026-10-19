// app/calendar/page.tsx
import { Suspense } from 'react'
import ZmanimTrainApp from '@/app/components/Zmanim/ZmanimTrainApp'

export default function CalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center bg-board-bg text-sm tracking-wider text-gold">
          LOADING ZMANIM…
        </div>
      }
    >
      <ZmanimTrainApp />
    </Suspense>
  );
}