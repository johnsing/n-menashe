import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found">
      <h1>404 — Page not found</h1>
      <p className="muted">הדף לא נמצא</p>
      <Link href="/" className="btn">
        Back to home
      </Link>
    </main>
  );
}
