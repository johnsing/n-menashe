export default function Stack({ children, gap }) {
  return (
    <div className="stack" style={gap ? { gap } : undefined}>
      {children}
    </div>
  );
}