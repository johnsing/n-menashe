import type { ReactNode } from "react";
import Nav from "./components/Nav";
import TabBar from "./components/TabBar";
import "./globals.css";

export const metadata = {
  title: "Nishmat-Menashe",
  description: "Bible library, videos, audio, Q&A, and calendar",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container">{children}</main>
        <TabBar />
      </body>
    </html>
  );
}