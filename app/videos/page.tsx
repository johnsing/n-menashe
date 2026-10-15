// app/videos/page.tsx
import type { Video } from "../types";

const videos: Video[] = [
  { 
    id: "JHeBK-2JDz0", 
    title: "The Jewish Holiday of Sukkot, What is It?", 
    speaker: "Jewish Learning Institute",
    url: "http://www.youtube.com/watch?v=JHeBK-2JDz0"
  },
  { 
    id: "wVw6_c2el2M", 
    title: "Sukkot: What Does This Jewish Holiday Mean?", 
    speaker: "Rabbi Jason Sobel Official",
    url: "http://www.youtube.com/watch?v=wVw6_c2el2M"
  },
  { 
    id: "RhbCrWsft0Q", 
    title: "Every Jewish Holiday, Explained", 
    speaker: "People Of The Book",
    url: "http://www.youtube.com/watch?v=RhbCrWsft0Q"
  },
  { 
    id: "6mmZDYogjCk", 
    title: "What is Purim? An introduction to the Jewish holiday", 
    speaker: "BimBam",
    url: "http://www.youtube.com/watch?v=6mmZDYogjCk"
  },
];

export default function VideosPage() {
  return (
    <main className="container">
      <header className="page-header">
        <h1>Torah & Holiday Teachings</h1>
        <p>Explore video lessons, holiday overviews, and classes</p>
      </header>

      <div className="grid grid-videos">
        {videos.map((v) => (
          <div key={v.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
            <iframe
              className="video-embed"
              src={`https://www.youtube.com/embed/${v.id}`}
              title={v.title}
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
                  Watch on YouTube ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}