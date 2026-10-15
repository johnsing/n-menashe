import Card from "./Card";
import type { Track } from "../../types";

interface AudioCardProps {
  track: Track;
}

export default function AudioCard({ track }: AudioCardProps) {
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
