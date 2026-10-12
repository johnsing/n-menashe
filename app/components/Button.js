export default function Button({ children, variant = "primary", ...props }) {
  const cls = variant === "ghost" ? "btn-ghost" : "btn";
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}