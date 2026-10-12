import Card from "./Card";

export default function VideoCard({ video }) {
  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <iframe
        className="video-embed"
        src={`https://www.youtube.com/embed/${video.id}`}
        title={video.title}
        allowFullScreen
      />
      <div style={{ padding: "0.75rem" }}>
        <h3>{video.title}</h3>
        <small className="muted">{video.speaker}</small>
      </div>
    </Card>
  );
}