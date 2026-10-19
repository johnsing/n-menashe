"use client";

import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

interface ErrorPanelProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

/**
 * Shared error UI used by route-level error boundaries.
 * Keeps Nav + TabBar visible (it renders inside the root layout).
 */
export default function ErrorPanel({
  title = "Something went wrong",
  message = "An unexpected error occurred while loading this page.",
  onRetry,
  retryLabel = "Try again",
}: ErrorPanelProps) {
  return (
    <main className="container not-found" role="alert">
      <FiAlertTriangle
        size={40}
        color="var(--accent)"
        style={{ marginBottom: "1rem" }}
        aria-hidden="true"
      />
      <h1>{title}</h1>
      <p className="muted">{message}</p>
      <div
        className="row"
        style={{ justifyContent: "center", marginTop: "1.25rem" }}
      >
        {onRetry && (
          <button type="button" className="btn" onClick={onRetry}>
            <FiRefreshCw aria-hidden="true" /> {retryLabel}
          </button>
        )}
        <Link href="/" className="btn">
          Back to home
        </Link>
      </div>
    </main>
  );
}