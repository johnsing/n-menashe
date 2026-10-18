"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  href: string;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/library", label: "Library", icon: "📚" },
  { href: "/videos", label: "Videos", icon: "🎬" },
  { href: "/audio", label: "Audio", icon: "🎧" },
  { href: "/qa", label: "Q&A", icon: "💬" },
  { href: "/calendar", label: "Calendar", icon: "📅" },
];

export default function TabBar() {
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
            aria-label={tab.label}       // 👈 for screen readers
            title={tab.label}            // 👈 hover tooltip
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