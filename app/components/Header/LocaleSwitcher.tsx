"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FiGlobe } from "react-icons/fi";

export default function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = locale === "en" ? "he" : "en";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: switchTo })}
      className="locale-switcher"
      aria-label={`Switch language / החלפת שפה (currently ${locale})`}
      title={locale === "en" ? "עברית" : "English"}
    >
      <FiGlobe aria-hidden="true" />
      <span>{switchTo === "he" ? "עברית" : "EN"}</span>
    </button>
  );
}
