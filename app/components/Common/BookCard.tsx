import Card from "./Card";
import type { Book } from "../types";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card hover>
      <h3>{book.name}</h3>
      <small className="muted">
        {book.testament} · {book.chapters} chapters
      </small>
    </Card>
  );
}
