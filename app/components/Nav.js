"use client";

import { useSyncExternalStore } from "react";
import { HDate } from "@hebcal/core";

const subscribe = () => () => {};
const getHebrewDate = () => new HDate(new Date()).toString();
const getServerHebrewDate = () => "";

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