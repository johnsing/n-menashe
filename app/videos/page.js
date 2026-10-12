const videos = [
  { id: "dQw4w9WgXcQ", title: "Sunday Sermon", speaker: "Pastor John" },
  { id: "abc123", title: "Bible Study: Romans", speaker: "Sarah K." },
];

export default function VideosPage() {
  return (
    <>
      <header className="page-header">
        <h1>Videos</h1>
        <p>Teachings and sermons</p>
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
            <div style={{ padding: "0.75rem" }}>
              <h3>{v.title}</h3>
              <small className="muted">{v.speaker}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}