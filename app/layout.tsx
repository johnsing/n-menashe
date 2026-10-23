// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Nav from "./components/Header/Nav";
import TabBar from "./components/Header/TabBar";
import LocaleSwitcher from "./components/Header/LocaleSwitcher";
import StyledComponentsRegistry from "./lib/registry";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "N-MENASHE",
    template: "%s | N-MENASHE",
  },
  description: "Heritage library & media",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StyledComponentsRegistry>
            <Nav />
            <LocaleSwitcher />
            <div className="site-content">{children}</div>
            <TabBar />
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
