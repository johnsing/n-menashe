import type { CalendarEvent } from "../types";

interface EventCardProps {
  event: CalendarEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const d = new Date(event.date);
  return (
    <div className="event">
      <div className="event-date">
        <div className="event-day">{d.getDate()}</div>
        <div className="event-month">
          {d.toLocaleString("en", { month: "short" })}
        </div>
      </div>
      <div>
        <strong>{event.title}</strong>
        <div className="muted">{event.time}</div>
      </div>
    </div>
  );
}
