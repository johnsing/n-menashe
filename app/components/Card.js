export default function Card({ children, hover = false, style = {}, className = "" }) {
  const classes = ["card", hover && "card-hover", className].filter(Boolean).join(" ");
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}