const events = [
  { date: "2026-10-12", title: "Sunday Service", time: "10:00 AM" },
  { date: "2026-10-14", title: "Bible Study", time: "7:00 PM" },
  { date: "2026-10-19", title: "Youth Night", time: "6:30 PM" },
];

export default function CalendarPage() {
  return (
    <>
      <header className="page-header">
        <h1>Calendar</h1>
        <p>Upcoming events</p>
      </header>

      <div className="stack">
        {events.map((e) => {
          const d = new Date(e.date);
          return (
            <div key={e.title} className="event">
              <div className="event-date">
                <div className="event-day">{d.getDate()}</div>
                <div className="event-month">{d.toLocaleString("en", { month: "short" })}</div>
              </div>
              <div>
                <strong>{e.title}</strong>
                <div className="muted">{e.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}