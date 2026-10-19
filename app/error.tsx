"use client";

import { useEffect } from "react";
import ErrorPanel from "@/app/components/Feedback/ErrorPanel";

/**
 * Route-level error boundary — catches render errors in every page
 * (calendar, library, videos, audio, qa) while keeping the header
 * and tab bar mounted. Reloads are not required: `reset()` re-renders
 * the failed segment.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your monitoring service (Sentry etc.) here in production.
    console.error(error);
  }, [error]);

  return (
    <ErrorPanel
      title="Something went wrong"
      message={error.message || "An unexpected error occurred."}
      onRetry={reset}
    />
  );
}