const tracks = [
  { title: "Morning Devotion", src: "/audio/devotion.mp3", duration: "12:30" },
  { title: "Worship Set", src: "/audio/worship.mp3", duration: "25:00" },
];

export default function AudioPage() {
  return (
    <>
      <header className="page-header">
        <h1>Audio</h1>
        <p>Devotions, worship, and podcasts</p>
      </header>

      <div className="stack">
        {tracks.map((t) => (
          <div key={t.title} className="card">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong>{t.title}</strong>
              <small className="muted">{t.duration}</small>
            </div>
            <audio controls src={t.src} />
          </div>
        ))}
      </div>
    </>
  );
}