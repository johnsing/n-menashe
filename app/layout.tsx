// app/layout.tsx
import type { Metadata } from "next";
import Nav from "./components/Header/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "N-MENASHE",
  description: "Heritage library & media",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}