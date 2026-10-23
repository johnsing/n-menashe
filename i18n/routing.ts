import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales — English and Hebrew.
  locales: ["en", "he"],

  // Default locale when no prefix is present (e.g. /library → /en/library).
  defaultLocale: "en",

  // Always show the locale prefix in the URL (/en/..., /he/...).
  localePrefix: "always",
});
