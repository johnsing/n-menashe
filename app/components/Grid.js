export default function Grid({ children, variant = "default" }) {
  const cls = variant === "videos" ? "grid grid-videos" : "grid";
  return <div className={cls}>{children}</div>;
}