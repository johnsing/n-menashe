// lib/bible.js
export const categories = [
  {
    slug: "Torah",
    name: "Torah",
  },
  {
    slug: "Neviim",
    name: "Neviim",
  },
  {
    slug: "Ketuvim",
    name: "Ketuvim",
  },
];

export const books = [
  { slug: "genesis",     name: "Genesis",     category: "Torah", chapters: 50 },
  { slug: "exodus",      name: "Exodus",      category: "Torah", chapters: 40 },
  { slug: "leviticus",   name: "Leviticus",   category: "Torah", chapters: 27 },
  { slug: "numbers",     name: "Numbers",     category: "Torah", chapters: 36 },
  { slug: "deuteronomy", name: "Deuteronomy", category: "Torah", chapters: 34 },
  { slug: "isaiah",      name: "Isaiah",      category: "Neviim", chapters: 66 },
  { slug: "jeremiah",    name: "Jeremiah",    category: "Neviim", chapters: 52 },
  { slug: "ezekiel",     name: "Ezekiel",     category: "Neviim", chapters: 48 },
  { slug: "job",         name: "Job",         category: "Ketuvim", chapters: 42 },
  { slug: "proverbs",    name: "Proverbs",    category: "Ketuvim", chapters: 31 },
];

// Local sample verses fallback
export const verses = {
  "Torah/genesis/1": [
    { n: 1, text: "In the beginning God created the heaven and the earth." },
    { n: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep." },
    { n: 3, text: "And God said, Let there be light: and there was light." },
    { n: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
    { n: 5, text: "And God called the light Day, and the darkness he called Night." },
  ],
};

// ---- Helpers ----
export const getCategory = (slug) => categories.find((c) => c.slug === slug);

export const getBooksByCategory = (categorySlug) =>
  books.filter((b) => b.category === categorySlug);

export const getBook = (categorySlug, bookSlug) =>
  books.find((b) => b.slug === bookSlug && b.category === categorySlug);

// Live API fetcher (cached for 24 hours)
export async function fetchVerses(bookName, chapter) {
  try {
    const url = `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=kjv`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.verses) return [];
    return data.verses.map((v) => ({ n: v.verse, text: v.text.trim() }));
  } catch (err) {
    console.error("Failed to fetch verses from API:", err);
    return [];
  }
}

// Combined getVerses (checks local store first, falls back to live API)
export async function getVerses(categorySlug, bookSlug, chapter) {
  const key = `${categorySlug}/${bookSlug}/${chapter}`;
  if (verses[key] && verses[key].length > 0) {
    return verses[key];
  }

  const book = getBook(categorySlug, bookSlug);
  if (!book) return [];

  return await fetchVerses(book.name, chapter);
}