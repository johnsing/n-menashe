import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <div className="row muted" style={{ fontSize: "0.9rem", marginBottom: "1rem", flexWrap: "wrap" }}>
      {items.map((item, i) => (
        <span key={i} className="row">
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {i < items.length - 1 && <span style={{ opacity: 0.5 }}>/</span>}
        </span>
      ))}
    </div>
  );
}