// app/audio/page.tsx
import type { Track } from "../types";

const tracks: Track[] = [
  {
    title: "Daily Shacharit & Halacha Briefing",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "14:20"
  },
  {
    title: "Weekly Parsha Insights & Shiur",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "32:15"
  },
];

export default function AudioPage() {
  return (
    <main className="container">
      <header className="page-header">
        <h1>Audio Teachings</h1>
        <p>Devotions, shiurim, worship, and podcasts</p>
      </header>

      <div className="stack">
        {tracks.map((t) => (
          <article key={t.title} className="card">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong>{t.title}</strong>
              <small className="muted">{t.duration}</small>
            </div>
            <audio controls src={t.src} preload="none" />
          </article>
        ))}
      </div>
    </main>
  );
}
