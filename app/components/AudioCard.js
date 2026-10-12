import Card from "./Card";

export default function AudioCard({ track }) {
  return (
    <Card>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong>{track.title}</strong>
        <small className="muted">{track.duration}</small>
      </div>
      <audio controls src={track.src} />
    </Card>
  );
}