// app/videos/page.tsx
import { useTranslations } from "next-intl";
import type { Video } from "../types";

// Video titles/speakers are proper nouns — they stay in the data source.
// The page chrome (headers, "Watch on YouTube") is translated.
const videos: Video[] = [
  {
    id: "JHeBK-2JDz0",
    title: "The Jewish Holiday of Sukkot, What is It?",
    speaker: "Jewish Learning Institute",
    url: "http://www.youtube.com/watch?v=JHeBK-2JDz0",
  },
  {
    id: "wVw6_c2el2M",
    title: "Sukkot: What Does This Jewish Holiday Mean?",
    speaker: "Rabbi Jason Sobel Official",
    url: "http://www.youtube.com/watch?v=wVw6_c2el2M",
  },
  {
    id: "RhbCrWsft0Q",
    title: "Every Jewish Holiday, Explained",
    speaker: "People Of The Book",
    url: "http://www.youtube.com/watch?v=RhbCrWsft0Q",
  },
  {
    id: "6mmZDYogjCk",
    title: "What is Purim? An introduction to the Jewish holiday",
    speaker: "BimBam",
    url: "http://www.youtube.com/watch?v=6mmZDYogjCk",
  },
];

export default function VideosPage() {
  const t = useTranslations("videos");

  return (
    <main className="container container-wide">
      <header className="page-header">
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </header>

      <div className="grid grid-videos">
        {videos.map((v) => (
          <article key={v.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
            <iframe
              className="video-embed"
              src={`https://www.youtube-nocookie.com/embed/${v.id}`}
              title={v.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div style={{ padding: "1rem" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{v.title}</h3>
              <small className="muted">{v.speaker}</small>
              <div style={{ marginTop: "0.5rem" }}>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.8rem", color: "var(--accent)" }}
                >
                  {t("watchOnYoutube")}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
