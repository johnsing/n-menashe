// app/audio/page.tsx
import { useTranslations } from "next-intl";
import type { Track } from "../types";

// Placeholder tracks — swap for real shiurim / podcast RSS later.
const tracks: Track[] = [
  {
    title: "Daily Shacharit & Halacha Briefing",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "14:20",
  },
  {
    title: "Weekly Parsha Insights & Shiur",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "32:15",
  },
];

export default function AudioPage() {
  const t = useTranslations("audio");

  return (
    <main className="container">
      <header className="page-header">
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </header>

      <div className="stack">
        {tracks.map((tr) => (
          <article key={tr.title} className="card">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong>{tr.title}</strong>
              <small className="muted">{tr.duration}</small>
            </div>
            <audio controls src={tr.src} preload="none" />
          </article>
        ))}
      </div>
    </main>
  );
}
