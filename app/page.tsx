import Link from "next/link";

const sections = [
  { href: "/calendar", icon: "📅", title: "Zmanim Calendar", desc: "Prayer times & daily schedule" },
  { href: "/library", icon: "📚", title: "Library", desc: "Scriptures of the Tanakh" },
  { href: "/videos", icon: "🎬", title: "Videos", desc: "Teachings & holiday lessons" },
  { href: "/audio", icon: "🎧", title: "Audio", desc: "Shiurim, worship & podcasts" },
  { href: "/qa", icon: "💬", title: "Q&A", desc: "Ask the community" },
];

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Welcome to N-MENASHE</h1>
        <p className="muted">Heritage library &amp; media — Torah, zmanim, and community.</p>
      </section>

      <div className="grid">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="card card-hover home-card">
            <span className="home-card-icon" aria-hidden="true">
              {s.icon}
            </span>
            <div>
              <h3>{s.title}</h3>
              <small className="muted">{s.desc}</small>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}