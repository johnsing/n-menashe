"use client";

import { FiClock } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedWifi from "@/app/components/icons/AnimatedWifi";
import { getWifiStatus, formatCountdown } from "@/app/utils/wifiStatus";

export interface Station {
  id: string;
  name: string;
  hebrew?: string;
  time: Date | string;
  location?: string;
}

interface Props {
  stations: Station[];
  now: Date;
  /** id of the next upcoming zman — gets the "board now" highlight */
  nextId?: string;
}

type Status = "yellow" | "green" | "red";

const BORDER: Record<Status, string> = {
  green: "border-[rgba(81,207,102,0.35)]",
  red: "border-[rgba(255,77,79,0.35)]",
  yellow: "border-board-border",
};

const PILL: Record<Status, string> = {
  green: "bg-[rgba(81,207,102,0.15)] text-status-green",
  red: "bg-[rgba(255,77,79,0.15)] text-status-red",
  yellow: "bg-[rgba(255,215,0,0.12)] text-gold",
};

export default function TimelineStation({ stations, now, nextId }: Props) {
  const t = useTranslations("zmanim");
  const sorted = [...stations].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );

  return (
    <div className="flex flex-col gap-2.5">
      {sorted.map((station, index) => {
        const status = getWifiStatus(station.time, now);
        const countdown = formatCountdown(station.time, now);
        const isNext = station.id === nextId;
        const timeStr = new Date(station.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <motion.div
            key={station.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.25,
              // Stagger each station slightly as the board populates.
              delay: Math.min(index * 0.04, 0.4),
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.995 }}
            className={`flex items-center justify-between gap-4 rounded-xl border px-[18px] py-3.5 transition-colors duration-300 hover:border-[rgba(255,215,0,0.45)] max-sm:gap-2.5 max-sm:px-3.5 max-sm:py-3 ${
              isNext
                ? "border-[rgba(255,215,0,0.65)] bg-board-surface-next shadow-[0_0_0_1px_rgba(255,215,0,0.1),0_0_20px_rgba(255,215,0,0.07)]"
                : `bg-board-surface ${BORDER[status]}`
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold text-white">
                {station.name}
                {station.hebrew && (
                  <span
                    className="ml-1.5 text-xs font-normal text-[#777]"
                    lang="he"
                  >
                    {station.hebrew}
                  </span>
                )}
                <AnimatePresence>
                  {isNext && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="ml-2 inline-block translate-y-[2px] rounded-full bg-[rgba(255,215,0,0.15)] px-2 py-0.5 align-baseline text-[10px] font-extrabold uppercase tracking-[0.08em] text-gold"
                    >
                      {t("next")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-[#888]">
                <span className="flex items-center gap-1 [&_svg]:text-[11px]">
                  <FiClock aria-hidden="true" /> {timeStr}
                </span>
                {station.location && <span>{station.location}</span>}
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-3">
              <div
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold max-sm:px-2 max-sm:py-0.5 max-sm:text-[11px] ${PILL[status]}`}
              >
                {countdown}
              </div>
              <AnimatedWifi status={status} size={26} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
