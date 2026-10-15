import type { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function Card({ children, hover = false, style = {}, className = "" }: CardProps) {
  const classes = ["card", hover && "card-hover", className].filter(Boolean).join(" ");
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
