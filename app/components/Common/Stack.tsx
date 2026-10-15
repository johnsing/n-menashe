import type { CSSProperties, ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  gap?: CSSProperties["gap"];
}

export default function Stack({ children, gap }: StackProps) {
  return (
    <div className="stack" style={gap ? { gap } : undefined}>
      {children}
    </div>
  );
}
