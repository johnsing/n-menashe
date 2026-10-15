"use client";

import { useSyncExternalStore } from "react";
import { HDate } from "@hebcal/core";

const subscribe = (): (() => void) => () => {};
const getHebrewDate = (): string => new HDate(new Date()).toString();
const getServerHebrewDate = (): string => "";

export default function Nav() {
  const hebrewDate = useSyncExternalStore(
    subscribe,
    getHebrewDate,
    getServerHebrewDate,
  );

  return (
    <nav className="nav" style={{ justifyContent: "space-around" }}>
      <span className="nav-brand">N-MENASHE</span>
      <span className="nav-date">{hebrewDate}</span>
    </nav>
  );
}
