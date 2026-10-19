"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Last-resort boundary — catches errors in the ROOT LAYOUT itself
 * (Nav, TabBar, providers). When this renders, the whole layout is
 * gone, so it must render its own <html>/<body> and cannot rely on
 * any CSS from globals.css.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#09090b",
          color: "#f4f4f5",
        }}
      >
        <main style={{ textAlign: "center", padding: "2rem 1rem", maxWidth: 480 }}>
          <h1 style={{ fontSize: "1.5rem", margin: "0 0 0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a1a1aa", margin: "0 0 1.5rem" }}>
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginRight: "0.75rem",
              padding: "0.6rem 1.25rem",
              borderRadius: 8,
              border: "1px solid #9333ea",
              background: "transparent",
              color: "#c084fc",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link href="/" style={{ color: "#c084fc", fontWeight: 600 }}>
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}