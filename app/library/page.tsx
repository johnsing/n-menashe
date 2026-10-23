// app/library/page.tsx
import { useTranslations } from "next-intl";
import type { Book } from "../types";

const b = (name: string, chapters: number): Book => ({
  name,
  chapters,
  testament: "OT",
});

const torah: Book[] = [
  b("Genesis", 50),
  b("Exodus", 40),
  b("Leviticus", 27),
  b("Numbers", 36),
  b("Deuteronomy", 34),
];

const neviim: Book[] = [
  b("Joshua", 24),
  b("Judges", 21),
  b("I Samuel", 31),
  b("II Samuel", 24),
  b("I Kings", 22),
  b("II Kings", 25),
  b("Isaiah", 66),
  b("Jeremiah", 52),
  b("Ezekiel", 48),
  b("Hosea", 14),
  b("Joel", 4),
  b("Amos", 9),
  b("Obadiah", 1),
  b("Jonah", 4),
  b("Micah", 7),
  b("Nahum", 3),
  b("Habakkuk", 3),
  b("Zephaniah", 3),
  b("Haggai", 2),
  b("Zechariah", 14),
  b("Malachi", 3),
];

const ketuvim: Book[] = [
  b("Psalms", 150),
  b("Proverbs", 31),
  b("Job", 42),
  b("Song of Songs", 8),
  b("Ruth", 4),
  b("Lamentations", 5),
  b("Ecclesiastes", 12),
  b("Esther", 10),
  b("Daniel", 12),
  b("Ezra", 10),
  b("Nehemiah", 13),
  b("I Chronicles", 29),
  b("II Chronicles", 36),
];

const sections = [
  { titleKey: "torah", books: torah },
  { titleKey: "neviim", books: neviim },
  { titleKey: "ketuvim", books: ketuvim },
];

export default function LibraryPage() {
  const t = useTranslations("library");

  return (
    <main className="container container-wide">
      <header className="page-header">
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </header>

      {sections.map((section) => (
        <section key={section.titleKey} style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>
            {t(section.titleKey)}
          </h2>
          <div className="grid">
            {section.books.map((book) => (
              <div
                key={book.name}
                className="card card-hover"
                style={{ padding: "0.85rem 1rem", cursor: "pointer" }}
              >
                <strong style={{ fontSize: "0.95rem" }}>{book.name}</strong>
                <small className="muted">{t("chapters", { count: book.chapters })}</small>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
