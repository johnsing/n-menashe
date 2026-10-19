"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { FiHome, FiBook, FiVideo, FiHeadphones, FiMessageSquare, FiCalendar } from "react-icons/fi";

interface Tab {
  href: string;
  label: string;
  Icon: IconType;
}

const tabs: Tab[] = [
  { href: "/", label: "Home", Icon: FiHome },
  { href: "/library", label: "Library", Icon: FiBook },
  { href: "/videos", label: "Videos", Icon: FiVideo },
  { href: "/audio", label: "Audio", Icon: FiHeadphones },
  { href: "/qa", label: "Q&A", Icon: FiMessageSquare },
  { href: "/calendar", label: "Calendar", Icon: FiCalendar },
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
            aria-label={tab.label}
            title={tab.label}
          >
            <span className="tabbar-icon" aria-hidden="true">
              <tab.Icon />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}