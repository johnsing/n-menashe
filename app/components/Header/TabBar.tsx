"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

interface Tab {
  href: string;
  key: string;
  icon: string;
}

const tabs: Tab[] = [
  { href: "/", key: "home", icon: "🏠" },
  { href: "/library", key: "library", icon: "📚" },
  { href: "/videos", key: "videos", icon: "🎬" },
  { href: "/audio", key: "audio", icon: "🎧" },
  { href: "/qa", key: "qa", icon: "💬" },
  { href: "/calendar", key: "calendar", icon: "📅" },
];

export default function TabBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="tabbar" aria-label="Primary">
      {tabs.map((tab) => {
        const active =
          tab.href === "/"
            ? pathname === "/"
            : pathname === tab.href || pathname.startsWith(tab.href + "/");

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`tabbar-item${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
            aria-label={t(tab.key)}
            title={t(tab.key)}
          >
            <span className="tabbar-icon" aria-hidden="true">
              {tab.icon}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
