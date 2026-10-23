// app/page.tsx
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const sections = [
  { href: "/calendar", icon: "📅", titleKey: "zmanimTitle", descKey: "zmanimDesc" },
  { href: "/library", icon: "📚", titleKey: "libraryTitle", descKey: "libraryDesc" },
  { href: "/videos", icon: "🎬", titleKey: "videosTitle", descKey: "videosDesc" },
  { href: "/audio", icon: "🎧", titleKey: "audioTitle", descKey: "audioDesc" },
  { href: "/qa", icon: "💬", titleKey: "qaTitle", descKey: "qaDesc" },
] as const;

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <main className="container">
      <section className="hero">
        <h1>{t("heroTitle")}</h1>
        <p className="muted">{t("heroSubtitle")}</p>
      </section>

      <div className="grid">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="card card-hover home-card">
            <span className="home-card-icon" aria-hidden="true">
              {s.icon}
            </span>
            <div>
              <h3>{t(s.titleKey)}</h3>
              <small className="muted">{t(s.descKey)}</small>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
