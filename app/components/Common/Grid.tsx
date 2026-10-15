import type { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  variant?: "default" | "videos";
}

export default function Grid({ children, variant = "default" }: GridProps) {
  const cls = variant === "videos" ? "grid grid-videos" : "grid";
  return <div className={cls}>{children}</div>;
}
