import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const cls = variant === "ghost" ? "btn-ghost" : "btn";
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
