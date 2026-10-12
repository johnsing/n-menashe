const books = [
  { name: "Genesis", chapters: 50, testament: "OT" },
  { name: "Psalms", chapters: 150, testament: "OT" },
  { name: "Matthew", chapters: 28, testament: "NT" },
  { name: "John", chapters: 21, testament: "NT" },
];

export default function LibraryPage() {
  return (
    <>
      <header className="page-header">
        <h1>Bible Library</h1>
        <p>Browse books and chapters</p>
      </header>

      <div className="grid">
        {books.map((book) => (
          <div key={book.name} className="card card-hover">
            <h3>{book.name}</h3>
            <small className="muted">{book.testament} · {book.chapters} chapters</small>
          </div>
        ))}
      </div>
    </>
  );
}