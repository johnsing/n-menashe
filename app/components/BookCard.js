import Card from "./Card";

export default function BookCard({ book }) {
  return (
    <Card hover>
      <h3>{book.name}</h3>
      <small className="muted">
        {book.testament} · {book.chapters} chapters
      </small>
    </Card>
  );
}