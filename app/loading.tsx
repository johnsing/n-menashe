/**
 * Route-level loading UI — shown during navigation while the server
 * streams the page. Kept light so fast pages never visibly flash it.
 * `animate-pulse` comes from Tailwind (globals.css imports tailwindcss).
 */
export default function Loading() {
  return (
    <main className="container" aria-busy="true" aria-label="Loading page">
      {/* Page-header skeleton */}
      <div className="animate-pulse" style={{ marginBottom: "1.5rem" }}>
        <div
          className="bg-[var(--surface)] rounded-lg"
          style={{ height: "1.75rem", width: "45%", marginBottom: "0.5rem" }}
        />
        <div
          className="bg-[var(--surface)] rounded-lg"
          style={{ height: "0.9rem", width: "65%" }}
        />
      </div>

      {/* Card skeletons */}
      <div className="stack">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="card animate-pulse"
            aria-hidden="true"
          >
            <div
              className="bg-[var(--border)] rounded"
              style={{ height: "0.95rem", width: i === 0 ? "60%" : "45%" }}
            />
            <div
              className="bg-[var(--border)] rounded"
              style={{ height: "0.8rem", width: "85%" }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}